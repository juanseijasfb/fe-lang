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
import AddDispatcherForm from "@/components/forms/dispatchers/create";

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
            <CreateDriverForm />
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
            <CreateCarrierForm />
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
                create restriction 
        </Layout>,
        errorElement: <Layout>
            <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                <h1>Hubo un error inesperado, intente recargar la pagina.</h1>
            </div>
        </Layout>,
    },
    {
        path: "/create-dispatcher",
        element: <Layout> 
            <AddDispatcherForm /> 
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