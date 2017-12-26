/* reducers */

const { START_PLAYING, STOP_PLAYING, GET_PLAYER_PROGRESS } = require('../actions/player');
const { REMOVE_SONG } = require('../actions/ui');

function player(state = {}, action) {
  switch (action.type) {
    case START_PLAYING:
      return Object.assign({}, state, {
        playing: true,
        latestTime: + new Date(),
        latestProgressSeconds: action.elapsedSeconds
      });
    case STOP_PLAYING:
      return Object.assign({}, state, {
        playing: false
      });
    case GET_PLAYER_PROGRESS:
      return Object.assign({}, state, {
        latestTime: action.latestTime,
        latestProgressSeconds: action.latestProgressSeconds
      });
    case REMOVE_SONG:
      console.log('running player reducer: action.isCurrent = ', action.isCurrent)
      return Object.assign({}, state, {
        playing: action.isCurrent ? false : state.playing
      });      
    default:
      return state;
  }
};

module.exports = player;