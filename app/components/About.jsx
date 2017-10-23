const React = require('react');
const Link = require('react-router-dom').Link;
const VoteButtons = require('./VoteButtons');

class About extends React.Component {

  render() {
    return (
      <div>
        <h1>About</h1>
        
        <p>This is a starter react app using react-router-dom to add client-side routes!</p>
        
        <h2>Rate this app!</h2>
        <VoteButtons />
        
        <Link to='/'>Go home</Link>
      </div>
    );
  }
}

module.exports = About;