import React, { useEffect, useRef, useState } from 'react';
import tileImg from "../../images/games/minesweeper/tile_40x40.png";
import mineImg from "../../images/games/minesweeper/mine_40x40.png";
import flagImg from "../../images/games/minesweeper/flag_40x40.png";

const MinesweeperGame = ({ onGameOver }) => {
    const gameRef = useRef(null);
    const gameInstanceRef = useRef(null);
    const [phaser, setPhaser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
        import('phaser').then((Phaser) => {
            setPhaser(Phaser);
        });
        }
    }, []);

    useEffect(() => {
        if (!phaser) return;

        const config = {
        type: phaser.AUTO,
        width: 400,
        height: 450,
        parent: gameRef.current,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
        };

        const game = new phaser.Game(config);
        gameInstanceRef.current = game;

        const preventContextMenu = (e) => {
        e.preventDefault();
        };

        if (gameRef.current) {
        gameRef.current.addEventListener('contextmenu', preventContextMenu);
        }

        return () => {
        game.destroy(true);
        if (gameRef.current) {
            gameRef.current.removeEventListener('contextmenu', preventContextMenu);
        }
        };
    }, [phaser]);

    function preload() {
        this.load.image('tile', tileImg);
        this.load.image('mine', mineImg);
        this.load.image('flag', flagImg);
    }

    function create() {
        const boardSize = 10;
        const tileSize = 40;
        const mineCount = 15;

        let board;
        let tiles = [];
        let remainingMines;
        let remainingFlags;
        let timeRemaining;
        let gameActive;
        let textObjects = [];

        const timerText = this.add.text(10, 410, 'Time: 60', { font: '20px Arial', fill: '#ffffff' });
        const mineText = this.add.text(200, 410, 'Mines: ' + mineCount, { font: '20px Arial', fill: '#ffffff' });
        const flagText = this.add.text(300, 410, 'Flags: ' + mineCount, { font: '20px Arial', fill: '#ffffff' });

        const startButton = this.add.text(200, 225, 'Start Game', {
        font: '32px Arial',
        fill: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => {
        startButton.setVisible(false);
        startGame();
        });

        const startGame = () => {
        textObjects.forEach(text => text.destroy());
        textObjects = [];

        board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
        tiles.forEach(tile => tile.destroy());
        tiles = [];
        remainingMines = mineCount;
        remainingFlags = mineCount;
        timeRemaining = 60;
        gameActive = true;

        timerText.setText('Time: ' + timeRemaining);
        mineText.setText('Mines: ' + remainingMines);
        flagText.setText('Flags: ' + remainingFlags);

        for (let i = 0; i < mineCount; i++) {
            let x, y;
            do {
            x = Math.floor(Math.random() * boardSize);
            y = Math.floor(Math.random() * boardSize);
            } while (board[y][x] === 'mine');
            board[y][x] = 'mine';
        }

        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
            if (board[y][x] !== 'mine') {
                let count = 0;
                for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (y + dy >= 0 && y + dy < boardSize && x + dx >= 0 && x + dx < boardSize) {
                    if (board[y + dy][x + dx] === 'mine') {
                        count++;
                    }
                    }
                }
                }
                board[y][x] = count;
            }
            }
        }

        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
            const tile = this.add.image(x * tileSize, y * tileSize, 'tile').setOrigin(0);
            tile.setInteractive();
            tile.on('pointerdown', (pointer) => {
                if (gameActive) {
                if (pointer.rightButtonDown()) {
                    flagTile(x, y);
                } else {
                    revealTile(x, y);
                }
                }
            });
            tiles.push(tile);
            }
        }
        };

        const revealTile = (x, y) => {
        if (board[y][x] === 'mine') {
            tiles[y * boardSize + x].setTexture('mine');
            gameOver(false);
        } else {
            tiles[y * boardSize + x].setAlpha(0.5);
            if (board[y][x] > 0) {
            const text = this.add.text(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, board[y][x], {
                font: '20px Arial',
                fill: '#ffffff'
            }).setOrigin(0.5);
            textObjects.push(text);
            } else {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                if (y + dy >= 0 && y + dy < boardSize && x + dx >= 0 && x + dx < boardSize) {
                    if (tiles[(y + dy) * boardSize + (x + dx)].alpha === 1) {
                    revealTile(x + dx, y + dy);
                    }
                }
                }
            }
            }
        }
        checkWin();
        };

        const flagTile = (x, y) => {
        const index = y * boardSize + x;
        if (tiles[index].texture.key === 'tile' && remainingFlags > 0) {
            tiles[index].setTexture('flag');
            remainingFlags--;
            flagText.setText('Flags: ' + remainingFlags);
        } else if (tiles[index].texture.key === 'flag') {
            tiles[index].setTexture('tile');
            remainingFlags++;
            flagText.setText('Flags: ' + remainingFlags);
        }
        };

        const gameOver = (win) => {
        gameActive = false;
        const resultText = win ? 'You Win!' : 'Game Over!';
        const resultColor = win ? '#00ff00' : '#ff0000';
        const gameOverText = this.add.text(200, 200, resultText, {
            font: '32px Arial',
            fill: resultColor
        }).setOrigin(0.5);
        textObjects.push(gameOverText);

        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
            if (board[y][x] === 'mine') {
                tiles[y * boardSize + x].setTexture('mine');
            }
            }
        }

        const resetButton = this.add.text(200, 300, 'Reset Game', {
            font: '32px Arial',
            fill: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        resetButton.on('pointerdown', () => {
            resetButton.destroy();
            startGame();
        });
        };

        const checkWin = () => {
        let win = true;
        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
            if (board[y][x] !== 'mine' && tiles[y * boardSize + x].alpha === 1) {
                win = false;
                break;
            }
            }
            if (!win) break;
        }
        if (win) {
            gameOver(true);
        }
        };

        this.time.addEvent({
        delay: 1000,
        callback: updateTimer,
        callbackScope: this,
        loop: true
        });

        function updateTimer() {
        if (gameActive) {
            timeRemaining--;
            timerText.setText('Time: ' + timeRemaining);
            if (timeRemaining <= 0) {
            gameOver(false);
            }
        }
        }
    }

    function update() {
        // This function is called every frame
    }

    return <div ref={gameRef} />;
};

export default MinesweeperGame;