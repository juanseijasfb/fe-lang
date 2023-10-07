import "./navbar.css";
import { useAppStore } from '@/store';
import { AppStore } from '@/types/storeTypes';

import * as React from "react";
import {
  AppBar, Box, Select, Toolbar, 
  Typography, Menu,
  Avatar, Button, Tooltip,
  MenuItem, IconButton,
} from '@mui/material';
import i18next from 'i18next';
import fleetBoosterWhite from '@/assets/logo.png';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar({navbarBlocked = true}) {
  const {selectedLang, setSelectedLang} : AppStore = useAppStore();

  const {logout, user} = useAuth0();
  
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
              <Button 
                sx={{color:"white"}}
                variant="outlined"
                onClick={() => navigate("/create-driver")}>
                Drivers
              </Button>
              <Button 
                sx={{color:"white"}}
                variant="outlined"
                onClick={() => navigate("/create-carrier")}>
                Carriers
              </Button>
              <Button 
                sx={{color:"white"}}
                variant="outlined"
                onClick={() => navigate("/create-dispatcher")}>
                Dispatcher
              </Button>
              <Button 
                sx={{color:"white"}}
                variant="outlined"
                onClick={() => navigate("/create-restriction")}>
                Restrictions
              </Button>
            </>}

          </Box>

          {!navbarBlocked && <>
            
            <Box sx={{paddingRight:"20px"}}>
              <Typography>{user?.name ? `Welcome ${user.name}`: ""}</Typography> 
            </Box>


            {/* right side lang */}
            {/* <Box sx={{paddingRight:"20px", paddingLeft:"10px"}}>
              <Select onChange={(e) => {
                i18next.changeLanguage(e.target.value);
                setSelectedLang(e.target.value);
              }} value={selectedLang}>
                <MenuItem value="es">ES</MenuItem>
                <MenuItem value="en">EN</MenuItem>
              </Select>
            </Box> */}
         
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
