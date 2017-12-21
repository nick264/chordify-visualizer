import request from 'superagent'

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
      chords: data,
      type: this.RECEIVED_CHORDS
    }
  },
  
  // make a request to chordify and trigger the appropriate actions
  fetchChords: function(youtube_id) {
    const url = `https://chordify.net/song/data/youtube:${youtube_id}?vocabulary=extended_inversions`

    return (dispatch) => {
      dispatch(this.requestChords)

      return(
        request.get(url).then((data) => {
          console.log('received data: ', data)
          dispatch(this.receivedChords(data))
        })
      )
    }
  },
}
