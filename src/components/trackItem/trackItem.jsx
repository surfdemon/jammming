import React from 'react';

function TrackItem(props) {
    const {artist, song, album, removeTrackClick, id} = props;

    return (
      <div className="trackItem">
        <h3>{song}</h3>
        <p> by {artist}</p>
        <button onClick={() => removeTrackClick(id)}>X</button>
      </div>
    )
  }

  export default TrackItem;