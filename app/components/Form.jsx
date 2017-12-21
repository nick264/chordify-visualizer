const React = require('react');

const Form = (ui) => {
  return(
    <div>
      <input type='text' value={ui.youtubeVideo} onChange={(e) => dispatch() }/>
    </div>
  )
}