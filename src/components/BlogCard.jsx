/* eslint-disable react/prop-types */
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Favorite, FavoriteBorder } from '@mui/icons-material'; // Icons for favorite toggle

const BlogCard = (props) => {
    const { blog, deleteBlog = () => {}, handleFavorite = () => {}, isFavorite = false, showDeleteIcon = true } = props;

    const navigate = useNavigate();

    return (
        <Card style={{ position: 'relative' }}>
            <CardMedia sx={{ height: 140 }} image={blog.image} title={blog.title} />
            {showDeleteIcon && (
                <IconButton
                    style={{ position: 'absolute', right: '10px', top: '5px' }}
                    aria-label="delete"
                    size="small"
                    onClick={() => deleteBlog(blog.id)}
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.description}
                </Typography>
                <Chip label={blog.category} variant="outlined" />
            </CardContent>
            <CardActions>
                {/* Heart Icon for favorite toggle */}
                <IconButton
                    aria-label="favorite"
                    onClick={() => handleFavorite(blog)}
                    color={isFavorite ? 'error' : 'default'}
                >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate(`/viewblogs/${blog.id}`)}
                >
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
