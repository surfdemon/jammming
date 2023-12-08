import { createSlice } from '@reduxjs/toolkit';

const tracklistSlice = createSlice({
  name: 'tracklist',
  initialState: {
    tracklist: [
        {
            id: 1,
            artistName: 'Dire Straits',
            trackName: 'Sultans of Swing', 
            album: 'The very best of Dire Straits'
          },
          {
            id: 2,
            artistName: 'Savage Garden',
            trackName: 'Truly Madly Deeply',  
            album: 'Truly Madly Deeply'
          },
          {
            id: 3,
            artistName: 'The Eagles',
            trackName: 'Hotel California',  
            album: 'Hotel California'
          },
    ]
  },
  reducers: {
    addTrack: (state, action) => {
      state.tracklist.push({
        id: action.payload.id,
        artistName: action.payload.artistName,
        trackName: action.payload.trackName,
        album: action.payload.album
      })
    },
    removeTrackFromTracklist: (state, action) => {
      state.tracklist = state.tracklist.filter(track => track.id!== action.payload.id);
    },
  }
})

export const { addTrack, removeTrackFromTracklist, addTrackToPlaylist } = tracklistSlice.actions;

export default tracklistSlice.reducer;

