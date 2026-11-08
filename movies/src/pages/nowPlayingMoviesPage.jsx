import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getNowPlayingMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";

const NowPlayingMoviesPage = () => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['now_playing'],
        queryFn: getNowPlayingMovies,
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
                return <AddToWatchListIcon movie={movie} />
            }}
        />
    );
};
export default NowPlayingMoviesPage;