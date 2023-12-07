import React, { useState } from 'react'
import './playList.style.css';
import TrackItem from '../trackItem/trackItem';
import { useSelector, useDispatch } from'react-redux';
import { addTrack, removeTrack, changePlaylistName } from '../../store/playlistSlice';


function PlayList() {
    const { playlist, playlistName } =  useSelector(state => state.playlist);

    const dispatch = useDispatch();

    const saveToSpotifyButtonClick = () => {};
     
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