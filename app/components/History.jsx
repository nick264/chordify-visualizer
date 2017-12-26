const React = require('react');
const { connect } = require('react-redux');
const { Image, Item, Label, Icon } = require('semantic-ui-react');
const uiActions = require('../actions/ui');
const _ = require('lodash');

const History = ({ui, chordify, onSelectSong, onRemoveSong}) => {
  console.log('rendering history', chordify.data);
  console.log('number of songs: ', _.size(chordify.data));
  return(
    <Item.Group divided>
    {
      _.map( chordify.data || {}, (songData,id) => {
        return(
          <Item
            as='a'
            onClick={() => onSelectSong(songData.external_id)}
            style={{position: 'relative', borderLeft: '3px solid white', paddingLeft: '5px', borderLeftColor: ui.currentYoutubeId == songData.external_id ? 'rgb(33, 133, 208)' : 'white' }}
          >
            <Item.Image size='tiny' src={songData.artwork_url}/>
            <Item.Content>
              <Icon
                link
                name='close'
                onClick={(e) => { e.stopPropagation(); onRemoveSong(songData.external_id)}}
                style={{position: 'absolute',right: '-14px',top: '9px'}}
              />
              <Item.Header>{ songData.title }</Item.Header>
              <Item.Meta>{ songData.publisher }</Item.Meta>
              <Item.Description>
                <Label>{songData.derived_bpm} bpm</Label>
                <Label>{songData.derived_key}</Label>
                <Label>{songData.meter} meter</Label>
              </Item.Description>
            </Item.Content>
          </Item>
        )
      } )
    }
    </Item.Group>
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
    onSelectSong: (youtubeId) => dispatch(uiActions.setCurrentSong(youtubeId)),
    onRemoveSong: (youtubeId) => dispatch(uiActions.removeSong(youtubeId))
  }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(History);