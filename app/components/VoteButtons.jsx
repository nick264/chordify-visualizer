const React = require('react');

// redux state stuff
const { createStore, dispatch } = require('redux');
const voteButtonsApp = require('../reducers');
const actions = require('../actions');
let store = createStore(voteButtonsApp);

class VoteButtons extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      voteScore: 0
    };
  }
  
  upvote() {
    console.log('upvote', this.state)
    store.dispatch(actions.upvote())
  }
  
  downvote() {
    console.log('downvote')
    store.dispatch(actions.downvote())
  }
  
  render() {
    console.log(this.state)
    return (
      <div>
        <button alt="upvote" onClick={this.upvote}>&uarr;</button> &nbsp;
        <button alt="downvote" onClick={this.downvote}>&darr;</button>
        
        <p>Voting score: {this.state.voteScore}</p>
      </div>
    );
  }
}

module.exports = VoteButtons;