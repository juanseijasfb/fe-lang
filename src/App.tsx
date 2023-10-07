import { useAuth0 } from '@auth0/auth0-react';
import '@/App.css'
import { useEffect, useState } from "react";
import { getDispatcher } from '@/services/ApiServices';
import Home from './pages/home';
import NavBarContainer from './components/BlockedNavbar';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isAuthenticated, user, isLoading, loginWithRedirect} = useAuth0();

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

  return <NavBarContainer navbarBlocked={false}>
    <Home />
  </NavBarContainer>
}

export default App
