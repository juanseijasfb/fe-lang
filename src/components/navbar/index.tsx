
import i18next from 'i18next';
import { useAuth0 } from '@auth0/auth0-react';

// import skylordWhite from '@/assets/logo-skylord-blanco.png';
import fleetBoosterWhite from '@/assets/FB3.png';

import { 
  Button, Select, Typography, 
  Box, MenuItem
} from '@mui/material';

import "./navbar.css";
import UserMenu from './user-menu';
import AdminMenu from './admin-menu';

import { useAppStore } from '@/store';
import { AppStore } from '@/types/storeTypes';

function Navbar() {
  const {isAuthenticated} = useAuth0();
  const {selectedLang, setSelectedLang, isAdm} : AppStore = useAppStore();

  return (
      <Box sx={{padding: "0px 20px 0px 20px", display:'flex', width: "100%"}}>

          {/* left side */}
            <Box sx={{marginRight:"20px", display: "flex", justifyContent:"center", alignItems:"center"}}>
              <Box sx={{display:'flex', marginRight:"20px"}}>
                <img src={fleetBoosterWhite} alt="FleetBooster logo" width="175" height="50" />
              </Box>
              {/* <Box sx={{display:'flex'}}>
                <img src={skylordWhite} alt="Skylord logo" width="150" height="50" />
              </Box> */}
              
            </Box>

          {/* right side */}
          <Box sx={{ display: "flex", flex:"auto", justifyContent:'end', alignItems:"center", gap:"20px"}}>
              {isAdm && <AdminMenu />}
              <UserMenu />
              <Select onChange={(e) => {
                i18next.changeLanguage(e.target.value);
                setSelectedLang(e.target.value);
              }} value={selectedLang}>
                <MenuItem value="es">ES</MenuItem>
                <MenuItem value="en">EN</MenuItem>
              </Select>
          </Box>
      </Box>
  );
}
export default Navbar;