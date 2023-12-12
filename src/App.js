import React, {useEffect, useState} from 'react';
import './App.css';
import SearchBar from './components/searchBar/searchBar';
import PlayList from './components/playList/playList';
import TrackList from './components/trackList/trackList';
import spotifyKeys from './spotify-api/secret-keys.js';
import { useDispatch, useSelector } from'react-redux';
import { Buffer } from 'buffer';

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    let tokenStorage = window.localStorage.getItem("token");
    if (!tokenStorage && hash) {
      tokenStorage = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", tokenStorage);
      setToken(tokenStorage);
    }
    const REDIRECT_URI = 'http://localhost:3000/';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const clientID = spotifyKeys.clientID;
    const client_secret = spotifyKeys.clientSecret;  
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code"); 
  
    const getAccessToken = async (clientID, code) => {
      const verifier = localStorage.getItem("verifier");
      const params = new URLSearchParams();
      params.append("client_id", clientID);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", REDIRECT_URI);
      params.append("code_verifier", verifier);
      const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization': 'Basic ' + (new Buffer.from(clientID + ':' + client_secret).toString('base64'))
        },
        body: params  
      });
      const { access_token } = await result.json();
      if (typeof access_token !== typeof undefined) {
        return access_token;
      }
    }
  
    const generateCodeVerifier = (length) => {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
  
    const generateCodeChallenge = async (codeVerifier) => {
      const data = new TextEncoder("utf-8").encode(codeVerifier);
      const digest = await window.crypto.subtle.digest("SHA-256", data);
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
    }
  
    const redirectToAuthCodeFlow = async (clientID) => {
      const verifier = generateCodeVerifier(128); 
      const challenge = await generateCodeChallenge(verifier);
      localStorage.setItem("verifier", verifier);
      const params = new URLSearchParams();
      params.append("client_id", clientID);
      params.append("response_type", "code");
      params.append("redirect_uri", REDIRECT_URI);
      params.append("scope", "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify");
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", challenge);
      window.location.href = `${AUTH_ENDPOINT}?${params.toString()}`;
      

    }
  
    const getToken = async (clientID, code) => {
      const accessToken = await getAccessToken(clientID, code);
      if (accessToken !== undefined){
        localStorage.setItem("token", accessToken); 
      }
    }
  
    const token = localStorage.getItem("token");

    if ( !code ){
      redirectToAuthCodeFlow(clientID);
    }

    if ( !token ){
        getToken(clientID, code);
    }
  
  }, []);

  const logOut = () => {
    window.localStorage.removeItem("verifier");
    window.localStorage.removeItem("token");
    window.hash = "";
    window.location = 'http://localhost:3000/';
  };

  const verifier = localStorage.getItem("verifier");
  const tokenStorage = localStorage.getItem("token");

  return (
    <div className="App">
        <div className='SpotifyLoginLogout'>
          {verifier ? <button onClick={logOut} >Log Out</button> : ""}

        </div>
        {!verifier && !token ? <h1>Redirecting to Login</h1> : 
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