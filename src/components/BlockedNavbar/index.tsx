import { Box } from '@mui/material';
import Navbar from '../navbar';

import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


const NavBarContainer = ({navbarBlocked = true, children}) => {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth0();

  if(!navbarBlocked && !isAuthenticated) {
    navigate("/");
  }

  return <Box sx={{ display: 'flex', flexDirection:'column' }}>
    <Navbar navbarBlocked={navbarBlocked} />
    <Box sx={{paddingTop:"40px"}}>
      {children}
    </Box>
  </Box>
}
  
export default NavBarContainer;