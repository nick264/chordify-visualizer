module.exports = {
  
  START_PLAYING: 'START_PLAYING',
  STOP_PLAYING: 'STOP_PLAYING',
  GET_PLAYER_PROGRESS: 'GET_PLAYER_PROGRESS',

  
  startPlaying: function(elapsedSeconds) {
    return {
      type: this.START_PLAYING,
      elapsedSeconds: elapsedSeconds
    }
  },
  
  stopPlaying: function() {
    return {
      type: this.STOP_PLAYING
    }
  },
  
  getPlayerProgress: function(progress) {
    return {
      type: this.GET_PLAYER_PROGRESS,
      latestTime: + new Date(),
      latestProgressSeconds: progress.playedSeconds
    }
  },
}