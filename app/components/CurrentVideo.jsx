const React = require('react');
const { Component } = require('react');
const ReactPlayer = require('react-player').default;
const { connect } = require('react-redux');
const playerActions = require('../actions/player');

class CurrentVideo extends Component {
  render() {
    const {ui, dispatch} = this.props
    return(
      <div>
        {
          ui.currentYoutubeId &&
            <div>
              <h3>Now Playing...</h3>            
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${ui.currentYoutubeId}`}
                onPlay={(e) => dispatch(playerActions.startPlaying(this.refs._player.getCurrentTime())) }
                onPause={() => dispatch(playerActions.stopPlaying()) }
                onEnded={() => dispatch(playerActions.stopPlaying()) }
                onSeek={(e) => console.log('seek:', e)}
                width={'100%'}
                height={null}
                controls={true}
                ref='_player'
                playing
              />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    ui: state.ui
  }
}

module.exports = connect(
  mapStateToProps
)(CurrentVideo);