/* actions */

module.exports = {
 
  SET_FIELD: 'SET_FIELD',
  SET_CURRENT_SONG: 'SET_CURRENT_SONG',
  REMOVE_SONG: 'REMOVE_SONG',
  
  setField: function(field,value) {
    console.log('running set field action', this.SET_FIELD,field,value);
    console.log('this=',this);
    return {
      type: this.SET_FIELD,
      field: field,
      value: value
    }
  },
  
  setCurrentSong: function(youtubeId) {
    return {
      type: this.SET_CURRENT_SONG,
      youtubeId: youtubeId
    }
  },
  
  removeSong: function(id) {
    return (dispatch,getState) => {
      const { ui } = getState()
      
      return dispatch({
        type: this.REMOVE_SONG,
        id: id,
        isCurrent: id == ui.currentYoutubeId
      })
    }
  }
}