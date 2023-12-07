import React, {useEffect, useState} from 'react';
import './App.css';
import SearchBar from './components/searchBar/searchBar';
import PlayList from './components/playList/playList';
import TrackList from './components/trackList/trackList';
import spotifyKeys from './spotify-api/secret-keys.js';
import { useDispatch, useSelector } from'react-redux';



function App() {
  //UseState for tracks in tracks list 
  const { playlist } =  useSelector(state => state.playlist);


 
  /*
  //UseState for playlist name 
  const [playlistName, setPlaylistName] = useState('Robs List');
  //UseState for tracks in playlist
  const [tracks, setTracks] = useState([
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
    {
      id: 4,
      artistName: 'Elton John',
      trackName: 'Candle in the Wind',  
      album: 'Candle in the Wind'
    }
  ]);

  //UseState for playlist name 
  const [playlistName, setPlaylistName] = useState('Robs List');
  //UseState for tracks in playlist
  const [playlist, setPlaylist] = useState([
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
  ]);

  const playListNameChange = (e) => {
    // When the playlist name is change, update the playlist name useState  
    setPlaylistName(e.target.value);
  };
  const removeFromTrackList = (id) => {
      //Remove track form track list
      setTracks(oldTracks => { return oldTracks.filter(tracks => tracks.id !== id)});
  };

  const removeFromPlayList = (id) => {
    //Remove track from playlist 

    setPlaylist(oldPlayList => { 
      return oldPlayList.filter(tracks => tracks.id !== id);
    });
  };

  const addTrackToPlayList = (id) => { 
    //Get track object from track list
    const track = tracks.find(track => {return track.id === id});
    //Remove from track list 
    removeFromTrackList(id);
    //Add to play list 
    setPlaylist(oldPlayList => [...oldPlayList, track]);
  };
  */

  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    console.log(hash);
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }

    if (token) {
      setToken(token);
    }
  }, []);

  const logOut = () => {
    window.localStorage.removeItem("token");
    setToken("");
  };

  const CLIENT_ID = spotifyKeys.clientID;
  const REDIRECT_URI = 'http://localhost:3000/';
  const RESPONSE_TYPE = 'token';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';

  return (
    <div className="App">
        <div className='SpotifyLoginLogout'>
          {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a> : <button onClick={logOut} >Log Out</button>}
        </div>
        {!token ? <h1>Please Login</h1> : 
          <>
            <SearchBar />
            <TrackList/>
            <PlayList/>
          </>
        }
    </div>
  );

}

/*
<SearchBar />
            <TrackList tracklist={tracks} trackListRemove={removeFromTrackList} addTrackToPlayList={addTrackToPlayList}/>
            <PlayList playlist={playlist} playListName={playlistName} onPlayListNameChange={playListNameChange} playListRemove={removeFromPlayList}/>
*/

export default App;
