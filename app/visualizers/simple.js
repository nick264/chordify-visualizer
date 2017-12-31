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
    const color = this.chordColorMapping(chord)
    
    // draw a colored rectangle
    const rectWidth = this.canvasWidth / this.beatsPerMeasure
    const rectStartX = rectWidth * ( beatNumber - 1 )
    this.ctx.fillStyle = color
    this.ctx.fillRect(rectStartX,0,rectWidth,this.canvasHeight)
  }
  
  // maps a chord name to a color
  // chords are of the following format: {tonic}:{majMin}, e.g. Ab:maj, C:min
  chordColorMapping(chord) {
    // if no chord, return a darkish color
    if(chord == "N") {
      return "hsl(0,10%,20%)"
    }
    
    // assign hue based on chromatic position of chord tonic
    // assign saturation based on whether the chord is major or minor
    const CHROMATIC_SCALE = {"A":0,"A#":1,"Bb":1,"B":2,"C":3,"C#":4,"Db":4,"D":5,"D#":6,"Eb":6,"E":7,"F":8,"F#":9,"Gb":9,"G":10,"G#":11,"Ab":11}
    const tonicPart = chord.split(":")[0]
    const majMinPart = chord.split(":")[1]
    
    const hue = CHROMATIC_SCALE[tonicPart] / 12 * 360
    return `hsl(${hue},${majMinPart == "maj" ? '85%' : '45%'},50%)`
  }
}

module.exports = SimpleVisualizer