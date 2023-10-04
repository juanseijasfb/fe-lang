import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import '@/index.css'

import App from '@/App.tsx'
import Layout from '@/Layout';
import NavBarContainer from "@/components/BlockedNavbar";
import CreateDriverForm from "@/components/forms/drivers/create";
import CreateCarrierForm from "@/components/forms/carriers/create";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout> <App /> </Layout>,
        errorElement: <Layout>
            <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                <h1>Hubo un error inesperado, intente recargar la pagina.</h1>
            </div>
        </Layout>,
    },
    {
        path: "/create-driver",
        element: <Layout> 
            <NavBarContainer navbarBlocked={false}>
                <CreateDriverForm />
            </NavBarContainer>
        </Layout>,
        errorElement: <Layout>
            <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                <h1>Hubo un error inesperado, intente recargar la pagina.</h1>
            </div>
        </Layout>,
    },
    {
        path: "/create-carrier",
        element: <Layout> 
            <NavBarContainer navbarBlocked={false}>
                <CreateCarrierForm />
            </NavBarContainer>
        </Layout>,
        errorElement: <Layout>
            <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                <h1>Hubo un error inesperado, intente recargar la pagina.</h1>
            </div>
        </Layout>,
    },
    {
        path: "/create-restriction",
        element: <Layout> 
            <NavBarContainer navbarBlocked={false}>
                create restriction 
            </NavBarContainer>
        </Layout>,
        errorElement: <Layout>
            <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                <h1>Hubo un error inesperado, intente recargar la pagina.</h1>
            </div>
        </Layout>,
    },
]);


const CustomRouter = () => {
    return <RouterProvider router={router} />
}

export default CustomRouter;