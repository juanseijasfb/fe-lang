// import { useMediaQuery } from 'react-responsive'

import { Box, Typography } from "@mui/material";

import fleetBoosterLogo from '@/assets/logo-bg.png';
import { useAppStore } from '@/store';
import AuthWrapper from '@/Layout/authWrapper';
import 'react-toastify/dist/ReactToastify.css';

const Layout: React.FC<{children: React.ReactNode}>  = ({children}) => {

    const {appLockedLoad, appLockedLoadMessage} = useAppStore();

    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })

    return <>
    

        {appLockedLoad && (
            <Box sx={{
                position: "absolute",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                right: 0,
                top: 0,
                bottom: 0,
                left: 0,
                background: '#ffffffc1',//'#ffffffc4',
                zIndex: 1300,
            }}>
                <Box sx={{display:'flex', flexDirection:'column', gap:'20px', alignItems:'center'}}>
                    <img src={fleetBoosterLogo} alt="FleetBooster logo" height="300" />
                    <Typography sx={{fontWeight:'bold'}}> {appLockedLoadMessage} </Typography>
                </Box>
            </Box>
        )}
                   
        <Box sx={{height:"100vh", width:"99vw"}}>
           <AuthWrapper>
                {children}
           </AuthWrapper>
        </Box>
    </>

};

export default Layout;