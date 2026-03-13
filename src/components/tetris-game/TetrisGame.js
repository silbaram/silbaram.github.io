import React, { useEffect, useRef } from "react"
import Phaser from "phaser"

import * as tetrisGameStyles from "./tetris-game.module.css"

const GRID_SIZE = 28
const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const BOARD_X = 28
const BOARD_Y = 32
const BOARD_PIXEL_WIDTH = BOARD_WIDTH * GRID_SIZE
const BOARD_PIXEL_HEIGHT = BOARD_HEIGHT * GRID_SIZE
const SIDE_PANEL_X = BOARD_X + BOARD_PIXEL_WIDTH + 28
const SIDE_PANEL_Y = 24
const SIDE_PANEL_WIDTH = 188
const SIDE_PANEL_HEIGHT = 592
const NEXT_BOX_X = SIDE_PANEL_X + 18
const NEXT_BOX_Y = 330
const NEXT_BOX_SIZE = 152
const GAME_WIDTH = 560
const GAME_HEIGHT = 640

const TETROMINOES = {
  I: [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  O: [
    [
      [1, 1],
      [1, 1],
    ],
  ],
  T: [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  ],
  S: [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  ],
  Z: [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  ],
  J: [
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  ],
  L: [
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  ],
}

const PIECE_COLORS = {
  I: 0x39d0ff,
  O: 0xffd447,
  T: 0xc46bff,
  S: 0x67e46a,
  Z: 0xff6b6b,
  J: 0x4d79ff,
  L: 0xffa24b,
}

const createTetrominoes = () =>
  Object.fromEntries(
    Object.entries(TETROMINOES).map(([key, shapes]) => [
      key,
      shapes.map(shape => shape.map(row => [...row])),
    ])
  )

const mixColor = (colorHex, factor) => {
  const color = Phaser.Display.Color.ValueToColor(colorHex)
  const adjustChannel = channel =>
    factor >= 0
      ? channel + (255 - channel) * factor
      : channel * (1 + factor)

  return Phaser.Display.Color.GetColor(
    Math.max(0, Math.min(255, Math.round(adjustChannel(color.red)))),
    Math.max(0, Math.min(255, Math.round(adjustChannel(color.green)))),
    Math.max(0, Math.min(255, Math.round(adjustChannel(color.blue))))
  )
}

const labelStyle = {
  fontFamily: '"Courier New", monospace',
  fontSize: "13px",
  color: "#8fb7ff",
}

const valueStyle = {
  fontFamily: '"Courier New", monospace',
  fontSize: "28px",
  fontStyle: "bold",
  color: "#f8fafc",
  stroke: "#020617",
  strokeThickness: 4,
}

const TetrisGame = () => {
  const gameRef = useRef(null)
  const gameInstance = useRef(null)

  useEffect(() => {
    class TetrisScene extends Phaser.Scene {
      constructor() {
        super({ key: "TetrisScene" })
        this.gameState = "start"
        this.score = 0
        this.level = 1
        this.linesCleared = 0
        this.dropInterval = 900
        this.lastDropTime = 0
        this.board = []
        this.currentPiece = null
        this.nextPiece = null
        this.gridSize = GRID_SIZE
        this.boardWidth = BOARD_WIDTH
        this.boardHeight = BOARD_HEIGHT
        this.tetrominoes = createTetrominoes()
      }

      create() {
        this.cameras.main.setBackgroundColor("#050814")

        this.input.keyboard.on("keydown", this.handleInput, this)
        this.input.on("pointerdown", this.handlePointerDown, this)

        this.resetBoardState()
        this.createChrome()
        this.drawBoard()
        this.drawNextPiece()
        this.showOverlay("TETRIS", "PRESS ANY KEY", 0x4d79ff)
      }

      update(time) {
        if (
          this.gameState === "playing" &&
          time > this.lastDropTime + this.dropInterval
        ) {
          this.movePieceDown()
          this.lastDropTime = time
        }
      }

      resetBoardState() {
        this.board = Array.from({ length: this.boardHeight }, () =>
          Array(this.boardWidth).fill(0)
        )
        this.currentPiece = null
        this.nextPiece = null
      }

      handlePointerDown() {
        if (this.gameState === "start" || this.gameState === "gameover") {
          this.startGame()
        }
      }

      handleInput(event) {
        if (event.code.startsWith("Arrow") || event.code === "Space") {
          event.preventDefault()
        }

        if (this.gameState === "start") {
          this.startGame()
          return
        }

        if (this.gameState === "gameover") {
          this.restartGame()
          return
        }

        if (this.gameState !== "playing") {
          return
        }

        if (event.code === "ArrowLeft") {
          this.movePiece(-1)
        } else if (event.code === "ArrowRight") {
          this.movePiece(1)
        } else if (event.code === "ArrowDown") {
          this.movePieceDown()
        } else if (event.code === "ArrowUp") {
          this.rotatePiece()
        } else if (event.code === "Space") {
          this.hardDrop()
        }
      }

      startGame() {
        this.gameState = "playing"
        this.score = 0
        this.level = 1
        this.linesCleared = 0
        this.dropInterval = 900
        this.lastDropTime = 0
        this.tetrominoes = createTetrominoes()
        this.resetBoardState()
        this.hideOverlay()
        this.updateHud()

        this.nextPiece = this.createRandomPiece()
        this.spawnPiece()
        this.drawBoard()
        this.drawNextPiece()
      }

      endGame() {
        this.gameState = "gameover"
        this.showOverlay("GAME OVER", "PRESS ANY KEY", 0xff6b6b)
      }

      restartGame() {
        this.startGame()
      }

      createRandomPiece() {
        const keys = Object.keys(this.tetrominoes)
        const randomKey = keys[Math.floor(Math.random() * keys.length)]
        const shape = this.tetrominoes[randomKey][0]

        return {
          shape,
          x: Math.floor((this.boardWidth - shape[0].length) / 2),
          y: 0,
          rotationIndex: 0,
          tetrominoKey: randomKey,
        }
      }

      spawnPiece() {
        this.currentPiece = this.nextPiece
        this.currentPiece.x = Math.floor(
          (this.boardWidth - this.currentPiece.shape[0].length) / 2
        )
        this.currentPiece.y = 0
        this.nextPiece = this.createRandomPiece()

        if (this.checkCollision()) {
          this.endGame()
        } else {
          this.drawBoard()
          this.drawNextPiece()
        }
      }

      movePiece(direction) {
        this.currentPiece.x += direction
        if (this.checkCollision()) {
          this.currentPiece.x -= direction
          return
        }

        this.drawBoard()
      }

      movePieceDown() {
        this.currentPiece.y += 1
        if (this.checkCollision()) {
          this.currentPiece.y -= 1
          this.lockPiece()
          this.clearLines()
          this.spawnPiece()
          return
        }

        this.drawBoard()
      }

      hardDrop() {
        while (!this.checkCollision()) {
          this.currentPiece.y += 1
        }
        this.currentPiece.y -= 1
        this.lockPiece()
        this.clearLines()
        this.spawnPiece()
      }

      rotatePiece() {
        const oldRotation = this.currentPiece.rotationIndex
        this.currentPiece.rotationIndex =
          (this.currentPiece.rotationIndex + 1) % 4
        this.currentPiece.shape = this.getRotatedShape(
          this.currentPiece.tetrominoKey,
          this.currentPiece.rotationIndex
        )

        if (this.checkCollision()) {
          this.currentPiece.rotationIndex = oldRotation
          this.currentPiece.shape = this.getRotatedShape(
            this.currentPiece.tetrominoKey,
            this.currentPiece.rotationIndex
          )
          return
        }

        this.drawBoard()
      }

      getRotatedShape(tetrominoKey, rotationIndex) {
        const shapes = this.tetrominoes[tetrominoKey]
        if (shapes[rotationIndex]) {
          return shapes[rotationIndex]
        }

        let shape = shapes[0]
        for (let i = 0; i < rotationIndex; i += 1) {
          shape = this.rotateMatrix(shape)
        }

        shapes[rotationIndex] = shape
        return shape
      }

      rotateMatrix(matrix) {
        return matrix[0].map((value, index) =>
          matrix.map(row => row[index]).reverse()
        )
      }

      checkCollision() {
        const { shape, x: posX, y: posY } = this.currentPiece

        for (let y = 0; y < shape.length; y += 1) {
          for (let x = 0; x < shape[y].length; x += 1) {
            if (!shape[y][x]) {
              continue
            }

            const boardX = posX + x
            const boardY = posY + y

            if (
              boardX < 0 ||
              boardX >= this.boardWidth ||
              boardY >= this.boardHeight ||
              (boardY >= 0 && this.board[boardY][boardX])
            ) {
              return true
            }
          }
        }

        return false
      }

      lockPiece() {
        const { shape, x: posX, y: posY, tetrominoKey } = this.currentPiece

        for (let y = 0; y < shape.length; y += 1) {
          for (let x = 0; x < shape[y].length; x += 1) {
            if (!shape[y][x]) {
              continue
            }

            const boardX = posX + x
            const boardY = posY + y
            if (this.board[boardY]) {
              this.board[boardY][boardX] = tetrominoKey
            }
          }
        }
      }

      clearLines() {
        let clearedLines = 0

        for (let y = this.boardHeight - 1; y >= 0; y -= 1) {
          if (this.board[y].every(cell => cell !== 0)) {
            this.board.splice(y, 1)
            this.board.unshift(Array(this.boardWidth).fill(0))
            clearedLines += 1
            y += 1
          }
        }

        if (clearedLines > 0) {
          this.linesCleared += clearedLines
          this.updateScore(clearedLines)
          this.updateLevel()
          this.cameras.main.shake(140, 0.0045)
        }
      }

      updateScore(lines) {
        const lineScores = [0, 100, 300, 500, 800]
        this.score += lineScores[lines]
        this.updateHud()
      }

      updateLevel() {
        const newLevel = Math.floor(this.linesCleared / 10) + 1
        if (newLevel > this.level && newLevel <= 10) {
          this.level = newLevel
          this.dropInterval = Math.max(180, 900 - (this.level - 1) * 70)
        }

        this.updateHud()
      }

      updateHud() {
        if (!this.scoreText) {
          return
        }

        this.scoreText.setText(String(this.score).padStart(6, "0"))
        this.levelText.setText(String(this.level).padStart(2, "0"))
        this.linesText.setText(String(this.linesCleared).padStart(3, "0"))
      }

      createChrome() {
        this.chromeGraphics = this.add.graphics()
        this.boardGraphics = this.add.graphics()
        this.nextPieceGraphics = this.add.graphics()
        this.overlayGraphics = this.add.graphics()

        this.drawChrome()

        this.brandText = this.add
          .text(SIDE_PANEL_X + 16, 38, "TETRIS", {
            fontFamily: '"Courier New", monospace',
            fontSize: "30px",
            fontStyle: "bold",
            color: "#f8fafc",
            stroke: "#020617",
            strokeThickness: 5,
          })
          .setOrigin(0, 0)

        this.scoreLabel = this.add.text(SIDE_PANEL_X + 18, 98, "SCORE", labelStyle)
        this.scoreText = this.add.text(SIDE_PANEL_X + 18, 120, "000000", valueStyle)

        this.levelLabel = this.add.text(SIDE_PANEL_X + 18, 176, "LEVEL", labelStyle)
        this.levelText = this.add.text(SIDE_PANEL_X + 18, 198, "01", valueStyle)

        this.linesLabel = this.add.text(SIDE_PANEL_X + 18, 254, "LINES", labelStyle)
        this.linesText = this.add.text(SIDE_PANEL_X + 18, 276, "000", valueStyle)

        this.nextLabel = this.add.text(NEXT_BOX_X, NEXT_BOX_Y - 26, "NEXT", labelStyle)

        this.controlsLabel = this.add.text(SIDE_PANEL_X + 18, 494, "CONTROLS", labelStyle)
        this.controlsText = this.add
          .text(
            SIDE_PANEL_X + 18,
            516,
            "LEFT RIGHT  MOVE\nUP         ROTATE\nDOWN       SOFT DROP\nSPACE      HARD DROP",
            {
              fontFamily: '"Courier New", monospace',
              fontSize: "12px",
              color: "#dbeafe",
              lineSpacing: 8,
            }
          )
          .setOrigin(0, 0)

        this.overlayTitle = this.add
          .text(
            BOARD_X + BOARD_PIXEL_WIDTH / 2,
            BOARD_Y + BOARD_PIXEL_HEIGHT / 2 - 26,
            "",
            {
              fontFamily: '"Courier New", monospace',
              fontSize: "34px",
              fontStyle: "bold",
              color: "#f8fafc",
              stroke: "#020617",
              strokeThickness: 6,
            }
          )
          .setOrigin(0.5)
          .setVisible(false)

        this.overlaySubtitle = this.add
          .text(
            BOARD_X + BOARD_PIXEL_WIDTH / 2,
            BOARD_Y + BOARD_PIXEL_HEIGHT / 2 + 24,
            "",
            {
              fontFamily: '"Courier New", monospace',
              fontSize: "15px",
              fontStyle: "bold",
              color: "#dbeafe",
            }
          )
          .setOrigin(0.5)
          .setVisible(false)

        this.updateHud()
      }

      drawChrome() {
        this.chromeGraphics.clear()

        this.chromeGraphics.fillStyle(0x101729, 1)
        this.chromeGraphics.fillRoundedRect(10, 12, GAME_WIDTH - 20, GAME_HEIGHT - 24, 24)
        this.chromeGraphics.lineStyle(4, 0x8da2c5, 1)
        this.chromeGraphics.strokeRoundedRect(10, 12, GAME_WIDTH - 20, GAME_HEIGHT - 24, 24)

        this.chromeGraphics.fillStyle(0x1b2a52, 1)
        this.chromeGraphics.fillRoundedRect(
          BOARD_X - 10,
          BOARD_Y - 10,
          BOARD_PIXEL_WIDTH + 20,
          BOARD_PIXEL_HEIGHT + 20,
          16
        )
        this.chromeGraphics.lineStyle(3, 0x9eb8df, 1)
        this.chromeGraphics.strokeRoundedRect(
          BOARD_X - 10,
          BOARD_Y - 10,
          BOARD_PIXEL_WIDTH + 20,
          BOARD_PIXEL_HEIGHT + 20,
          16
        )

        this.chromeGraphics.fillStyle(0x0f1a33, 1)
        this.chromeGraphics.fillRoundedRect(
          SIDE_PANEL_X,
          SIDE_PANEL_Y,
          SIDE_PANEL_WIDTH,
          SIDE_PANEL_HEIGHT,
          18
        )
        this.chromeGraphics.lineStyle(2, 0x6278a6, 1)
        this.chromeGraphics.strokeRoundedRect(
          SIDE_PANEL_X,
          SIDE_PANEL_Y,
          SIDE_PANEL_WIDTH,
          SIDE_PANEL_HEIGHT,
          18
        )

        this.chromeGraphics.fillStyle(0x070d19, 1)
        this.chromeGraphics.fillRoundedRect(
          NEXT_BOX_X - 8,
          NEXT_BOX_Y,
          NEXT_BOX_SIZE,
          NEXT_BOX_SIZE,
          14
        )
        this.chromeGraphics.lineStyle(2, 0x4c628f, 1)
        this.chromeGraphics.strokeRoundedRect(
          NEXT_BOX_X - 8,
          NEXT_BOX_Y,
          NEXT_BOX_SIZE,
          NEXT_BOX_SIZE,
          14
        )
      }

      drawBoard() {
        this.boardGraphics.clear()

        this.boardGraphics.fillStyle(0x091122, 1)
        this.boardGraphics.fillRect(
          BOARD_X,
          BOARD_Y,
          BOARD_PIXEL_WIDTH,
          BOARD_PIXEL_HEIGHT
        )

        this.boardGraphics.lineStyle(1, 0x142446, 0.82)
        for (let x = 0; x <= this.boardWidth; x += 1) {
          const lineX = BOARD_X + x * this.gridSize
          this.boardGraphics.beginPath()
          this.boardGraphics.moveTo(lineX, BOARD_Y)
          this.boardGraphics.lineTo(lineX, BOARD_Y + BOARD_PIXEL_HEIGHT)
          this.boardGraphics.strokePath()
        }

        for (let y = 0; y <= this.boardHeight; y += 1) {
          const lineY = BOARD_Y + y * this.gridSize
          this.boardGraphics.beginPath()
          this.boardGraphics.moveTo(BOARD_X, lineY)
          this.boardGraphics.lineTo(BOARD_X + BOARD_PIXEL_WIDTH, lineY)
          this.boardGraphics.strokePath()
        }

        for (let y = 0; y < this.boardHeight; y += 1) {
          for (let x = 0; x < this.boardWidth; x += 1) {
            const cellKey = this.board[y][x]
            if (!cellKey) {
              continue
            }

            this.drawBlock(
              this.boardGraphics,
              BOARD_X + x * this.gridSize,
              BOARD_Y + y * this.gridSize,
              this.gridSize,
              PIECE_COLORS[cellKey]
            )
          }
        }

        if (!this.currentPiece) {
          return
        }

        const { shape, x: posX, y: posY, tetrominoKey } = this.currentPiece
        for (let y = 0; y < shape.length; y += 1) {
          for (let x = 0; x < shape[y].length; x += 1) {
            if (!shape[y][x]) {
              continue
            }

            this.drawBlock(
              this.boardGraphics,
              BOARD_X + (posX + x) * this.gridSize,
              BOARD_Y + (posY + y) * this.gridSize,
              this.gridSize,
              PIECE_COLORS[tetrominoKey]
            )
          }
        }
      }

      drawNextPiece() {
        this.nextPieceGraphics.clear()

        if (!this.nextPiece) {
          return
        }

        const previewCellSize = 20
        const { shape, tetrominoKey } = this.nextPiece
        const shapeWidth = shape[0].length * previewCellSize
        const shapeHeight = shape.length * previewCellSize
        const offsetX = NEXT_BOX_X + (NEXT_BOX_SIZE - 16 - shapeWidth) / 2
        const offsetY = NEXT_BOX_Y + (NEXT_BOX_SIZE - shapeHeight) / 2

        for (let y = 0; y < shape.length; y += 1) {
          for (let x = 0; x < shape[y].length; x += 1) {
            if (!shape[y][x]) {
              continue
            }

            this.drawBlock(
              this.nextPieceGraphics,
              offsetX + x * previewCellSize,
              offsetY + y * previewCellSize,
              previewCellSize,
              PIECE_COLORS[tetrominoKey]
            )
          }
        }
      }

      drawBlock(graphics, x, y, size, colorHex) {
        const borderColor = mixColor(colorHex, -0.34)
        const fillColor = mixColor(colorHex, 0.06)
        const highlightColor = mixColor(colorHex, 0.42)
        const shadowColor = mixColor(colorHex, -0.55)

        graphics.fillStyle(borderColor, 1)
        graphics.fillRect(x + 1, y + 1, size - 2, size - 2)

        graphics.fillStyle(fillColor, 1)
        graphics.fillRect(x + 4, y + 4, size - 8, size - 8)

        graphics.fillStyle(highlightColor, 1)
        graphics.fillRect(x + 2, y + 2, size - 4, 4)
        graphics.fillRect(x + 2, y + 2, 4, size - 4)

        graphics.fillStyle(shadowColor, 1)
        graphics.fillRect(x + 2, y + size - 6, size - 4, 4)
        graphics.fillRect(x + size - 6, y + 2, 4, size - 4)
      }

      showOverlay(title, subtitle, accentColor) {
        this.overlayGraphics.clear()
        this.overlayGraphics.fillStyle(0x020617, 0.82)
        this.overlayGraphics.fillRoundedRect(
          BOARD_X + 18,
          BOARD_Y + BOARD_PIXEL_HEIGHT / 2 - 86,
          BOARD_PIXEL_WIDTH - 36,
          172,
          18
        )
        this.overlayGraphics.lineStyle(4, accentColor, 1)
        this.overlayGraphics.strokeRoundedRect(
          BOARD_X + 18,
          BOARD_Y + BOARD_PIXEL_HEIGHT / 2 - 86,
          BOARD_PIXEL_WIDTH - 36,
          172,
          18
        )

        this.overlayTitle.setText(title).setVisible(true)
        this.overlaySubtitle.setText(subtitle).setVisible(true)

        if (this.overlayPulseTween) {
          this.overlayPulseTween.stop()
        }

        this.overlaySubtitle.setAlpha(1)
        this.overlayPulseTween = this.tweens.add({
          targets: this.overlaySubtitle,
          alpha: { from: 1, to: 0.45 },
          duration: 720,
          yoyo: true,
          repeat: -1,
        })
      }

      hideOverlay() {
        this.overlayGraphics.clear()
        this.overlayTitle.setVisible(false)
        this.overlaySubtitle.setVisible(false)

        if (this.overlayPulseTween) {
          this.overlayPulseTween.stop()
          this.overlayPulseTween = null
        }
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      parent: gameRef.current,
      backgroundColor: "#050814",
      scene: TetrisScene,
    }

    const game = new Phaser.Game(config)
    gameInstance.current = game

    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy(true)
        gameInstance.current = null
      }
    }
  }, [])

  return (
    <div className={tetrisGameStyles.arcadeShell}>
      <div className={tetrisGameStyles.screenFrame}>
        <div ref={gameRef} className={tetrisGameStyles.gameMount}></div>
      </div>
    </div>
  )
}

export default TetrisGame
