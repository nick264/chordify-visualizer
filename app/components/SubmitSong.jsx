const React = require('react');
const { connect } = require('react-redux');
const uiActions = require('../actions/ui');
const chordifyActions = require('../actions/chordify');
const { Input, Button, Form } = require('semantic-ui-react');

const SubmitSong = ({ui, chordify, onFieldChange, onRequestChords}) => {
  console.log(onFieldChange);
  return(
    <Form>
      <Form.Group widths='equal'>
        <Form.Input placeholder='Youtube url or ID' name='youtubeId' value={ui.youtubeId} onChange={(e) => onFieldChange('youtubeId',e.target.value)}/>
        <Form.Button primary onClick={onRequestChords}>
          { chordify.requestedChords ? 
              "Grabbing chords..."
            :
              "Go"
          }
        </Form.Button>
      </Form.Group>
    </Form>    
  )
}

const mapStateToProps = function(state) {
  return {
    ui: state.ui,
    chordify: state.chordify
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onFieldChange: (field,value) => dispatch(uiActions.setField(field,value)),
    onRequestChords: () => dispatch(chordifyActions.fetchChords())
  }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitSong);