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
    const rectWidth = this.canvasWidth / this.beatsPerMeasure
    const rectStartX = rectWidth * ( beatNumber - 1 )
    this.ctx.fillStyle=
    this.ctx.fillRect(rectStartX,0,rectStartX + rectWidth,this.canvasHeight)
  }
  
  chordColorMapping() {
    {
      A:maj
:
254
A:min
:
18
Ab:maj
:
137
B:maj
:
269
B:min
:
54
Bb:maj
:
209
Bb:min
:
6
C#:min
:
2
C:maj
:
43
C:min
:
71
D:maj
:
45
E:maj
:
375
E:min
:
169
Eb:maj
:
175
F#:maj
:
161
F#:min
:
107
F:maj
:
8
F:min
:
37
G:maj
:
131
G:min
:
4
N
:
126
    }
  }
}

module.exports = SimpleVisualizer