import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getTopRatedMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";

const TopRatedMoviesPage = () => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['top_rated'],
        queryFn: getTopRatedMovies,
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
            title="Top Rated Movies"
            movies={movies}
            action={(movie) => {
                return <AddToWatchListIcon movie={movie} />
            }}
        />
    );
};
export default TopRatedMoviesPage;