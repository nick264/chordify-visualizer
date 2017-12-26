/* reducers */

const { SET_FIELD, SET_CURRENT_SONG, REMOVE_SONG } = require('../actions/ui');
const { RECEIVED_CHORDS } = require('../actions/chordify');

function ui(state = [], action) {
  switch (action.type) {
    case SET_FIELD: 
      return Object.assign({}, state, {
        [action.field]: action.value
      });
    case RECEIVED_CHORDS:
      return Object.assign({}, state, {
        currentYoutubeId: action.data.external_id,
        youtubeId: ''
      });
    case SET_CURRENT_SONG:
      return Object.assign({}, state, {
        currentYoutubeId: action.youtubeId,
        youtubeId: ''
      });      
    case REMOVE_SONG:
      return Object.assign({}, state, { currentYoutubeId: action.isCurrent ? null : state.currentYoutubeId })
    default:
      return state;
  }
};

module.exports = ui;