const React = require('react');
import { setField } from './actions/ui'

const Form = (ui) => {
  return(
    <div>
      <input type='text' value={ui.youtubeVideo} onChange={(e) => dispatch(setField('youtubeVideo',e.target.value))}/>
    </div>
  )
}