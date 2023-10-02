import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import '@/index.css'

import App from '@/App.tsx'
import Layout from '@/Layout';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout>
            <App />
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