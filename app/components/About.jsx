const React = require('react');
const Link = require('react-router-dom').Link;
const ReactPlayer = require('react-player').default;
const { Container } = require('semantic-ui-react');

/* the main page for the about route of this app */
const About = function() {
  return (
    <Container>
      <h1>About</h1>

      <p>This project is an attempt to make some visuals that meaningfully react to music, by taking chords and beats into account. Most automatically generated audio visualizations just use the volume or the raw waveform, which doesn't really convey much of the feeling of the music.</p>

      <p>All the hard work this project relies on (i.e. extracting chord & beat information) is done by <a href='https://chordify.net/' target='_blank'>Chordify</a>. Chordify is an amazing tool that turns any piece of music into guitar tab automatically, so that you can learn to play your favorite songs.</p>

      <p>
        Some friends and I made a project for Burning Man 2016 that also uses Chordify: a big jukebox with hundreds of songs and LED strips whose colors sync with the music. You can see that in action here if you're interested:
        <ReactPlayer
          url='https://www.youtube.com/watch?v=sXVZhv_Xi0I'
        />
      </p>
      
      <p>Also, thanks to Haiqing Wang for the awesome Fireworks animation (https://codepen.io/whqet/details/Auzch), which is used in a modified form here.</p>
      <Link to='/'>Go home</Link>
    </Container>
  );
}

module.exports = About;