const { combineReducers } = require('redux');
const uiReducer = require('./reducers/ui');
const chordifyReducer = require('./reducers/chordify');
const playerReducer = require('./reducers/player');

const rootReducer = combineReducers({
  ui: uiReducer,
  chordify: chordifyReducer,
  player: playerReducer
})

module.exports = rootReducer;