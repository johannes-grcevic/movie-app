import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    const [watchList, setMyWatchList] = useState([])    
    const [myReviews, setMyReviews] = useState({})

    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
        }
        else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
    };

    const addToWatchList = (movie) => {
        let newWatchList = [];
        if (!watchList.includes(movie.id)) {
            newWatchList = [...watchList, movie.id];
        }
        else {
            newWatchList = [...watchList];
        }
        setMyWatchList(newWatchList)
    };

    const removeFromWatchList = (movie) => {
        setMyWatchList(watchList.filter(
            (mId) => mId !== movie.id
        ))
    };    

    const addReview = (movie, review) => {
        setMyReviews({ ...myReviews, [movie.id]: review })
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                watchList,
                addToWatchList,
                removeFromWatchList,              
                addReview
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;