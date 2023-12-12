import React, {useState} from 'react'
import './searchBar.style.css';
import { addTrack } from '../../store/tracklistSlice';
import { useDispatch } from'react-redux';

function SearchBar() {
    const [ searchText, setSearchText ] = useState('');
    const dispatch = useDispatch();

    const onSearchChange = (e) => {
        setSearchText( e.target.value);
    };

    const getResults = async (token) => {
        try { 
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchText}&type=track&market=GB&limit=5&offset=0&access_token=${token}`);
            const data = response.json();
            return data;
        } catch (error) {
            console.log(error);               
        }
    }    

    const onSearchButtonClick = (e) => {
        let token = window.localStorage.getItem("token");
        // try to get token from local storage, if there is one the user  has logged in before. 
        // For now lets be naughty and assume that their login is still valid.
        if (token) {
            // If there is a token then it looks like the user in logged in
            // So carry on and try and get the search results
            getResults(token).then((data) => {
                // When the search results come back try to process them
                try {
                    if(typeof data['tracks'] ===  typeof undefined){
                        // If data['tracks'] is undefined then it means the search returned no results. 
                        window.localStorage.removeItem("token");
                        window.location.reload();
                    } else {
                        const foundTracks = data['tracks']['items'];
                        foundTracks.forEach(track => {
                            //Build a new track object to add to the track list
                            const newTrack = {
                                id: track.uri,
                                trackName: track.name,
                                artistName: track.artists[0].name,
                                albumName: track.album.name,
                            }
                            dispatch(addTrack(newTrack));
                        });
                    } 
                    } catch (error) {
                        // The token is not valid, remove token and reload the page
                        // to force the user to login again.
                        window.localStorage.removeItem("token");
                        window.location.reload();
                    }
                });
        }
    }

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