import React, { useEffect, useRef } from "react"
import Seo from "../../../components/Seo"
import ProjectDetail from "../../../components/ProjectDetail"
import Phaser from "phaser"

const TetrisGame = () => {
  const gameRef = useRef(null)
  const gameInstance = useRef(null)

  useEffect(() => {
    class TetrisScene extends Phaser.Scene {
      constructor() {
        super({ key: "TetrisScene" })
        this.gameState = "start" // 게임 상태: 'start', 'playing', 'gameover'
        this.score = 0
        this.level = 1
        this.linesCleared = 0
        this.dropInterval = 1000
        this.lastDropTime = 0
        this.board = []
        this.currentPiece = null
        this.nextPiece = null
        this.gridSize = 32
        this.boardWidth = 10
        this.boardHeight = 20
      }

      preload() {
        // 필요한 리소스 로드
      }

      create() {
        // 입력 처리
        this.input.keyboard.on("keydown", this.handleInput, this)
        this.input.on("pointerdown", this.handlePointerDown, this)

        // 점수 및 레벨 텍스트 생성
        this.createText()

        // 게임 시작 메시지 표시
        this.showStartText()

        // 구분선 그리기
        this.drawSeparatorLine()
      }

      update(time) {
        if (this.gameState === "playing") {
          if (time > this.lastDropTime + this.dropInterval) {
            this.movePieceDown()
            this.lastDropTime = time
          }
        }
      }

      showStartText() {
        this.startText = this.add.text(
          this.sys.game.config.width / 2,
          this.sys.game.config.height / 2,
          "게임 시작",
          { fontSize: "40px", fill: "#ffffff" }
        )
        this.startText.setOrigin(0.5)
      }

      handlePointerDown() {
        if (this.gameState === "start") {
          this.startGame()
        } else if (this.gameState === "gameover") {
          this.restartGame()
        }
      }

      handleInput(event) {
        event.preventDefault();
        if (this.gameState === "start") {
          this.startGame()
        } else if (this.gameState === "playing") {
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
        } else if (this.gameState === "gameover") {
          this.restartGame()
        }
      }

      startGame() {
        this.gameState = "playing"
        if (this.startText) {
          this.startText.destroy()
        }

        // 보드 초기화
        this.board = Array.from({ length: this.boardHeight }, () =>
          Array(this.boardWidth).fill(0)
        )

        // 게임 변수 초기화
        this.score = 0
        this.level = 1
        this.linesCleared = 0
        this.dropInterval = 1000
        this.lastDropTime = 0
        this.updateScore(0)
        this.updateLevel()

        // 테트로미노 모양 정의
        this.tetrominoes = {
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

        // 현재 블록과 다음 블록 설정
        this.nextPiece = this.createRandomPiece()
        this.spawnPiece()

        // 보드 및 다음 블록 그리기
        this.drawBoard()
        this.drawNextPiece()
      }

      endGame() {
        this.gameState = "gameover"
        this.gameOverText = this.add.text(
          this.sys.game.config.width / 2,
          this.sys.game.config.height / 2,
          "게임 오버",
          { fontSize: "40px", fill: "#ff0000" }
        )
        this.gameOverText.setOrigin(0.5)
      }

      restartGame() {
        if (this.gameOverText) {
          this.gameOverText.destroy()
        }
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
          // 게임 오버 처리
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
        } else {
          this.drawBoard()
        }
      }

      movePieceDown() {
        this.currentPiece.y += 1
        if (this.checkCollision()) {
          this.currentPiece.y -= 1
          this.lockPiece()
          this.clearLines()
          this.spawnPiece()
        } else {
          this.drawBoard()
        }
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
        } else {
          this.drawBoard()
        }
      }

      getRotatedShape(tetrominoKey, rotationIndex) {
        const shapes = this.tetrominoes[tetrominoKey]
        if (shapes[rotationIndex]) {
          return shapes[rotationIndex]
        } else {
          // 회전된 모양 생성
          let shape = shapes[0]
          for (let i = 0; i < rotationIndex; i++) {
            shape = this.rotateMatrix(shape)
          }
          shapes[rotationIndex] = shape
          return shape
        }
      }

      rotateMatrix(matrix) {
        return matrix[0].map((val, index) =>
          matrix.map(row => row[index]).reverse()
        )
      }

      checkCollision() {
        const { shape, x: posX, y: posY } = this.currentPiece
        for (let y = 0; y < shape.length; y++) {
          for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
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
        }
        return false
      }

      lockPiece() {
        const { shape, x: posX, y: posY } = this.currentPiece
        for (let y = 0; y < shape.length; y++) {
          for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
              const boardX = posX + x
              const boardY = posY + y
              if (this.board[boardY]) {
                this.board[boardY][boardX] = shape[y][x]
              }
            }
          }
        }
      }

      clearLines() {
        let lines = 0
        for (let y = this.boardHeight - 1; y >= 0; y--) {
          if (this.board[y].every(cell => cell !== 0)) {
            this.board.splice(y, 1)
            this.board.unshift(Array(this.boardWidth).fill(0))
            lines++
            y++
          }
        }

        if (lines > 0) {
          this.linesCleared += lines
          this.updateScore(lines)
          this.updateLevel()
        }
      }

      updateScore(lines) {
        const lineScores = [0, 100, 300, 500, 800]
        this.score += lineScores[lines]
        this.scoreText.setText(`점수: ${this.score}`)
      }

      updateLevel() {
        const newLevel = Math.floor(this.linesCleared / 10) + 1
        if (newLevel > this.level && newLevel <= 10) {
          this.level = newLevel
          this.levelText.setText(`레벨: ${this.level}`)
          this.dropInterval = 1000 - (this.level - 1) * 100
        }
      }

      drawBoard() {
        if (this.graphics) {
          this.graphics.clear()
        } else {
          this.graphics = this.add.graphics()
        }

        // 배경색 채우기 (게임 보드 영역만)
        this.graphics.fillStyle(0x000000)
        this.graphics.fillRect(
          0,
          0,
          this.boardWidth * this.gridSize,
          this.boardHeight * this.gridSize
        )

        // 보드 그리기
        for (let y = 0; y < this.boardHeight; y++) {
          for (let x = 0; x < this.boardWidth; x++) {
            if (this.board[y][x]) {
              this.graphics.fillStyle(0xffffff)
              this.graphics.fillRect(
                x * this.gridSize,
                y * this.gridSize,
                this.gridSize - 1,
                this.gridSize - 1
              )
            }
          }
        }

        // 현재 블록 그리기
        const { shape, x: posX, y: posY } = this.currentPiece
        for (let y = 0; y < shape.length; y++) {
          for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
              this.graphics.fillStyle(0xff0000)
              this.graphics.fillRect(
                (posX + x) * this.gridSize,
                (posY + y) * this.gridSize,
                this.gridSize - 1,
                this.gridSize - 1
              )
            }
          }
        }
      }

      drawNextPiece() {
        if (this.nextPieceGraphics) {
          this.nextPieceGraphics.clear()
        } else {
          this.nextPieceGraphics = this.add.graphics()
        }
        this.nextPieceGraphics.clear()

        const offsetX = this.boardWidth * this.gridSize + 10 // 게임 보드 오른쪽 밖으로 이동
        const offsetY = 150 // 이전보다 아래로 조정

        const { shape } = this.nextPiece
        for (let y = 0; y < shape.length; y++) {
          for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
              this.nextPieceGraphics.fillStyle(0x00ff00)
              this.nextPieceGraphics.fillRect(
                offsetX + x * (this.gridSize / 2),
                offsetY + y * (this.gridSize / 2),
                this.gridSize / 2 - 1,
                this.gridSize / 2 - 1
              )
            }
          }
        }

        // "다음 블록" 텍스트 표시
        if (!this.nextText) {
          this.nextText = this.add.text(offsetX, offsetY - 30, "다음 블록:", {
            fontSize: "20px",
            fill: "#fff",
          })
        } else {
          this.nextText.setPosition(offsetX, offsetY - 30)
        }
      }

      createText() {
        const textOffsetX = this.boardWidth * this.gridSize + 10 // 게임 보드 오른쪽 밖으로 이동
        this.scoreText = this.add.text(textOffsetX, 10, "점수: 0", {
          fontSize: "20px",
          fill: "#fff",
        })
        this.levelText = this.add.text(textOffsetX, 40, "레벨: 1", {
          fontSize: "20px",
          fill: "#fff",
        })
      }

      drawSeparatorLine() {
        if (!this.separatorGraphics) {
          this.separatorGraphics = this.add.graphics()
        }
        this.separatorGraphics.lineStyle(2, 0xffffff, 1)
        this.separatorGraphics.beginPath()
        this.separatorGraphics.moveTo(this.boardWidth * this.gridSize, 0)
        this.separatorGraphics.lineTo(
          this.boardWidth * this.gridSize,
          this.boardHeight * this.gridSize
        )
        this.separatorGraphics.closePath()
        this.separatorGraphics.strokePath()
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 14 * 32, // 너비를 늘려 오른쪽에 공간 추가
      height: 20 * 32,
      parent: gameRef.current,
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div ref={gameRef}></div>
    </div>
  )
}

const TetrisGameApp = ({ location }) => {
  const isFullscreen = location?.state?.isFullscreen ?? true
  return (
    <ProjectDetail title={"테트리스 게임"} isFullscreen={isFullscreen}>
      <div>
        <TetrisGame />
      </div>
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="Tetris Game"
    description="A Tetris game that you can easily enjoy when you're bored."
    keywords={["Tetris Game", "WebGame"]}
  />
)
export default TetrisGameApp;