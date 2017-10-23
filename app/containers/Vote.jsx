// container for VoteButtons which maps state and dispatches to is props

const { connect } = require('react-redux');
const actions = require('../actions');
const VoteButtons = require('../components/VoteButtons');

const mapStateToProps = function(state) {
  return {
    voteScore: state.voteScore,
    voteCount: state.voteCount
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onUpvote: function() {
      dispatch(actions.upvote())
    },
    onDownvote: function() {
      dispatch(actions.downvote())
    }
  }
}

const Vote = connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteButtons);

module.exports = Vote;