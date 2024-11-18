import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Navbar = () => {
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.log(error); // Handle error
        }
    };

    return (
        <AppBar style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
            <Toolbar>
                {/* Left side of the Navbar */}
                <Box display="flex" gap="10px">
                    <Button
                        onClick={() => navigate('/home')}
                        variant="outlined"
                        style={{ color: 'white', border: '1px solid white' }}
                    >
                        Home
                    </Button>
                    <Button
                        onClick={() => navigate('/viewblogs')}
                        variant="outlined"
                        style={{ color: 'white', border: '1px solid white' }}
                    >
                        View Blogs
                    </Button>
                    <Button
                        onClick={() => navigate('/favorites')} // Navigate to Favorites Page
                        variant="outlined"
                        style={{ color: 'white', border: '1px solid white' }}
                    >
                        View Favorites
                    </Button>
                </Box>

                {/* Right side of the Navbar */}
                <Box>
                    <Button
                        onClick={handleSignout}
                        variant="outlined"
                        style={{ color: 'white', border: '1px solid white' }}
                    >
                        Signout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
