/* reducers */

const { SET_FIELD } = require('./actions/ui');

function ui(state = [], action) {
  switch (action.type) {
    case SET_FIELD: 
      return Object.assign({}, state, {
        [action.field]: action.value
      });
    default:
      return state;
  }
}

module.exports = ui