import { useParams } from 'react-router';
import MovieVideoCard from "../components/movieVideoCard";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieVideos } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import Grid from '@mui/material/Grid';

const MovieVideosPage = () => {
    const { id } = useParams();
    const movieQuery = useQuery({
        queryKey: ['movie', { id: id }],
        queryFn: getMovie,
    });

    const videosQuery = useQuery({
        queryKey: ['videos', { id: id }],
        queryFn: getMovieVideos,
    });

    if (movieQuery.isPending || videosQuery.isPending) {
        return <Spinner />;
    }

    if (movieQuery.isError) {
        return <h1>{movieQuery.error.message}</h1>;
    }

    if (videosQuery.isError) {
        return <h1>{videosQuery.error.message}</h1>;
    }

    // Filter the videos to only include trailers from YouTube
    const videos = videosQuery.data.results.filter((video) => video.type === 'Trailer' && video.site === 'YouTube');

    return (
        <PageTemplate movie={movieQuery.data}>
            {videos.length > 0 ? ( // Check if there are any videos to display
                <Grid container spacing={2}>
                    {videos.map((video) => (
                        <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <MovieVideoCard video={video} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <p>No videos found for this movie.</p>
            )}
        </PageTemplate>
    );
};
export default MovieVideosPage;