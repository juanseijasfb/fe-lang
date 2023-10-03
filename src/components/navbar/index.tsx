import "./navbar.css";
import { useAppStore } from '@/store';
import { AppStore } from '@/types/storeTypes';

// function Navbar() {
//   return (
//       <Box sx={{padding: "0px 20px 0px 20px", display:'flex', width: "100%", background:'rgb(25 117 210)', color:'white'}}>

//           {/* left side */}
//             <Box sx={{marginRight:"20px", display: "flex", justifyContent:"center", alignItems:"center"}}>
//               <Box sx={{display:'flex', marginRight:"20px"}}>
//                 <img src={fleetBoosterWhite} alt="FleetBooster logo" width="175" height="50" />
//               </Box>
//             </Box>
//       </Box>
//   );
// }


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
                onClick={() => navigate("/create-restriction")}>
                Restrictions
              </Button>
            </>}

          </Box>

          {!navbarBlocked && <>


            <Typography>Welcome "{user?.name}"</Typography> 
            {/* right side */}
            <Box sx={{paddingRight:"20px", paddingLeft:"10px"}}>
              <Select onChange={(e) => {
                i18next.changeLanguage(e.target.value);
                setSelectedLang(e.target.value);
              }} value={selectedLang}>
                <MenuItem value="es">ES</MenuItem>
                <MenuItem value="en">EN</MenuItem>
              </Select>
            </Box>
          </>}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
        </Toolbar>
    </AppBar>
  );
}
export default Navbar;
