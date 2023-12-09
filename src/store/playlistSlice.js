import { createSlice } from '@reduxjs/toolkit';

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlistName: '',
    playlist: []
  },
  reducers: {
    addTrack: (state, action) => {
      state.playlist.push({
        id: action.payload.id,
        artistName: action.payload.artistName,
        trackName: action.payload.trackName,
        album: action.payload.album
      })
    },
    removeTrackFromPlaylist: (state, action) => {
        state.playlist = state.playlist.filter(track => track.id!== action.payload.id);
    },
    changePlaylistName: (state, action) => {
      state.playlistName = action.payload;
    }
  }
})

export const { addTrack, removeTrackFromPlaylist, changePlaylistName } = playlistSlice.actions;

export default playlistSlice.reducer;

