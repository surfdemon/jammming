import React from 'react'
import './trackList.style.css';
import TrackItem from '../trackItem/trackItem';
import { useSelector, useDispatch } from'react-redux';


function TrackList(){
    const { tracklist } =  useSelector(state => state.tracklist);
    const dispatch = useDispatch();

    
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
