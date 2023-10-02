import { useState } from "react";

import { 
  Box, IconButton, Menu,
  MenuItem, Tooltip, Typography 
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

import { useRouteStore } from "@/store";
import { RouteStore, TreeStore } from "@/types/storeTypes";

let settings: Menu[] = [];

type Menu = {
  id: number,
  value: string,
  exec: () => void,
}

const AdminMenu = () => {
    const { isAuthenticated } = useAuth0();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { setRightClickRender }: RouteStore = useRouteStore();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {

        if(isAuthenticated) {
            settings = [
              {
                id: 1,
                value: "Create Dispatcher",
                exec: () => {
                  setRightClickRender("create-dispatcher");
                },
              },
              {
                id: 2,
                value: "Create driver",
                exec: () => {
                  setRightClickRender("create-driver");
                },
              },
              {
                id: 3,
                value: "Create carrier",
                exec: () => {
                  setRightClickRender("create-carrier");
                },
              },
              {
                id: 4,
                value: "Add carrier restriction",
                exec: () => {
                  setRightClickRender("add-carrier-restriction");
                },
              },
              
              {
                id: 5,
                value: "Remove carrier restriction",
                exec: () => {
                  setRightClickRender("remove-carrier-restriction");
                },
              },
            ]
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
        
        <Tooltip title="Admin tools">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <AdminPanelSettingsOutlinedIcon  sx={{width:"50px", height:"50px"}} />
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
      {settings.map((setting: Menu) => (
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

export default AdminMenu;