import "./navbar.css";


import * as React from "react";
import {
  AppBar, Box, Toolbar, 
  Typography, Menu,
  Avatar, Button, Tooltip,
  MenuItem, IconButton, Select,
} from '@mui/material';
import fleetBoosterWhite from '@/assets/logo.png';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { useAppStore } from '@/store';
import { AppStore } from '@/types/storeTypes';
import i18next from 'i18next';

function Navbar({navbarBlocked = true}) {
const {selectedLang, setSelectedLang} : AppStore = useAppStore();

  const {logout, user} = useAuth0();
  
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [anchorElCarrier, setAnchorElCarrier] = React.useState<null | HTMLElement>(null);
  const [anchorElDriver, setAnchorElDriver] = React.useState<null | HTMLElement>(null);
  const [anchorElDispatcher, setAnchorElDispatcher] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static">
        <Toolbar>
          <img src={fleetBoosterWhite} alt="FleetBooster logo" width="175" height="50" />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent:"center"}}>
              
            {!navbarBlocked && <> 
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElDriver}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={Boolean(anchorElDriver)}
                onClose={() => setAnchorElDriver(null)}
              >
                  <MenuItem onClick={() => {
                    navigate("/create/driver");
                    setAnchorElDriver(null);
                  }}>
                    <Typography textAlign="center">Create driver</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    navigate("/delete/driver");
                    setAnchorElDriver(null);
                  }}>
                    <Typography textAlign="center">Delete driver</Typography>
                  </MenuItem>
              </Menu>

              <Button 
                sx={{color:"white"}}
                variant="outlined"
                onClick={(e) => setAnchorElDriver(e.currentTarget)}>
                Drivers
              </Button>
              
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElCarrier}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={Boolean(anchorElCarrier)}
                onClose={() => setAnchorElCarrier(null)}
              >
                  <MenuItem onClick={() => {
                    navigate("/create/carrier");
                    setAnchorElCarrier(null);
                  }}>
                    <Typography textAlign="center">Create carrier</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    navigate("/delete/carrier");
                    setAnchorElCarrier(null);
                  }}>
                    <Typography textAlign="center">Delete carrier</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    navigate("/create/carrier/restriction");
                    setAnchorElCarrier(null);
                  }}>
                    <Typography textAlign="center">Create carrier restriction</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    navigate("/delete/carrier/restriction");
                    setAnchorElCarrier(null);
                  }}>
                    <Typography textAlign="center">Delete carrier restriction</Typography>
                  </MenuItem>
              </Menu>

              <Button 
                sx={{color:"white"}}
                variant="outlined"
                onClick={(e) => setAnchorElCarrier(e.currentTarget)}>
                Carriers
              </Button>

              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElDispatcher}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={Boolean(anchorElDispatcher)}
                onClose={() => setAnchorElDispatcher(null)}
              >
                  <MenuItem onClick={() => {
                    navigate("/create/dispatcher");
                    setAnchorElDispatcher(null);
                  }}>
                    <Typography textAlign="center">Create dispatcher</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    navigate("/delete/dispatcher");
                    setAnchorElDispatcher(null);
                  }}>
                    <Typography textAlign="center">Delete dispatcher</Typography>
                  </MenuItem>
              </Menu>

              <Button 
                sx={{color:"white"}}
                variant="outlined"
                onClick={(e) => setAnchorElDispatcher(e.currentTarget)}>
                Dispatcher
              </Button>
            </>}

          </Box>

          {!navbarBlocked && <>
            
            <Box sx={{paddingRight:"20px"}}>
              <Typography>{user?.name ? `Welcome ${user.name}`: ""}</Typography> 
            </Box>


            {/* right side lang */}
            <Box sx={{paddingRight:"20px", paddingLeft:"10px"}}>
              <Select onChange={(e) => {
                i18next.changeLanguage(e.target.value);
                setSelectedLang(e.target.value);
              }} value={selectedLang}>
                <MenuItem value="es">ES</MenuItem>
                <MenuItem value="en">EN</MenuItem>
              </Select>
            </Box>
         
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src={user?.picture} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => {
                    logout(
                      {
                        openUrl: false,
                      }
                    );
                  }}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </>}
        </Toolbar>
    </AppBar>
  );
}
export default Navbar;
