import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import '@/index.css'

import App from '@/App.tsx'
import Layout from '@/Layout';

import CreateDriverForm from "@/components/forms/drivers/create";
import CreateCarrierForm from "@/components/forms/carriers/create";
import AddDispatcherForm from "@/components/forms/dispatchers/create";
import AddCarrierRestrictionForm from "@/components/forms/carriers/restrictions/add";
import DeleteDispatcherForm from "@/components/forms/dispatchers/delete";
import DeleteDriverForm from "@/components/forms/drivers/delete";
import DeleteCarrierForm from "@/components/forms/carriers/delete";
import RemoveCarrierRestrictionForm from "@/components/forms/carriers/restrictions/delete";

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
        path: "/create/driver",
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
        path: "/create/carrier",
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
        path: "/create/carrier/restriction",
        element: <Layout> 
            <AddCarrierRestrictionForm />
        </Layout>,
        errorElement: <Layout>
            <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                <h1>Hubo un error inesperado, intente recargar la pagina.</h1>
            </div>
        </Layout>,
    },
    {
        path: "/create/restriction",
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
        path: "/create/dispatcher",
        element: <Layout> 
            <AddDispatcherForm /> 
        </Layout>,
        errorElement: <Layout>
            <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                <h1>Hubo un error inesperado, intente recargar la pagina.</h1>
            </div>
        </Layout>,
    },
    {
        path: "/delete/dispatcher",
        element: <Layout> 
            <DeleteDispatcherForm /> 
        </Layout>,
        errorElement: <Layout>
            <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                <h1>Hubo un error inesperado, intente recargar la pagina.</h1>
            </div>
        </Layout>,
    },
    {
        path: "/delete/driver",
        element: <Layout> 
            <DeleteDriverForm /> 
        </Layout>,
        errorElement: <Layout>
            <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                <h1>Hubo un error inesperado, intente recargar la pagina.</h1>
            </div>
        </Layout>,
    },
    {
        path: "/delete/carrier",
        element: <Layout> 
            <DeleteCarrierForm /> 
        </Layout>,
        errorElement: <Layout>
            <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                <h1>Hubo un error inesperado, intente recargar la pagina.</h1>
            </div>
        </Layout>,
    },
    {
        path: "/delete/carrier/restriction",
        element: <Layout> 
            <RemoveCarrierRestrictionForm /> 
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