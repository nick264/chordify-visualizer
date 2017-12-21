import request from 'superagent'

/* actions */

module.exports = {
 
  SET_FIELD: 'SET_FIELD',
  
  setField: function(field,value) {
    return {
      type: this.SET_FIELD,
      field: field,
      value: value
    }
  }
}
