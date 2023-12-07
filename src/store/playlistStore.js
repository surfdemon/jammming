import { configureStore } from "@reduxjs/toolkit";
import playlistReducer  from "./playlistSlice";
import tracklistReducer  from "./tracklistSlice";

const store = configureStore({
    reducer: {  
        playlist: playlistReducer,
        tracklist: tracklistReducer,
    }
});

export default store;
