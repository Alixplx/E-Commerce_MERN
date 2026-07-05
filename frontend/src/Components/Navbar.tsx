import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';



function NavBar() {

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const { username, isAuthenticated} = useAuth()

  const navigate = useNavigate()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    
    setAnchorElUser(null);
  }

  const handleLogin = () => {

    navigate("/login")
  }


  return (

    <AppBar position="static">

      <Container maxWidth="xl">

        <Toolbar disableGutters>
          
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}}>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center"}}>

            <AdbIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
              }}
            >
              E-Mmerce
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>

            {
              isAuthenticated ? <>

                <Tooltip title="Open settings">
              
                  <Grid container sx={{alignItems: "center", justifyContent: "center", gap: 2}}>

                    <Grid>
                      
                      <Typography>{username}</Typography>
                    </Grid>

                    <Grid>

                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={username} src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Tooltip>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  
                  <MenuItem onClick={handleCloseUserMenu}>

                      <Typography sx={{ textAlign: 'center' }}>My Orders</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>

                      <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                  </MenuItem>
                </Menu>

              </> : 
              
              <Button variant='contained' color='success' onClick={handleLogin}>Log In</Button>
            }
          </Box>
        </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;