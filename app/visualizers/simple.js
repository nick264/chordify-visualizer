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
    
    // get a color for the chord
    const { hue, saturation } = this.chordColorMapping(chord)
    
    // draw a rectangle
    const rectWidth = this.canvasWidth / this.beatsPerMeasure
    const rectStartX = rectWidth * ( beatNumber - 1 )
    this.ctx.fillStyle= `hsl(${hue},${saturation},
    this.ctx.fillRect(rectStartX,0,rectStartX + rectWidth,this.canvasHeight)
  }
  
  // maps a chord name to hue and saturation
  chordColorMapping(chord) {
    if(chord == "N") {
      return {
        hue: 0,
        sat: 360 * 0.1
      }
    }
    
    const CHROMATIC_SCALE = {"A":0,"A#":1,"Bb":1,"B":2,"C":3,"C#":4,"Db":4,"D":5,"D#":6,"Eb":6,"E":7,"F":8,"F#":9,"Gb":9,"G":10,"G#":11,"Ab":11}
    const keyPart = chord.split(":")
    
    return {
      hue: chromaticScale,
      saturation: 
    }
  }
}

module.exports = SimpleVisualizer