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
    
    // draw a colored rectangle
    const rectWidth = this.canvasWidth / this.beatsPerMeasure
    const rectStartX = rectWidth * ( beatNumber - 1 )
    this.ctx.fillStyle= "red"// `hsla(${hue},${saturation},100%,100%)`
    this.ctx.fillRect(rectStartX,0,rectStartX + rectWidth,this.canvasHeight)
    
    console.log('rectStartX=',rectStartX,'rectWidth=',rectWidth,'color=',`hsla(${hue},${saturation},100%,100%)`)
    
    // print the chord name
    this.ctx.font = "15px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(chord, rectStartX + 0.5 * rectWidth, this.canvasHeight / 2); 
  }
  
  // maps a chord name to hue and saturation
  // chords are of the following format: {tonic}:{majMin}, e.g. Ab:maj, C:min
  chordColorMapping(chord) {
    // if no chord, return a darkish color
    if(chord == "N") {
      return {
        hue: 0,
        sat: 360 * 0.1
      }
    }
    
    // assign hue based on chromatic position of chord tonic
    // assign saturation based on whether the chord is major or minor
    const CHROMATIC_SCALE = {"A":0,"A#":1,"Bb":1,"B":2,"C":3,"C#":4,"Db":4,"D":5,"D#":6,"Eb":6,"E":7,"F":8,"F#":9,"Gb":9,"G":10,"G#":11,"Ab":11}
    const tonicPart = chord.split(":")[0]
    const majMinPart = chord.split(":")[1]
    
    return {
      hue: CHROMATIC_SCALE[tonicPart] / 12 * 360,
      saturation: majMinPart == "maj" ? 360 * 0.85 : 360 * 0.45
    }
  }
}

module.exports = SimpleVisualizer