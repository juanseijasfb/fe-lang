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
import ErrorComponent from "@/components/errorComponent";
import LinkToDispatcherForm from "@/components/forms/dispatchers/link-to-dispatcher-form";
import RestrictStatesForDriversStepOne from "@/components/forms/drivers/restrictions/states/add-multiple/step-1";
import RemoveStatesRestrictionsForDrivers from "@/components/forms/drivers/restrictions/states/remove-multiple/step-1";
import RestrictCitiesForDriversStepOne from "@/components/forms/drivers/restrictions/cities/add-multiple/step-1";
import RemoveCitiesRestrictionsForDrivers from "@/components/forms/drivers/restrictions/cities/remove-multiple/step-1";
import AcceptNewDriver from "@/components/forms/drivers/acceptNewDriver";
import EditDriverWrapper from "@/components/forms/drivers/edit";
import DisableDrivers from "@/components/forms/drivers/disable";
import EnableDrivers from "@/components/forms/drivers/enable";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout> <App /> </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>,
    },
    {
        path: "/create/driver",
        element: <Layout> 
            <CreateDriverForm />
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>,
    },
    {
        path: "/create/carrier",
        element: <Layout> 
            <CreateCarrierForm />
        </Layout>,
        errorElement: <Layout>
           <ErrorComponent />
        </Layout>,
    },
    {
        path: "/create/carrier/restriction",
        element: <Layout> 
            <AddCarrierRestrictionForm />
        </Layout>,
        errorElement: <Layout>
        </Layout>,
    },
    {
        path: "/create/restriction",
        element: <Layout> 
                create restriction 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>,
    },
    {
        path: "/create/dispatcher",
        element: <Layout> 
            <AddDispatcherForm /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>,
    },
    {
        path: "/delete/dispatcher",
        element: <Layout> 
            <DeleteDispatcherForm /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>,
    },
    {
        path: "/delete/driver",
        element: <Layout> 
            <DeleteDriverForm /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>,
    },
    {
        path: "/delete/carrier",
        element: <Layout> 
            <DeleteCarrierForm /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
    {
        path: "/delete/carrier/restriction",
        element: <Layout> 
            <RemoveCarrierRestrictionForm /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
    {
        path: "/link/driver-dispatcher",
        element: <Layout> 
            <LinkToDispatcherForm /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
    {
        path: "/restrcitions/add/driver/state",
        element: <Layout> 
            <RestrictStatesForDriversStepOne /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
    {
        path: "/restrcitions/remove/driver/state",
        element: <Layout> 
            <RemoveStatesRestrictionsForDrivers /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
    {
        path: "/restrcitions/add/driver/city",
        element: <Layout> 
            <RestrictCitiesForDriversStepOne /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
    {
        path: "/restrcitions/remove/driver/city",
        element: <Layout> 
            <RemoveCitiesRestrictionsForDrivers /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
    {
        path: "/accept/driver",
        element: <Layout> 
            <AcceptNewDriver /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
    {
        path: "/edit/driver",
        element: <Layout> 
            <EditDriverWrapper /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
    {
        path: "/disable/driver",
        element: <Layout> 
            <DisableDrivers /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
    {
        path: "/enable/driver",
        element: <Layout> 
            <EnableDrivers /> 
        </Layout>,
        errorElement: <Layout>
            <ErrorComponent />
        </Layout>, 
    },
]);


const CustomRouter = () => {
    return <RouterProvider router={router} />
}

export default CustomRouter;