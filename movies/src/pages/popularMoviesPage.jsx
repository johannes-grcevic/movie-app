import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getPopularMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToWatchListButton from "../components/cardButtons/addToWatchList";
import AddToFavoritesButton from '../components/cardButtons/addToFavorites'

const PopularMoviesPage = () => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['popular'],
        queryFn: getPopularMovies,
    })

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    const movies = data.results;

    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    const myWatchList = movies.filter(m => m.myWatchList)
    localStorage.setItem('myWatchList', JSON.stringify(myWatchList))

    return (
        <PageTemplate
            title="Popular Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <AddToFavoritesButton movie={movie} />
                        <AddToWatchListButton movie={movie} />
                    </>
                )
            }}
        />
    );
};
export default PopularMoviesPage;