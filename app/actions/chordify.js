const request = require('superagent');
const urlParser = require('url');
const uiActions = require('./ui');

/* actions */

module.exports = {
 
  REQUEST_CHORDS: 'REQUEST_CHORDS',
  RECEIVED_CHORDS: 'RECEIVED_CHORDS',

  // signal that chords are being requested
  requestChords: function() {
    return {
      type: this.REQUEST_CHORDS
    }
  },

  // receive chords
  receivedChords: function(data) {
    return {
      data: data,
      type: this.RECEIVED_CHORDS
    }
  },
  
  // make a request to chordify and trigger the appropriate actions
  fetchChords: function() {
    return (dispatch,getState) => {
      const { ui, chordify } = getState();
      const url = '/chordify'
      
      // attempt to parse the youtube Id as a youtube url. if failure assume the passed-in value is a youtube id
      const parsedYoutubeUrl = urlParser.parse(ui.youtubeId,true);
      const formattedId = parsedYoutubeUrl.host ? parsedYoutubeUrl.query.v : ui.youtubeId;
      
      if(chordify.data[formattedId]) {
        // we already have the song, so just play it
        return(dispatch(uiActions.setCurrentSong(formattedId)))
      }
      else {
        // indicate that the song is being requested
        dispatch(this.requestChords());
        
        // make the request to chordify and 
        return(
          request.get(url).
            query({youtube_id: formattedId}).
            then((data) => {
              console.log('received data: ', data)
              const parsedData = JSON.parse(data.text)
              console.log('parsed: ', parsedData)
              dispatch(this.receivedChords(parsedData))
            })
        )
      }
    }
  },  
}
