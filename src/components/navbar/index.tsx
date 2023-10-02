
import i18next from 'i18next';
import fleetBoosterWhite from '@/assets/logo.png';

import { 
  Select, Box, MenuItem
} from '@mui/material';

import "./navbar.css";
import UserMenu from './user-menu';

import { useAppStore } from '@/store';
import { AppStore } from '@/types/storeTypes';

function Navbar({navbarBlocked = true}) {
  const {selectedLang, setSelectedLang} : AppStore = useAppStore();

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

            {!navbarBlocked && <>
              {/* right side */}
              <Box sx={{ display: "flex", flex:"auto", justifyContent:'end', alignItems:"center", gap:"20px"}}>
                  <UserMenu />
                  <Select onChange={(e) => {
                    i18next.changeLanguage(e.target.value);
                    setSelectedLang(e.target.value);
                  }} value={selectedLang}>
                    <MenuItem value="es">ES</MenuItem>
                    <MenuItem value="en">EN</MenuItem>
                  </Select>
              </Box>
            </>}
          
      </Box>
  );
}
export default Navbar;