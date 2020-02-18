class bubble {
    constructor(canvasWidth, canvasHeight) {
      this.maxHeight = canvasHeight;
      this.maxWidth = canvasWidth;
      this.randomise();
    }
  
    generateDecimalBetween(min, max) {
      return (Math.random() * (min - max) + max).toFixed(2);
    }
  
    update() {
      this.posX = this.posX - this.movementX;
      this.posY = this.posY - this.movementY;
  
      if (this.posY < 0 || this.posX < 0 || this.posX > this.maxWidth) {
        this.randomise();
        this.posY = this.maxHeight;
      }
    }
  
  
    randomise() {
      const colorVals = [33,247,189]; // color options
      this.colour = colorVals[Math.floor(Math.random() * Math.floor(3))]; // color selector randomizer
      this.size = this.generateDecimalBetween(3, 10); // dot size range
      this.movementX = this.generateDecimalBetween(0, 0); // dot x-axis movement speed range
      this.movementY = this.generateDecimalBetween(0.5, 1); // dot y-axis movement speed range
      this.posX = this.generateDecimalBetween(0, this.maxWidth); // starting x-pos range
      this.posY = this.generateDecimalBetween(0, this.maxHeight); // starting y-pos range
    }
  }
  
  class background {
    constructor() {
      this.canvas = document.getElementById("floatingbubbles");
      this.ctx = this.canvas.getContext("2d");
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;
      this.bubblesList = [];
      this.generateBubbles();
      this.animate();
    }
  
    animate() {
      let self = this;
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
      self.bubblesList.forEach(function(bubble) {
        bubble.update();
        self.ctx.beginPath();
        self.ctx.arc(bubble.posX, bubble.posY, bubble.size, 0, 2 * Math.PI);
        self.ctx.fillStyle = "hsl(" + bubble.colour + ", 100%, 50%)";
        self.ctx.fill();
        self.ctx.strokeStyle = "hsl(" + bubble.colour + ", 100%, 50%)";
        self.ctx.stroke();
      });
  
      requestAnimationFrame(this.animate.bind(this));
    }
  
    addBubble(bubble) {
      return this.bubblesList.push(bubble);
    }
  
    generateBubbles() {
      let self = this;
      for (let i = 0; i < self.bubbleDensity(); i++) {
        self.addBubble(new bubble(self.canvas.width, self.canvas.height));
      }
    }
  
    bubbleDensity() {
      return 10; // number of bubbles
    }
  }
  
  window.onload = function() {
    new background();
  };
  
  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  