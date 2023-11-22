import React, { useState } from 'react'
import './playList.style.css';
import TrackItem from '../trackItem/trackItem';

function PlayList(props) {
    const {playlist} = props;
    console.log('the tracks in the playlist are');
    console.log(playlist);
    const saveToSpotifyButtonClick = () => {};

    return (
        <div className="PlayList">
              {playlist.map((track) => { 
                return <TrackItem artist={track.artistName} song={track.trackName} />
            })}
              <button onClick={saveToSpotifyButtonClick}>Save to Spotify</button>
        </div>
    )
}

export default PlayList
