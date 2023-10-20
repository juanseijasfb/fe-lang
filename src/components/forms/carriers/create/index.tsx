import { useState } from "react";

import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

import { addCarrier } from '@/services/ApiServices';
import { toast } from "react-toastify";

const AddCarrierForm = () => {
    const [fieldsData, setFieldsData] = useState({
        mcNumber: "",
        carrierName: "",
    });

    const {user} = useAuth0();

    const [triedToCreate, setTriedtoCreate] = useState(false);
    const [loading, setLoading] = useState(false);

    const createCarrier = async () => {

        setLoading(true);
        const payload = {
            ...fieldsData
        };

        const invalid = Object.values(payload).some((x) => x.trim() === "");

        if(invalid) {
            setLoading(false);
            setTriedtoCreate(true);
            toast.error("Debe llenar todos los campos antes de continuar")
            return;
        }

        await addCarrier(payload)
        .then(() => {
            if(!user?.email) {
                toast.error("Error al intentar crear el carrier")
                return;
            }

            toast.success("Carrier creado correctamente")
            setLoading(false);
        })
        .catch(() => {
            toast.error("Hubo un error al intentar crear el carrier")
            setLoading(false);
        })
    }

    const fields = [
        {
            displayName: "Carrier Name",
            linkedTo: 'carrierName',
            fieldType: "textField",
        },
        {
            displayName: "MC number",
            linkedTo: 'mcNumber',
            fieldType: "textField",
        },
    ];

    const renderFields = (field) => {

        if(field.isHidden) {
            return <></>
        }

        if(field.fieldType === "plainText") {
            return <>
            <Typography> {field.displayName} </Typography>
            <Typography sx={{fontWeight:'bold', fontSize:"24px"}}> {field.value} </Typography>
        </>
        }

        // generic field
        return <>
            <Typography> {field.displayName} </Typography>
            <TextField sx={{width:"30%"}} type={field.fieldType} 
            error={fieldsData[field.linkedTo] === "" && triedToCreate}
            onChange={(e) => setFieldsData({
                ...fieldsData,
                [field.linkedTo]: e.target.value
            })}/>
        </>
    }

    return <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', height: "80vh"}}>
        <h1 style={{fontSize:"30px"}}>Create new carrier form</h1>
        {fields.map((x, i) => {
            return <Box 
                key={i}
                sx={{width:"100%", display:'flex', flexDirection:'column', alignItems:'center', gap:'20px'}}> 
                {renderFields(x)} 
            </Box> 
        })}
       
       {loading ? (<CircularProgress/>) : (
           <Button variant='outlined' sx={{width:"30%"}} onClick={createCarrier}>Create carrier</Button>
       )}
    </Box>

}

export default AddCarrierForm;