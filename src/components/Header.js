import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { useContext, useState } from 'react';
import LoginDialog from './LoginDialog';

export default function Header() {
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, setUser } = useContext(UserContext);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        location.reload();
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            iBlog
                        </Typography>
                        {user ? (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => { logout() }}>Esci</MenuItem>
                                </Menu>
                            </div>
                        ) : !user && (
                            <Button onClick={() => { setLoginDialogOpen(true) }} color="inherit">Accedi</Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <LoginDialog open={loginDialogOpen} handleClose={() => { setLoginDialogOpen(false) }} />
        </>
    );
}
