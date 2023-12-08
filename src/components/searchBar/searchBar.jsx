import React, {useState} from 'react'
import './searchBar.style.css';
import { addTrack } from '../../store/tracklistSlice';
import { useSelector, useDispatch } from'react-redux';

function SearchBar() {
    const [ searchText, setSearchText ] = useState('');
    const dispatch = useDispatch();

    const onSearchChange = (e) => {
        setSearchText( e.target.value);
    };

    const getResults = async (token) => {
        try { 
            console.log(searchText);
            console.log(token);
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchText}&type=track&market=GB&limit=5&offset=0&access_token=${token}`);
            const data = response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }    

    const onSearchButtonClick = (e) => {
        console.log('Search button clicked');
        console.log(e);

        let token = window.localStorage.getItem("token");
        if (token) {
            getResults(token).then((data) => {
                const foundTracks = data['tracks']['items'];
                foundTracks.forEach(track => {
                    const newTrack = {
                        id: track.id,
                        trackName: track.name,
                        artistName: track.artists[0].name,
                        albumName: track.album.name,
                     }
                    
                    console.log(newTrack);
                    dispatch(addTrack(newTrack));
                });
                console.log(data['tracks']['items']);
            });
        } else {
            console.log("No token");
        }
    };

    return (
        <div className="SearchBar">
            <div>
                <input type="text" value={searchText} onChange={onSearchChange} id='searchInput' placeholder='Music to search for'/>
                <button onClick={onSearchButtonClick}>Search</button>
            </div>
        </div>        
    )
}

export default SearchBar;