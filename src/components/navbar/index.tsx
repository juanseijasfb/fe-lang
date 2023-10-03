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

const pages = {
  drivers: [
    {
      key: "driver-1",
      displayName: "Create Driver",
      page: "/create-driver",
    },
    {
      key: "driver-2",
      displayName: "Delete Driver",
      page: "/delete-driver",
    }
  ],
  carriers: [
    {
      key: "carrier-1",
      displayName: "Create carrier",
      page: "/create-carrier",
    },
    {
      key: "carrier-2",
      displayName: "Delete carrier",
      page: "/delete-carrier",
    }
  ],
  dispatchers: [
    {
      key: "dispatcher-1",
      displayName: "Create dispatcher",
      page: "/create-dispatcher",
    },
    {
      key: "dispatcher-2",
      displayName: "Delete dispatcher",
      page: "/delete-dispatcher",
    }
  ]
  
}

const settings = ["Logout"];

function Navbar({navbarBlocked = true}) {
  const {selectedLang, setSelectedLang} : AppStore = useAppStore();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
        <Toolbar>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {Object.keys(pages).map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          
          <img src={fleetBoosterWhite} alt="FleetBooster logo" width="175" height="50" />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent:"center" }}>
            {Object.keys(pages).map((page) => (
              <Button
                key={page}
                onClick={handleOpenUserMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {/* {page}  */}
                <Typography textAlign="center">{page}</Typography>
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
                  {pages[page]?.map((item) => (
                    <MenuItem key={item.key} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{item.displayName}</Typography>
                    </MenuItem>
                  ))}
                </Menu>

              </Button> 
            ))}
          </Box>

          {!navbarBlocked && <>
            {/* right side */}
            <Box sx={{paddingRight:"20px"}}>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
    </AppBar>
  );
}
export default Navbar;
