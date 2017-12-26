const React = require('react');
const { Component } = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const { Container, Grid } = require('semantic-ui-react');

// const UnorderedList = require('./UnorderedList');
// const About = require('./About');
// const VoteContainer = require('../containers/VoteContainer');

const SubmitSong = require ('./SubmitSong')
const History = require ('./History')
const CurrentVideo = require ('./CurrentVideo')
const Visualizer = require ('./Visualizer')

/* the main page for the index route of this app */
class Index extends Component {
  render() {
    const {ui, chordify} = this.props
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h1>Chordify Visualizer</h1>
              <Link to='/about'>Read about this app!</Link>
              <p>Pick a song to get started:</p>
              <SubmitSong/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} divided>
            <Grid.Column width={5}>
              <CurrentVideo/>
              <History/>
            </Grid.Column>
            <Grid.Column>
              {
                ui.currentYoutubeId &&
                  <Visualizer
                    chords={chordify.data[ui.currentYoutubeId]}
                  />
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    chordify: state.chordify
  }
}

module.exports = connect(mapStateToProps)(Index);