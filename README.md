Chordify Visualizer
=================================

[See it live on Glitch](https://chordify-visualizer.glitch.me/)

[Edit on Glitch](https://glitch.com/edit/#!/chordify-visualizer)

This project is an attempt to make some visuals that meaningfully react to music, by taking chords and beats into account. Most automatically generated audio visualizations just use the volume or the raw waveform, which doesn't really convey much of the feeling of the music.

All the hard work this project relies on (i.e. extracting chord & beat information) is done by [Chordify](https://chordify.net/). Chordify is an amazing tool that turns any piece of music into guitar tab automatically, so that you can learn to play your favorite songs.

To create your own visuals, check out `app/components/Visualizer.jsx`. The two methods `_initCanvas` and `_onBeat` are responsible for the visuals - replace their contents to create the visuals you want! `_initCanvas` is called once when the song is loaded. `_onBeat` is called on the moment of each beat of each measure, and it is passed the beat number as well as the chord corresponding to that beat.
