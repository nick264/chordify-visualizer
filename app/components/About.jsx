const React = require('react');
const Link = require('react-router-dom').Link;
const Vote = require('../containers/Vote');

const About = function() {
  return (
    <div>
      <h1>About</h1>

      <p>This is a starter react app use react-redux to manage state - try rating this app below to see it in action!</p>

      <h2>Rate this app!</h2>
      <Vote />

      <Link to='/'>Go home</Link>
    </div>
  );
}

module.exports = About;