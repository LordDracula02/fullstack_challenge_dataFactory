import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const authLinks = (
    <>
      {isMobile ? (
        <>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
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
            <MenuItem component={RouterLink} to="/" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Hello, {user?.username}
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" onClick={onLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </>
      )}
    </>
  );

  const guestLinks = (
    <>
      <Button color="inherit" component={RouterLink} to="/login">
        Login
      </Button>
      <Button color="inherit" component={RouterLink} to="/register">
        Register
      </Button>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <RouterLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
                To-Do List
              </RouterLink>
            </Typography>
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
