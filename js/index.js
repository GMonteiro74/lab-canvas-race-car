window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    game.start();
  };

  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  let interval;


  const canvasHeight = canvas.clientHeight;
  const canvasWidth = canvas.clientWidth;

  const game = {
    frames: 0,
    obstacles: [],
    start: () => {
      interval = setInterval(() => {
        updateCanvas();
      }, 10);        
    },
    stop: () => {
        clearInterval(interval)
    },
    clear: () => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    },
    score: () => {
        const points = Math.floor(game.frames / 5);
        context.font = '50px Arial';
        context.fillStyle = 'tomato';
        context.fillText(`Score: ${points}`, 200, 200)
    },
   

}

//   const game = {
//     frames: 0,
//     obstacles: [],
    

//   }

class Car {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0;


    const img = new Image();
        img.src = './images/car.png';
        img.onload = () => {
            this.image = img;
            this.draw();
        };
  }

  draw() {
    context.drawImage(this.image, this.x, this.y, 75, 150)
  }

  move() {
    // if (this.x > 60 && this.x < canvasWidth - 60)
    this.x += this.speed;
  }
  
  left() {
    return this.x;
}

right() {
    return this.x + this.width;
}

top() {
    return this.y;
}

bottom() {
    return this.y + this.height;
}

crashWith(component) {

    return !(
    this.bottom() < component.top() || this.top() > component.bottom() || this.right() < component.left() || this.left() > component.right()
    )

}

  
}

class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
   
}

  draw() {
  context.fillStyle = '#882418';
  context.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    
      this.y += this.speed;
    
  }

  left() {
    return this.x;
}

right() {
    return this.x + this.width;
}

top() {
    return this.y;
}

bottom() {
    return this.y + this.height;
}




crashWith(component) {

    return !(
    this.bottom() < component.top() || this.top() > component.bottom() || this.right() < component.left() || this.left() > component.right()
    )

}

  
}

document.addEventListener('keydown', (e) => {
  switch(e.key) {
      
      case 'ArrowLeft':
          myCar.speed --;
          break;
      case 'ArrowRight':
          myCar.speed ++;
          break;
  }
})

document.addEventListener('keyup', () => {
      myCar.speed = 0;
})

const myCar = new Car(210, canvasHeight - 200);

function drawObstacles() {

  game.obstacles.forEach (obstacle => {
      obstacle.y++;
      obstacle.draw();
      obstacle.move();
  })

  game.frames++;

  if (game.frames % 220 === 0) {
  const minWidth = 80;
  const maxWidth = 300;

  const randomWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth); 

  const minGap = 120;
  const maxGap = 150;

  const randomGap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

  const obstacleLeft = new Obstacle(0, 0, randomWidth, 15);

  const obstacleRight = new Obstacle(randomWidth + randomGap, 0, canvasWidth - (randomWidth - randomGap), 15);

  game.obstacles.push(obstacleLeft);
  game.obstacles.push(obstacleRight);
  }

  console.log(game.obstacles);

} 

function checkGameOver() {
  
  game.obstacles.forEach( obstacle => {
    if (obstacle.crashWith(myCar)) {
      game.stop();
    }
  })
}

function updateCanvas() {
  game.clear();
  myCar.draw();
  myCar.move();
  drawObstacles();
  checkGameOver();
  myCar.boundaries();
  game.score();
}

};

