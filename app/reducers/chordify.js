/* reducers */

const { REQUEST_CHORDS, RECEIVED_CHORDS } = require('../actions/chordify');
const { REMOVE_SONG } = require('../actions/ui');

function chordify(state = [], action) {
  switch (action.type) {
    case REQUEST_CHORDS: 
      return Object.assign({}, state, {
        requestedChords: true
      });
    case RECEIVED_CHORDS:
      return Object.assign({}, state, {
        requestedChords: false,
        data: Object.assign({}, state.data, { [action.data.external_id]: action.data })
      });
    case REMOVE_SONG:
      let newData = Object.assign({}, state.data);
      delete newData[action.id];

      return Object.assign({}, state, {data: newData});
    default:
      return state;
  }
};

module.exports = chordify;