import React, { useState, useEffect, useRef } from 'react';

const JumpGame = () => {
  const canvasRef = useRef(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 200;

    const dino = {
      x: 10,
      y: 150,
      width: 50,
      height: 50,
      draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
      },
    };

    class Cactus {
      constructor() {
        this.x = 500;
        this.y = 150;
        this.width = 20;
        this.height = 50;
      }
      draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }

    let timer = 0;
    const cactusArray = [];
    let jumpTimer = 0;
    let animation;

    function frameAction() {
      animation = requestAnimationFrame(frameAction);
      timer++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (timer % 120 === 0) {
        const cactus = new Cactus();
        cactusArray.push(cactus);
      }

      cactusArray.forEach((cactus, i, o) => {
        if (cactus.x < 0) {
          o.splice(i, 1);
        }
        cactus.x -= 2;

        collision(dino, cactus);

        cactus.draw();
      });

      if (isJumping) {
        dino.y -= 3;
        jumpTimer++;
      }
      if (!isJumping) {
        if (dino.y < 150) {
          dino.y += 3;
        }
      }
      if (jumpTimer > 40) {
        isJumping = false;
        jumpTimer = 0;
      }

      dino.draw();
    }

    let isJumping = false;
    document.addEventListener('keydown', e => {
      if (e.code === 'Space') {
        isJumping = true;
      }
    });

    function collision(dino, cactus) {
      const xDiff = cactus.x - (dino.x + dino.width);
      const yDiff = cactus.y - (dino.y + dino.height);
      if (xDiff < 0 && yDiff < 0) {
        cancelAnimationFrame(animation);
        setIsGameOver(true);
      }
    }

    frameAction();

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div>
      <h1>Jump Game</h1>
      <canvas ref={canvasRef}></canvas>
      {isGameOver && <h2>Game Over</h2>}
    </div>
  );
};

export default JumpGame;
