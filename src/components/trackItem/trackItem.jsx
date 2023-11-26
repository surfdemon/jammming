import React from 'react';

function TrackItem(props) {
    const {artist, song, album, removeTrackClick, addTrackToPlayList, id} = props;

    if (props.addButton === "yes"){
        return (
            <div className="trackItem">
              <h3>{song}</h3>
              <p> by {artist}</p>       
              <button onClick={() => addTrackToPlayList(id)}>Add</button>
              <button onClick={() => removeTrackClick(id)}>X</button>
            </div>
          )
    } else { 
        return (
            <div className="trackItem">
              <h3>{song}</h3>
              <p> by {artist}</p>       
              <button onClick={() => removeTrackClick(id)}>X</button>
            </div>
          )
    }

  }

  export default TrackItem;