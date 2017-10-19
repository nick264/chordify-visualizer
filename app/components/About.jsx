const React = require('react');
const Link = require('react-router-dom').Link

class About extends React.Component {

  render() {
    return (
      <div>
        <h1>About</h1>
        
        <p>This is a starter react app using react-router-dom to add client-side routes!</p>
        
        <Link to='/'>Go home</Link>
      </div>
    );
  }
}

module.exports = About;