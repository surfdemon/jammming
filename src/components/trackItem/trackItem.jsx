import React from 'react';
import { removeTrackFromTracklist } from '../../store/tracklistSlice';
import { addTrack, removeTrackFromPlaylist } from '../../store/playlistSlice';
import { useDispatch } from'react-redux';

function TrackItem(props) {
    const { track, listType } = props;
    const dispatch = useDispatch();
    const handleRemoveClick = (e, track) => {
      e.preventDefault();
      if (listType === 'tracklist') {
        dispatch(removeTrackFromTracklist(track));
      } else {
        dispatch(removeTrackFromPlaylist(track));
      }
    }

    const addTrackToPlaylist = (track) => {
      dispatch(addTrack(track));
      dispatch(removeTrackFromTracklist(track));
    }

    if (props.addTrackToPlaylist === "yes"){ 
      return (
        <div className="trackItem">
          <h3>{track.trackName}</h3>
          <p> by {track.artistName}</p>       
          <button onClick={(e) => {addTrackToPlaylist(track)}}>Add</button>
          <button onClick={(e) => {handleRemoveClick(e, track)}}>X</button>
          add track to playlist 
        </div>
      );
    } else { 
      return (
        <div className="trackItem">
          <h3>{track.trackName}</h3>
          <p> by {track.artistName}</p>       
          <button onClick={(e) => {handleRemoveClick(e, track)}}>X</button>
        </div>
      )
    }

  }

  export default TrackItem;