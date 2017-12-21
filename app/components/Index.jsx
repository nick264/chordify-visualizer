const React = require('react');
const Link = require('react-router-dom').Link
// const UnorderedList = require('./UnorderedList');
// const About = require('./About');
// const VoteContainer = require('../containers/VoteContainer');

const Form = require ('./Form')

/* the main page for the index route of this app */
const Index = function() {
  return (
    <div>
      <h1>Hello World! Pick a song</h1>

      <Link to='/about'>Read about and Rate this app!</Link>

      <p>This is a starter <a href="http://glitch.com">Glitch</a> app for React! 
        It uses only a few dependencies to get you started on working with 
        state handling via Redux:</p>
      
      <Form/>
    </div>
  );
};

module.exports = Index;