import React, { useEffect, useRef } from "react"
import Seo from "../../../components/Seo"
import ProjectDetail from "../../../components/ProjectDetail"
import Phaser from "phaser"

const MarioGame = () => {
  const gameRef = useRef(null)
  const gameInstance = useRef(null)

  useEffect(() => {
    class MarioScene extends Phaser.Scene {
      constructor() {
        super({ key: "MarioScene" })
      }

      preload() {}

      create() {
        const g = this.make.graphics({ x: 0, y: 0, add: false })
        g.fillStyle(0x00ff00, 1)
        g.fillRect(0, 0, 800, 40)
        g.generateTexture("ground", 800, 40)
        g.clear()
        g.fillStyle(0x008000, 1)
        g.fillRect(0, 0, 120, 20)
        g.generateTexture("platform", 120, 20)
        g.clear()
        g.fillStyle(0xff0000, 1)
        g.fillRect(0, 0, 32, 48)
        g.generateTexture("player", 32, 48)
        g.clear()
        g.fillStyle(0xffff00, 1)
        g.fillRect(0, 0, 20, 20)
        g.generateTexture("coin", 20, 20)
        g.destroy()

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(400, 580, "ground")
        this.platforms.create(600, 450, "platform")
        this.platforms.create(50, 300, "platform")
        this.platforms.create(750, 220, "platform")

        this.player = this.physics.add.sprite(100, 450, "player")
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)

        this.physics.add.collider(this.player, this.platforms)

        this.coins = this.physics.add.group({
          key: "coin",
          repeat: 11,
          setXY: { x: 12, y: 0, stepX: 70 },
        })
        this.coins.children.iterate(child => {
          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })

        this.physics.add.collider(this.coins, this.platforms)
        this.physics.add.overlap(
          this.player,
          this.coins,
          this.collectCoin,
          null,
          this
        )

        this.cursors = this.input.keyboard.createCursorKeys()
      }

      collectCoin(player, coin) {
        coin.disableBody(true, true)
      }

      update() {
        if (this.cursors.left.isDown) {
          this.player.setVelocityX(-160)
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(160)
        } else {
          this.player.setVelocityX(0)
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
          this.player.setVelocityY(-330)
        }
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: MarioScene,
      parent: gameRef.current,
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div ref={gameRef}></div>
    </div>
  )
}

const MarioGameApp = ({ location }) => {
  const isFullscreen = location?.state?.isFullscreen ?? true
  return (
    <ProjectDetail title={"슈퍼마리오 게임"} isFullscreen={isFullscreen}>
      <MarioGame />
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="Super Mario Game"
    description="A simple platform game inspired by classic side-scrollers."
    keywords={["Super Mario Game", "WebGame"]}
  />
)

export default MarioGameApp
