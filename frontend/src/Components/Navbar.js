import * as React from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../Images/logo.svg'
import {logout} from '../Redux/authSlice';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const pages = ['Jobs'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userToken = localStorage.getItem('userToken')

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async() => {
      await dispatch(logout())
      navigate("/login")
  }

  return (
    <AppBar sx={{backgroundColor: 'white', color: '#5E5ADB', zIndex: '3'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <img src={logo} alt="logo" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              paddingLeft: '10px',
            }}
          >
            crux
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Link to='/jobs' style={{textDecoration: 'none'}}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#5E5ADB', display: 'block' }}
              >
                {page}
              </Button> </Link> 
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexGrow: 0 }}>

              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton> */}

              <Button
              fullWidth
              variant="contained"
              onClick={handleLogout}
                >
                  Logout
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
