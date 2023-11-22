import React, {useState} from 'react'
import './searchBar.style.css';


function SearchBar() {
    const [ searchText, setSearchText ] = useState('');
    
    const onSearchChange = (e) => {
        setSearchText( e.target.value);
    };

    const onSearchButtonClick = (e) => {
        console.log('Search button clicked');
        console.log(e);
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