import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getPopularMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToWatchListButton from "../components/cardButtons/addToWatchList";

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
    const myWatchList = movies.filter(m => m.myWatchList)
    localStorage.setItem('myWatchList', JSON.stringify(myWatchList))

    return (
        <PageTemplate
            title="Popular Movies"
            movies={movies}
            action={(movie) => {
                return <AddToWatchListButton movie={movie} />
            }}
        />
    );
};
export default PopularMoviesPage;