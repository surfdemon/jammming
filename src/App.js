import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchBar/searchBar';
import PlayList from './components/playList/playList';
import TrackList from './components/trackList/trackList';

function App() {
  const [tracks, setTracks] = useState([
    {
      artistName: 'Dire Straits',
      trackName: 'Sultans of Swing',  
    },
    {
      artistName: 'Savage Garden',
      trackName: 'Truely Madly Deeply',  
    },
    {
      artistName: 'The Eagles',
      trackName: 'Hotel California',  
    },
    {
      artistName: 'Elton John',
      trackName: 'Candle in the Wind',  
    }
  ]);
  const [playlist, setPlaylist] = useState([
    {
      artistName: 'Europe',
      trackName: 'The Final Countdown'
    },
    {
      artistName: 'Survivor',
      trackName: 'Eye of the Tiger'
    },
    {
      artistName: 'Bon Jovi',
      trackName: 'These Days'
    },
    {
      artistName: 'Gary Moore',
      trackName: 'Still Got the Blues'
    },
  ]);
  return (
    <div className="App">
        <SearchBar />
        <TrackList tracklist={tracks}/>
        <PlayList playlist={playlist}/>
    </div>
  );

}

export default App;
