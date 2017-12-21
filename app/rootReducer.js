import { combineReducers } from 'redux'
import uiReducer from './reducers/ui'
import chordifyReducer from './reducers/chordify'

const rootReducer = combineReducers({
  ui: uiReducer,
  chordify: chordifyReducer
})

export default rootReducer;