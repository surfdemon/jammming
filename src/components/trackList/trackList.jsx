import React from 'react'
import './trackList.style.css';
import TrackItem from '../trackItem/trackItem';

function TrackList(props){
    const {tracklist, trackListRemove, addTrackToPlayList} = props;
    console.log('tracks in the trackslist are ');
    console.log(tracklist);

    return (
        <div className="TrackList">
            {tracklist.map((track) => { 
                return <TrackItem 
                    artist={track.artistName} 
                    song={track.trackName} 
                    key={track.id} 
                    album={track.album} 
                    id={track.id} 
                    removeTrackClick={trackListRemove} 
                    addButton="yes" 
                    addTrackToPlayList={addTrackToPlayList}/>
            })}
        </div>
    )
}

export default TrackList;
