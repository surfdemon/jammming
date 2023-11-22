import React from 'react';

function TrackItem(props) {
    const {artist, song} = props;

    return (
      <div className="trackItem">
        <h3>{song}</h3>
        <p> by {artist}</p>
      </div>
    )
  }

  export default TrackItem;