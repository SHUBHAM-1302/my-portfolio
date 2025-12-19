import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss']
})
export class SnakeGameComponent {


  @ViewChild('gameCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  box = 20;
  snake = [{ x: 9 * this.box, y: 10 * this.box }];
  direction = 'RIGHT';

  food = {
    x: Math.floor(Math.random() * 19) * this.box,
    y: Math.floor(Math.random() * 19) * this.box
  };

  gameInterval: any;
  isPaused = false;

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    document.addEventListener('keydown', this.changeDirection);
    this.startGame();
  }

  startGame() {
    this.gameInterval = setInterval(() => {
      if (!this.isPaused) {
        this.draw();
      }
    }, 150);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  changeDirection = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && this.direction !== 'RIGHT') this.direction = 'LEFT';
    if (event.key === 'ArrowUp' && this.direction !== 'DOWN') this.direction = 'UP';
    if (event.key === 'ArrowRight' && this.direction !== 'LEFT') this.direction = 'RIGHT';
    if (event.key === 'ArrowDown' && this.direction !== 'UP') this.direction = 'DOWN';
  };

  draw() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, 400, 400);

    this.snake.forEach((s, i) => {
      this.ctx.fillStyle = i === 0 ? 'lime' : 'green';
      this.ctx.fillRect(s.x, s.y, this.box, this.box);
    });

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.food.x, this.food.y, this.box, this.box);

    let headX = this.snake[0].x;
    let headY = this.snake[0].y;

    if (this.direction === 'LEFT') headX -= this.box;
    if (this.direction === 'UP') headY -= this.box;
    if (this.direction === 'RIGHT') headX += this.box;
    if (this.direction === 'DOWN') headY += this.box;

    if (headX === this.food.x && headY === this.food.y) {
      this.food = {
        x: Math.floor(Math.random() * 19) * this.box,
        y: Math.floor(Math.random() * 19) * this.box
      };
    } else {
      this.snake.pop();
    }

    const newHead = { x: headX, y: headY };

    if (
      headX < 0 || headY < 0 ||
      headX >= 400 || headY >= 400 ||
      this.snake.some(s => s.x === headX && s.y === headY)
    ) {
      clearInterval(this.gameInterval);
      alert('Game Over');
      window.location.reload();
    }

    this.snake.unshift(newHead);
  }
}
