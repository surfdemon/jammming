import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar/searchBar';
import PlayList from './components/playList/playList';
import TrackList from './components/trackList/trackList';

function App() {
  const [tracks, setTracks] = useState([
    {
      id: 1,
      artistName: 'Dire Straits',
      trackName: 'Sultans of Swing', 
      album: 'The very best of Dire Straits'
    },
    {
      id: 2,
      artistName: 'Savage Garden',
      trackName: 'Truly Madly Deeply',  
      album: 'Truly Madly Deeply'
    },
    {
      id: 3,
      artistName: 'The Eagles',
      trackName: 'Hotel California',  
      album: 'Hotel California'
    },
    {
      id: 4,
      artistName: 'Elton John',
      trackName: 'Candle in the Wind',  
      album: 'Candle in the Wind'
    }
  ]);

  const [playlist, setPlaylist] = useState([
    {
      id: 5,
      artistName: 'Europe',
      trackName: 'The Final Countdown',
      album: 'Europe'
    },
    {
      id: 6,
      artistName: 'Survivor',
      trackName: 'Eye of the Tiger',
      album: 'Survivor'
    },
    {
      id: 7,
      artistName: 'Bon Jovi',
      trackName: 'These Days',
      album: 'These Days'
    },
    {
      id: 8,
      artistName: 'Gary Moore',
      trackName: 'Still Got the Blues',
      album: 'Still got the blues'
    },
  ]);

  const removeFromTrackList = (id) => {
      setTracks(oldTracks => { return oldTracks.filter(tracks => tracks.id !== id)});
  };

  const removeFromPlayList = (id) => {
    setPlaylist(oldPlayList => { return oldPlayList.filter(tracks => tracks.id !== id)});
  };

  return (
    <div className="App">
        <SearchBar />
        <TrackList tracklist={tracks} trackListRemove={removeFromTrackList}/>
        <PlayList playlist={playlist} playListRemove={removeFromPlayList}/>
    </div>
  );

}

export default App;
