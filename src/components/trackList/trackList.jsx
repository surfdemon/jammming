import React from 'react'
import './trackList.style.css';
import TrackItem from '../trackItem/trackItem';
import { useSelector } from'react-redux';


function TrackList(){
    const { tracklist } =  useSelector(state => state.tracklist);
    
    return (
        <div className="TrackList">
            {tracklist.map((track) => { 
                return <TrackItem 
                    track={track}
                    key={track.id} 
                    addTrackToPlaylist = "yes"
                    listType = "tracklist"
                />
            })}
        </div>
    )
}

export default TrackList;
