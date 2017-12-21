/* reducers */

const { REQUEST_CHORDS, RECEIVED_CHORDS } = require('./actions/chordify');

function chordify(state = [], action) {
  switch (action.type) {
    case REQUEST_CHORDS: 
      return Object.assign({}, state, {
        requestedChords: true
      });
    case RECEIVED_CHORDS:
      return Object.assign({}, state, {
        requestedChords: false,
        chords: action.data
      });
    default:
      return state;
  }
}

module.exports = chordify