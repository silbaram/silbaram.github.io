import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

import playerImg from '../../images/games/platformer/player.svg';
import groundImg from '../../images/games/platformer/ground.svg';
import platformImg from '../../images/games/platformer/platform.svg';

const PlatformerGame = () => {
  const gameRef = useRef(null);
  const gameInstance = useRef(null);

  useEffect(() => {
    class GameScene extends Phaser.Scene {
      constructor() {
        super({ key: 'GameScene' });
      }

      preload() {
        this.load.image('player', playerImg);
        this.load.image('ground', groundImg);
        this.load.image('platform', platformImg);
      }

      create() {
        // Platforms
        const platforms = this.physics.add.staticGroup();
        platforms.create(400, 584, 'ground').setScale(20, 1).refreshBody();
        platforms.create(600, 400, 'platform');
        platforms.create(50, 250, 'platform');
        platforms.create(750, 220, 'platform');

        // Player
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.world.bounds.width = 800;
        this.physics.world.bounds.height = 600;

        // Physics
        this.physics.add.collider(this.player, platforms);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
      }

      update() {
        if (!this.player) return;

        if (this.cursors.left.isDown) {
          this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(160);
        } else {
          this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
          this.player.setVelocityY(-330);
        }
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: GameScene
    };

    if (gameRef.current) {
        gameInstance.current = new Phaser.Game(config);
    }

    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy(true);
        gameInstance.current = null;
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div ref={gameRef}></div>
    </div>
  );
};

export default PlatformerGame;
