import React from 'react'
import './trackList.style.css';
import TrackItem from '../trackItem/trackItem';

function TrackList(props){
    const {tracklist} = props;
    console.log('tracks in the trackslist are ');
    console.log(tracklist);

    return (
        <div className="TrackList">
            {tracklist.map((track) => { 
                return <TrackItem artist={track.artistName} song={track.trackName} />
            })}
        </div>
    )
}

export default TrackList;
