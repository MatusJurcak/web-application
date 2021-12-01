import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { NextRouter, useRouter } from 'next/dist/client/router';
import { useAuth, logOut } from '../firebase/initFirebase'

const Login = ({ router } : { router : NextRouter }) => {

    return (
        <Button
            onClick={() => router.push('/login')}
            sx={{ my: 2, color: 'white', display: 'block' }}
        >
            LOGIN
        </Button>
    )
}

const Logout = () => {
    const handleLogOut = async () => {
        await logOut()
    }

    return (
        <Button
            onClick={handleLogOut}
            sx={{ my: 2, color: 'white', display: 'block' }}
        >
            LOGOUT
        </Button>
    )
}


const ResponsiveAppBar = () => {
    const user = useAuth()
    const pages : string[] = ['Home', 'Users']
    const router : NextRouter = useRouter()

    const handleButton = (page : String) => {
        const toLowerPage : String = page === 'Home' ? '' : page.toLowerCase()
        router.push(`/${toLowerPage}`)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={() => handleButton(page)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                        ))}
                    </Box>
                    {user === null
                        ? null
                        : <Button sx={{ my: 2, color: 'white', display: 'block' }}>logged in as: {user.email}</Button>  
                    }
                    <Box sx={{ flexGrow: 0 }}>
                        {user === null 
                            ? <Login router={router}/>
                            : <Logout />
                        } 
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
