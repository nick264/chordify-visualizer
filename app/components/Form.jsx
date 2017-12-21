const React = require('react');
const { connect } = require('react-redux');
const { setField } = require('./actions/ui')

const Form = (ui, onFieldChange) => {
  return(
    <div>
      <input type='text' value={ui.youtubeVideo} onChange={(e) => onFieldChange('youtubeVideo',e.target.value)}/>
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onFieldChange: (field,value) => dispatch(setField(field,value))
  }
}

const VoteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteButtons);

module.exports = VoteContainer;