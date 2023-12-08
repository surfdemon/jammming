import React, {useEffect, useState} from 'react';
import './App.css';
import SearchBar from './components/searchBar/searchBar';
import PlayList from './components/playList/playList';
import TrackList from './components/trackList/trackList';
import spotifyKeys from './spotify-api/secret-keys.js';
import { useDispatch, useSelector } from'react-redux';


function App() {
  //UseState for tracks in tracks list 
  //const { playlist } =  useSelector(state => state.playlist);
 
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

export default App;
