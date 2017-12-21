/* actions */

module.exports = {
 
  REQUEST_CHORDS: 'REQUEST_CHORDS',
  RECEIVED_CHORDS: 'RECEIVED_CHORDS',

  requestChords: function(youtube_id) {
    const url = `https://chordify.net/song/data/youtube:${youtube_id}?vocabulary=extended_inversions`
    
    $.get(url).
      
    
    return {
      type: this.REQUEST_CHORDS
    }
  },

  receivedChords: function(data) {
    return {
      chords: data,
      type: this.RECEIVED_CHORDS
    }
  }
  
}
