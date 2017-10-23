/* reducer(s) */

const combineReducers = require('redux').combineReducers;
const { UPVOTE, DOWNVOTE } = require('./actions');

function votes(state = [], action) {
  switch (action.type) {
    case UPVOTE: 
      return [
        state.concat({ voteScore: state.voteScore++ })
      ];
    case DOWNVOTE:
      return [
        state.concat({ voteScore: state.voteScore-- })
      ];
    default:
      return state;
  }
}

const VoteButtons = combineReducers({
  votes
})

module.exports = VoteButtons