import { useAuth0 } from '@auth0/auth0-react';
import '@/App.css'
import RouteView from '@/pages/route-view';
import { useEffect, useState } from "react";
import { BlockedDrawer } from '@/components/BlockedNavbar';

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

          setPlanSvcMainPort(res?.port);
          setIsAdm(res?.role === "A");
        })
        .catch(() => {
          setServerError(true);
          setSnackbar({
            openSnackbar: true,
            message: "Hubo un error al intentar recuperar los datos del usuario",
            severity:"error",
          })
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
    return <BlockedDrawer> <h1> Cargando estado de sesión...</h1> </BlockedDrawer> 
 }

 if(!isAuthenticated){
    loginWithRedirect();
    return <BlockedDrawer> <h1> Loggeandose a la plataforma... </h1> </BlockedDrawer> 
 }

  if(isCheckingUser) {
    return <BlockedDrawer> <h1> Cargando usuario desde el sistema...</h1> </BlockedDrawer>
  }

  if(serverError) {
    return <BlockedDrawer>
       <h1>Ocurrió un error inesperado, reintente nuevamente.</h1> 

       <h2>Pruebe redirigiendo la web desde el siguiente boton y recargando la pagina:</h2>
       <button onClick={() => handleVerify()}>Verificar certificado</button>
    </BlockedDrawer>
  }

  if(!isAuthorized) {
    return <BlockedDrawer> <h1>Usted no posee permisos para operar en la plataforma.</h1> </BlockedDrawer>
  }

  return <>
    <RouteView />
  </>
}

export default App
