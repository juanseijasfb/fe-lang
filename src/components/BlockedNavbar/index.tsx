import { Box } from '@mui/material';
import Navbar from '../navbar';

const NavBarContainer = ({navbarBlocked = true, children}) => {
    return <Box sx={{ display: 'flex', flexDirection:'column' }}>
      <Navbar navbarBlocked={navbarBlocked} />
      <Box sx={{paddingTop:"40px"}}>
        {children}
      </Box>
    </Box>
  }
  
export default NavBarContainer;