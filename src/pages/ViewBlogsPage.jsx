import { collection, deleteDoc, doc, getDocs, query, where, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { Box, Divider, Typography } from '@mui/material';
import BlogCard from '../components/BlogCard';
import Alert from '../components/Alert';

const ViewBlogsPage = () => {
    const blogCollectionReference = collection(db, "blogs");
    const favoritesCollectionReference = collection(db, "favorites"); // Reference for the favorites collection
    const [blogsList, setBlogsList] = useState([]);
    const [alertConfig, setAlertConfig] = useState({});
    const [favoriteBlogs, setFavoriteBlogs] = useState([]);

    const userId = localStorage.getItem('userId'); // Assuming you store the user's ID locally

    // Fetch all blogs
    const getBlogsList = async () => {
        const blogs = await getDocs(blogCollectionReference);
        const extractedBlogs = blogs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setBlogsList(extractedBlogs);
        console.log(extractedBlogs, 'blogs');
    };

    // Fetch user's favorite blogs
    const getFavoriteBlogs = async () => {
        const q = query(favoritesCollectionReference, where('userId', '==', userId));
        const favorites = await getDocs(q);
        const favoriteIds = favorites.docs.map((doc) => doc.data().blogId);
        setFavoriteBlogs(favoriteIds);
    };

    // Toggle favorite status
    const handleFavorite = async (blog) => {
        const isFavorite = favoriteBlogs.includes(blog.id);

        try {
            if (isFavorite) {
                // Remove from favorites
                const q = query(
                    favoritesCollectionReference,
                    where('userId', '==', userId),
                    where('blogId', '==', blog.id)
                );
                const favoriteDoc = await getDocs(q);
                favoriteDoc.forEach(async (docSnapshot) => {
                    await deleteDoc(doc(db, 'favorites', docSnapshot.id));
                });
                setAlertConfig({ message: 'Removed from favorites', color: 'warning', isOpen: true });
            } else {
                // Add to favorites
                await addDoc(favoritesCollectionReference, {
                    userId,
                    blogId: blog.id,
                    blogTitle: blog.title,
                    blogContent: blog.content,
                });
                setAlertConfig({ message: 'Added to favorites', color: 'success', isOpen: true });
            }
            getFavoriteBlogs(); // Refresh favorite blogs list
        } catch (error) {
            setAlertConfig({ message: 'Error updating favorites', color: 'error', isOpen: true });
        }
    };

    const deleteBlog = async (id) => {
        const blogDoc = doc(db, "blogs", id);

        try {
            await deleteDoc(blogDoc);
            setAlertConfig({ message: 'Successfully deleted the blog', color: 'success', isOpen: true });
        } catch (error) {
            setAlertConfig({ message: 'Error deleting the blog', color: 'error', isOpen: true });
        }
        getBlogsList(); // Refresh blogs list
    };

    useEffect(() => {
        getBlogsList();
        getFavoriteBlogs();
    }, []);

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h3">View Blogs</Typography>
            <Divider />
            <Box display="grid" gridTemplateColumns="33% 33% 33%" gap="12px">
                {blogsList.map((blog, index) => {
                    const isFavorite = favoriteBlogs.includes(blog.id);
                    return (
                        <BlogCard
                            key={index}
                            blog={blog}
                            deleteBlog={deleteBlog}
                            handleFavorite={handleFavorite}
                            isFavorite={isFavorite}
                        />
                    );
                })}
            </Box>
            <Alert alertConfig={alertConfig} />
        </Box>
    );
};

export default ViewBlogsPage;
