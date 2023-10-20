import ReactDOM from 'react-dom/client'
import CustomRouter from '@/router/index.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import getConfig from '@/config.js'
import 'animate.css';
import { ToastContainer } from 'react-toastify';
import './i18n';

const config = {
    ...getConfig()
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Auth0Provider
        domain={config.domain}
        clientId={config.clientId}
        authorizationParams={{
        redirect_uri: window.location.origin
        }}
    >
        <CustomRouter />
        <ToastContainer 
            position='bottom-right'
            pauseOnHover 
            autoClose={7000} />
    </Auth0Provider>
)
