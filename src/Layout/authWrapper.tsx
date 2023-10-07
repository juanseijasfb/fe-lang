import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';

import { getDispatcher } from '@/services/ApiServices';
import NavBarContainer from '@/components/BlockedNavbar';

import '@/App.css'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
    const { isAuthenticated, user, isLoading, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [customError, setCustomError] = useState("");
     
    useEffect(() => {
  
       const getDisp = async (email) => {
          await getDispatcher(email)
          .then((res) => {
  
            if(typeof res === "string") {
  
              if(res === "msg-err-dis001") {
                setCustomError(`El dispatcher '${user?.email}' no existe en el sistema. Pongase en contacto con un administrador.`);
                return;
              }
            }
  
            const authorized = Boolean(res?.enabled);
            setIsAuthorized(authorized);
  
            if(!authorized) {
              navigate("/error")
              return;
            }
  
          })
          .catch(() => {
            setServerError(true);
            toast.error("Hubo un error al intentar recuperar los datos del usuario")
          })
          .finally(() => {
             setIsCheckingUser(false);
          })
       }
  
       if(user?.email) {
          getDisp(user?.email);
       }
    }, [user]);
  
    if(customError !== "") {
      return <h1> {customError} </h1>
    }
     
    if(isLoading) {
      return <NavBarContainer> <h1> Cargando estado de sesión...</h1> </NavBarContainer> 
   }
  
   if(!isAuthenticated){
      loginWithRedirect();
      return <NavBarContainer> <h1> Loggeandose a la plataforma... </h1> </NavBarContainer> 
   }
  
    if(isCheckingUser) {
      return <NavBarContainer> <h1> Cargando usuario desde el sistema...</h1> </NavBarContainer>
    }
  
    if(serverError) {
      return <NavBarContainer>
         <h1>Ocurrió un error inesperado, reintente nuevamente.</h1> 
      </NavBarContainer>
    }
  
    if(!isAuthorized) {
      return <NavBarContainer> <h1>Usted no posee permisos para operar en la plataforma.</h1> </NavBarContainer>
    }

    return <NavBarContainer navbarBlocked={false}> {children} </NavBarContainer>
};

export default AuthWrapper;