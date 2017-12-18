/* actions */

module.exports = {
 
  UPVOTE: 'UPVOTE',
  
  DOWNVOTE: 'DOWNVOTE',

  upvote: function(youtube_id) {
    const url = `https://chordify.net/song/data/youtube:${youtube_id}?vocabulary=extended_inversions`
    
    return {
      type: this.UPVOTE
    }
  },

  downvote: function() {
    return {
      type: this.DOWNVOTE
    }
  }
  
}
