import { createSlice } from '@reduxjs/toolkit';

const tracklistSlice = createSlice({
  name: 'tracklist',
  initialState: {
    tracklist: []
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