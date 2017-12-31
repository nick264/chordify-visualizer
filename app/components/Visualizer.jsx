const React = require('react');
const { Component } = require('react');
const { connect } = require('react-redux');
const { Dropdown } = require('semantic-ui-react');

// const Visualizers = requireDir('../visualizers')
const reqVisualizers = require.context('../visualizers')
const visualizerNames = reqVisualizers.keys()

console.log('visualizerNames = ',visualizerNames)

const VisualizerGraphics = reqVisualizers(visualizerNames[0])

// const VisualizerGraphics = require('../visualizers/simple')
// const VisualizerGraphics = require('../visualizers/fireworks')
// const VisualizerGraphics = require('../visualizers/tunnel')

const _ = require('lodash');

class Visualizer extends Component {
  constructor(props) {
    super(props);
    
    this.canvas = null;
    this.state = {};
  }
  
  componentDidMount() {
    // set up the 2d array of chords
    this._getChordArray()
    
    // set up the visualizer
    this.visualizer = new VisualizerGraphics(this.refs._canvas,this.props.chords,this.chordArray)
  }
  
  // parse the string representing the chord timing of the song
  _getChordArray() {
    this.chordArray = _.map(
      _.split(this.props.chords.chords,"\n"),
      (measure) => _.split(measure,";") // [ beat, chord, startTime, endTime ]
    )
  }
  
  // schedule the action for the next beat
  _doBeats() {
    // give up if player isn't playing
    if(!this.props.player.playing) {
      return null
    }
    
    const nextChord = this.chordArray[this.idx+1]
    const currentTime = + new Date();

    const inferredStartTime = this.props.player.latestTime - this.props.player.latestProgressSeconds * 1000
    const nextChordTime = inferredStartTime + parseFloat(nextChord[2]) * 1000 
    const sleepTime = nextChordTime - currentTime
    
    // console.log('inferredStartTime = ', inferredStartTime);
    // console.log('nextChord = ', nextChord);
    // console.log('nextChordTime = ', nextChordTime);    
    // console.log('sleeptime=',sleepTime);
    
    if( sleepTime < 0 ) {
      console.log('skipping beat idx', this.idx,'...');
      this.idx += 1;
      this._doBeats();
    }
    else {
      setTimeout(() => {
          this._onBeat(nextChord[0],nextChord[1]);
          this.setState({currentBeat: nextChord[0], currentChord: nextChord[1], currentBeatSeconds: nextChord[2]});
          this.idx += 1;
          this._doBeats();
        },
        sleepTime
      )
    }
  }
  
  _onBeat(beatNumber,chord) {
    // canvas code to execute on every beat
    this.visualizer.onBeat(beatNumber,chord)
  }
  
//   _onBeat(beat,chord) {
//     console.log('showing beat:',beat,chord);
//     this.ctx.fillStyle = '#FFFFFF';
//     this.ctx.fillRect(0,0,500,300);
    
//     this.ctx.fillStyle = this._randomColorForString(chord);
//     console.log('color=',this._randomColorForString(chord));
//     this.ctx.fillRect((beat-1) * 60,0,50,50);
//   }
  
//   _randomColorForString(string) {
//     this.colorMap = this.colorMap || {};
    
//     if(!this.colorMap[string]) {
//       this.colorMap[string] = '#' + 
//         Math.round(Math.random()*255).toString(16).padStart(2,'0') + 
//         Math.round(Math.random()*255).toString(16).padStart(2,'0') + 
//         Math.round(Math.random()*255).toString(16).padStart(2,'0')
//     }
    
//     return this.colorMap[string]
//   }
  
  componentDidUpdate(prevProps) {
    if(this.props.chords != prevProps.chords) {
      this._getChordArray()
    }
    
    // start the beat scheduler if we've started playing
    if(!prevProps.player.playing && this.props.player.playing) {
      console.log('player started playing');
      this.idx = 0;
      this._doBeats();
    }
  }
  
  render() {
    const {chords, playerStart } = this.props;
    
    return(
      <div>
        <h3>Visualizer</h3>
        <p>
          {
            this.props.player.playing ?
              <span>
                <span>Beat {this.state.currentBeat}/{this.props.chords.meter.split("/")[1]}</span>
                &nbsp;|&nbsp;
                <span>{this.state.currentChord}</span>
                &nbsp;|&nbsp;
                <span>{this.state.currentBeatSeconds}</span>
              </span>
            :
              <span>Not playing</span>
          }
        </p>
        <canvas ref='_canvas' style={{width: '100%'}} width={300} height={300}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player
  }
}

module.exports = connect(mapStateToProps)(Visualizer);