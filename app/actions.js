/* actions */

module.exports = {
 
  UPVOTE: 'UPVOTE',
  
  DOWNVOTE: 'DOWNVOTE',

  upvote: function() {
    console.log('actions, upvote')
    return {
      type: this.UPVOTE
    }
  },

  downvote: function() {
    console.log('actions, downvote')
    return {
      type: this.DOWNVOTE
    }
  }
  
}
