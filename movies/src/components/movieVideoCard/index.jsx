import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MovieVideoCard = ({ video }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardMedia
                component="iframe"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allowFullScreen
                sx={{ aspectRatio: '16 / 9', width: '100%', border: 0, display: 'block' }}
            />
            <CardContent>
                <Typography variant="subtitle1" component="p">
                    {video.name}
                </Typography>
            </CardContent>
        </Card>
    );
};
export default MovieVideoCard