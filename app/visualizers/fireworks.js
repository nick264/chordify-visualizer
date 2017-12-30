// Fireworks!
// like every visualizer: the exported class here (Fireworks) contains two main pieces:
// (1) a constructor that takes the canvas as an argument and does initial setup
// (2) a method "onBeat" that is called on every beat

// adapted from haiqing wang's fireworks demo
// https://codepen.io/whqet/pen/Auzch

// an individual particle
class Particle {
  constructor(x,y,ctx,hue) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 5;
    while( this.coordinateCount-- ) {
      this.coordinates.push( [ this.x, this.y ] );
    }
    // set a random angle in all possible directions, in radians
    this.angle = this.random( 0, Math.PI * 2 );
    this.speed = this.random( 1, 10 );
    // friction will slow the particle down
    this.friction = 0.95;
    // gravity will be applied and pull the particle down
    this.gravity = 1;
    // set the hue to a random number +-50 of the overall hue variable
    this.hue = this.random( hue - 20, hue + 20 );
    this.brightness = this.random( 50, 80 );
    this.alpha = 1;
    // set how fast the particle fades out
    this.decay = this.random( 0.015, 0.03 );
  }
  
  // get a random number within a range
  random( min, max ) {
    return Math.random() * ( max - min ) + min;
  }
  
  // returns true if this particle is ready to be destroyed
  update() {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift( [ this.x, this.y ] );
    // slow down the particle
    this.speed *= this.friction;
    // apply velocity
    this.x += Math.cos( this.angle ) * this.speed;
    this.y += Math.sin( this.angle ) * this.speed + this.gravity;
    // fade out the particle
    this.alpha -= this.decay;

    // remove the particle once the alpha is low enough, based on the passed in index
    if( this.alpha <= this.decay ) {
      return true
    }
    else {
      return false
    }
  }
  
  draw() {
    this.ctx. beginPath();
    // move to the last tracked coordinates in the set, then draw a line to the current x and y
    this.ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
    this.ctx.lineWidth = 10;
    this.ctx.lineTo( this.x, this.y );
    this.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
    this.ctx.stroke();
  }
}

// controls the generation of particles and canvas setup
class Fireworks {
  constructor(canvas,chordArray) {
    // when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
    // not supported in all browsers though and sometimes needs a prefix, so we need a shim
    this.requestAnimFrame = ( function() {
      return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ) {
              window.setTimeout( callback, 1000 / 60 );
            };
    })();
    
    this.ctx = canvas.getContext( '2d' ),
    // particle collection
    this.particles = [],
    // starting hue
    this.hue = 120
    
    this.cw = canvas.width
    this.ch = canvas.height
    
    canvas.style.backgroundColor = 'black'
    
    this.loop()
  }
  
  // clear() {
  //   this.ctx.fillStyle="black";
  //   this.ctx.fillRect(0,0,this.cw,this.ch);
  // }
  
   // get a random number within a range
  random( min, max ) {
    return Math.random() * ( max - min ) + min;
  }

  colorForId(string) {
    this.colorMap = this.colorMap || {};

    if(!this.colorMap[string]) {
      this.colorMap[string] = this.random(0, 360 )
    }

    return this.colorMap[string]
  }
  
  createParticles( x, y, colorId ) {
    // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
    var particleCount = 30;
    while( particleCount-- ) {
      this.particles.push( new Particle( x, y, this.ctx, this.colorForId(colorId) ) );
    }
  }
  
  createParticlesRandom(colorId) {
    this.createParticles(
      this.random(0,this.cw),
      this.random(0,this.ch),
      colorId
    )
  }
  
  loop() {
    // this function will run endlessly with requestAnimationFrame
    this.requestAnimFrame.call( window, this.loop.bind(this) );

    // increase the hue to get different colored fireworks over time
    //hue += 0.5;

    // create random color
    this.hue = this.random(0, 360 );

    // normally, clearRect() would be used to clear the canvas
    // we want to create a trailing effect though
    // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
    this.ctx.globalCompositeOperation = 'destination-out';
    // decrease the alpha property to create more prominent trails
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect( 0, 0, this.cw, this.ch );
    // change the composite operation back to our main mode
    // lighter creates bright highlight points as the fireworks and particles overlap each other
    this.ctx.globalCompositeOperation = 'lighter';

    // loop over each particle, draw it, update it
    var i = this.particles.length;
    while( i-- ) {
      this.particles[ i ].draw();
      const destroy = this.particles[ i ].update();
      
      if(destroy) {
        this.particles.splice(i,1)
      }
    }
  }
  
  onBeat(beatNumber,chord) {
    if(beatNumber == 1) {
      var explosions = Math.round(Math.random()*3) + 3
    }
    else {
      var explosions = 1
    }
    
    for( var i = 0; i < explosions; i += 1) {      
      this.createParticlesRandom(chord)
    }
  }
}

module.exports = Fireworks