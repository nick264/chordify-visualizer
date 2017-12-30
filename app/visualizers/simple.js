class SimpleVisualizer {
  // the constructor gets called when the Visualizer.jsx component initializes the visualizer (when the song is loaded)
  constructor(canvas,songMetaData,chordArray) {
    // set up some instance variables so that our class's other methods can access them
    this.canvas = canvas
    this.ctx = canvas.getContext( '2d' )
    this.canvasWidth = canvas.width
    this.canvasHeight = canvas.height
    this.beatsPerMeasure = parseInt(songMetaData.meter.split("/")[1]) // pull out the number of beats in each measure from the metadata
    
    // initialize canvas
    this.clearCanvas()
  }
  
  // make canvas all black
  clearCanvas() {
    this.ctx.fillStyle="black";
    this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

  }
  
  // this gets called on each beat. the Visualizer.jsx component passes the beat number and the chord to this method
  onBeat(beatNumber, chord) {
    // erase the canvas
    this.clearCanvas()
    
    // draw a rectangle
    const x
    this.ctx.fillRect(0,0,
  }
}

module.exports = SimpleVisualizer