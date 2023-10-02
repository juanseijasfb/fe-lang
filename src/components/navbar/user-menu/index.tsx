import { useState } from "react";

import {
  Avatar, Box, IconButton,
  Menu, MenuItem, Tooltip,
  Typography 
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

let settings: MenuSetting[] = [];

type MenuSetting = {
  id: number,
  exec: () => void,
  value: string
}

const UserMenu = () => {
    const {user, isAuthenticated, logout, loginWithRedirect} = useAuth0();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {

        if(isAuthenticated) {
            settings = [
              {
                id: 1,
                value: "Logout",
                exec: () => logout(),
              },
          ]
        } else {
            settings = [{
                id: 1,
                value: "Login",
                exec: () => loginWithRedirect(),
            }];
        }

        if(settings.length === 0){
            return;
        }

        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

    return <Box sx={{ flexGrow: 0 }}>
    <Box sx={{display:'flex',  alignItems:'center'}}>
        {
            isAuthenticated && <Box sx={{display:'flex', paddingRight:"10px", gap:"5px"}}>
            <Typography>Bienvenido </Typography>
            <Typography sx={{fontWeight:"bold"}}> "{user?.nickname}" </Typography>
            </Box>
        }

        <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={user?.picture} />
        </IconButton>
        </Tooltip>
    </Box>
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
      {settings.map((setting: MenuSetting) => (
        <MenuItem key={setting?.id} onClick={() => {
            
            if(setting?.exec) {
                setting.exec();
            }

            handleCloseUserMenu();
        }}>
          <Typography textAlign="center">{setting?.value}</Typography>
        </MenuItem>
      ))}
    </Menu>
  </Box>
}

export default UserMenu;