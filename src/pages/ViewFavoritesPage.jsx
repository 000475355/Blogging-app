import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Box, Divider, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";
import Alert from "../components/Alert";

const ViewFavoritesPage = () => {
    const [favoritesList, setFavoritesList] = useState([]);
    const [alertConfig, setAlertConfig] = useState({});
    const userId = localStorage.getItem("userId"); // Assuming the user ID is stored locally

    const getFavoriteBlogs = async () => {
        try {
            const q = query(collection(db, "favorites"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            const favoriteBlogs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFavoritesList(favoriteBlogs);
        } catch (error) {
            console.error("Error fetching favorite blogs:", error);
            setAlertConfig({
                message: "Error fetching favorite blogs. Please try again later.",
                color: "error",
                isOpen: true,
            });
        }
    };

    useEffect(() => {
        getFavoriteBlogs();
    }, []);

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h3">Your Favorite Blogs</Typography>
            <Divider />
            {favoritesList.length > 0 ? (
                <Box display="grid" gridTemplateColumns="33% 33% 33%" gap="12px">
                    {favoritesList.map((blog, index) => (
                        <BlogCard
                            key={index}
                            blog={blog}
                            showDeleteIcon={false} 
                            handleFavorite={() => getFavoriteBlogs()} 
                            isFavorite={true} 
                        />
                    ))}
                </Box>
            ) : (
                <Typography variant="h6" color="text.secondary">
                    You have no favorite blogs yet. Start marking blogs as your favorites!
                </Typography>
            )}
            <Alert alertConfig={alertConfig} />
        </Box>
    );
};

export default ViewFavoritesPage;
