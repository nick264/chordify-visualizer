const React = require('react');

// redux 
const { dispatch } = require('redux');
const actions = require('../actions');

const VoteButtons = function({ onUpvote, onDownvote, voteScore, voteCount }) {
  return (
    <div>
      <button alt="upvote" onClick={onUpvote}>&uarr;</button> &nbsp;
      <button alt="downvote" onClick={onDownvote}>&darr;</button>
      
      <p>Vote score: {voteScore || 0} out of {voteCount || 0 } votes!</p>

    </div>
  );
}

module.exports = VoteButtons;