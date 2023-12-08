import { createSlice } from '@reduxjs/toolkit';

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlistName: '',
    playlist: [
      {
        id: 5,
        artistName: 'Europe',
        trackName: 'The Final Countdown',
        album: 'Europe'
      },
      {
        id: 6,
        artistName: 'Survivor',
        trackName: 'Eye of the Tiger',
        album: 'Survivor'
      },
      {
        id: 7,
        artistName: 'Bon Jovi',
        trackName: 'These Days',
        album: 'These Days'
      },
      {
        id: 8,
        artistName: 'Gary Moore',
        trackName: 'Still Got the Blues',
        album: 'Still got the blues'
      },
    ]
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

