const React = require('react');
const Link = require('react-router-dom').Link
const UnorderedList = require('./UnorderedList');
const About = require('./About');

const dependenciesArray = [
  'express - middleware for the node server',
  'react - for generating the views of the app',
  'react-dom - powers the rendering of elements to the DOM, typically paired with React',
  'webpack - for bundling all the javascript',
  'jsx-loader - allows webpack to load jsx files',
  'react-router-dom - handles routing!',
  'react-redux - handles state!'
];

const componentsMade = [
  'HelloWorld - which is the view you are seeing now',
  'UnorderedList - which takes an array of "items" and returns a <ul> element with <li>, elements of each of those items within it',
  'About - text content to show when "about" route is accessed',
];

class HelloWorld extends React.Component {

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        
        <Link to='/about'>Learn about this app!</Link>
      
        <p>This is a starter <a href="http://glitch.com">Glitch</a> app for React! 
          It uses only a few dependencies to get you started on working with 
          state handling via Redux:</p>
      
        <UnorderedList items={dependenciesArray} />
      
        <p>Look in <code>app/components/</code> for {componentsMade.length} example components:</p>
        
        <UnorderedList items={componentsMade} />
        
        <p>Note: You may not normally create a component for an unordered list, 
          but I did here just so I can show the power of code reuse by way of building components :)</p>
      </div>
    );
  }
}

module.exports = HelloWorld;