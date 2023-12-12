import React from 'react'
import './playList.style.css';
import TrackItem from '../trackItem/trackItem';
import { useSelector, useDispatch } from'react-redux';
import { changePlaylistName } from '../../store/playlistSlice';


function PlayList() {
    const { playlist, playlistName } =  useSelector(state => state.playlist);

    const dispatch = useDispatch();

    const getUserData = async (token) => { 
      const userOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const usersResponse = await fetch('https://api.spotify.com/v1/me', userOptions);
      const usersData = usersResponse.json();
      console.log(usersData);
      return usersData;
    }

    const createNewPlaylist = async (token, userID) => {
        const playlistOptions = {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: playlistName,
          public: false,
          collaborative: false,
          description: 'Playlist created by <NAME>',
        })
      };

      try{
        const playlistResponse = await fetch('https://api.spotify.com/v1/users/' + userID + '/playlists', playlistOptions);
        const playlistData = playlistResponse.json();
          dispatch(changePlaylistName(playlistData.name));
          return playlistData;
      } catch (error) {
        console.log(error);
      }
    }


    const getListOfTracksUris = () => {
      let listOfTracksUris = [];
      for (let i = 0; i < playlist.length; i++) {
        listOfTracksUris.push(playlist[i].id);
      }
      return listOfTracksUris;
    }

    const addTracksToPlaylistInSpotify = async (token, playlistID, trackURIs) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          position: 0,
          uris: trackURIs
        })
      };
      const addTracksToSpotifyPlaylistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, options);
      return addTracksToSpotifyPlaylistResponse;
    }

    const saveToSpotifyButtonClick = () => {
      const token = window.localStorage.getItem("token");
      //Get the users spotify userID from https://api.spotify.com/v1/me
      getUserData(token).then((data) => {
        const userID = data.id; 
        createNewPlaylist(token, userID).then((data) => {        
          const playlistID = data.id;
          const playlistTracksUris = getListOfTracksUris();

          addTracksToPlaylistInSpotify(token, playlistID, playlistTracksUris).then((data) => {
            console.log(data);
          });

        });

      });
      
      //Create a new playlist in Spotiyfy


      //Save the playlist tracks to the playlist in Spotify

    };
     
    return (
        <div className="PlayList">
              <input id='playListName' value={playlistName} placeholder='Enter playlist name' onChange={(e) => dispatch(changePlaylistName(e.target.value))} />      
              {playlist.map((track) => { 
                return <TrackItem 
                  track={track} 
                  key={track.id} 
                  listType = "playlist"
                />
            })}
            <br></br>
              <button onClick={saveToSpotifyButtonClick}>Save to Spotify</button>
        </div>
    )
}

export default PlayList;