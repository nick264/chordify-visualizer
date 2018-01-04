const React = require('react');
const { Component } = require('react');
const { connect } = require('react-redux');
const { Dropdown, Segment, Menu } = require('semantic-ui-react');

const reqVisualizers = require.context('../visualizers',false,/^.*\.js$/)
const visualizerNames = reqVisualizers.keys()
const defaultVisualizerName = visualizerNames.find((v) => v == './fireworks.js') || visualizerNames[0]

const _ = require('lodash');

class Visualizer extends Component {
  constructor(props) {
    super(props);
    
    this.canvas = null;
    this.state = { visualizerName: defaultVisualizerName};
  }
  
  componentDidMount() {
    // set up the 2d array of chords
    this._getChordArray()
    
    // set up the visualizer
    this._initVisualizer()
  }
  
  // create an instance of the visualizer (whose class is this.state.visualizerName)
  _initVisualizer() {
    const VisualizerClass = reqVisualizers(this.state.visualizerName)
    this.visualizer = new VisualizerClass(this.refs._canvas,this.props.chords,this.chordArray)
    
    // setTimeout(() => this.visualizer.stop(),4000)
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

    // figure out when the song started playing, how much time has passed, and when the next chord is supposed to be
    const currentTime = + new Date();
    const inferredStartTime = this.props.player.latestTime - this.props.player.latestProgressSeconds * 1000
    const nextChordTime = inferredStartTime + parseFloat(nextChord[2]) * 1000 
    const sleepTime = nextChordTime - currentTime
    
    if( sleepTime < 0 ) {
      console.log('skipping beat idx', this.idx,'...');
      this.idx += 1;
      this._doBeats();
    }
    else {
      // schedule the next beat
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
  
  componentDidUpdate(prevProps,prevState) {
    // re-parse the chords, if the chord data has changed
    if(this.props.chords != prevProps.chords) {
      this._getChordArray()
    }
    
    // initialize the new visualizer if necessary
    if(prevState.visualizerName != this.state.visualizerName) {
      console.log('visualizer changed to', this.state.visualizerName)
      this.visualizer.stop()
      this._initVisualizer()
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
        <Menu>
          <Menu.Item header>
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
          </Menu.Item>
          <Menu.Menu position='right'>
            <Dropdown placeholder='Select a visualizer'
              className='link item'
              value={this.state.visualizerName}
              options={visualizerNames.map((v) => ({text: v.match(/\/(.*).js/)[1], value: v}))}
              onChange={(e,data) => { console.log(data); this.setState({visualizerName: data.value}) }}
            />
          </Menu.Menu>
        </Menu>
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