import { useState } from "react";

import { Box, Button, Checkbox, CircularProgress, MenuItem, Select, TextField, Typography } from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

import { useAppStore } from "@/store";
import { AppStore } from "@/types/storeTypes";

import { deleteDispatcher } from '@/services/ApiServices';
import { toast } from "react-toastify";

const DeleteDriverForm = () => {
    const [fieldsData, setFieldsData] = useState({
        driverEmail: "",
    });

    const { setSnackbar }: AppStore = useAppStore();
    const {user} = useAuth0();

    const [triedToDelete, setTriedToDelete] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDeleteDriver = async () => {

        toast.info("Delete driver no existe en postman")
        return;
        setLoading(true);
        const payload = {
            ...fieldsData
        };

        const invalid = Object.values(payload).some((x) => String(x).trim() === "");

        if(invalid) {
            setLoading(false);
            setTriedToDelete(true);
            setSnackbar({
                openSnackbar: true,
                message: "Debe llenar todos los campos antes de continuar",
                severity:"error",
            })
            return;
        }

        await deleteDispatcher()
        .then(() => {
            if(!user?.email) {
                setSnackbar({
                    openSnackbar: true,
                    message: "Error al intentar borrar el dispatcher",
                    severity:"error",
                })
                return;
            }

            setSnackbar({
                openSnackbar: true,
                message: "Dispatcher creado correctamente",
                severity:"success",
                autoHide: 0,
            })

            setLoading(false);
        })
        .catch(() => {
            setSnackbar({
                openSnackbar: true,
                message: "Hubo un error al intentar crear el dispatcher",
                severity:"error",
                autoHide: 0,
            })
            setLoading(false);
        })
    }

    const fields = [
        {
            displayName: "Driver Email",
            linkedTo: 'driverEmail',
            fieldType: "textField",
        },
    ];

    const renderFields = (field) => {

        if(field.isHidden) {
            return <></>
        }

        if(field.fieldType === "checkbox") {
            return <Box sx={{ display:'flex', alignItems: 'center', justifyContent:'center'}}>
            <Typography> {field.displayName} </Typography>
            <Checkbox defaultChecked={field.value} 
                onChange={(e) => setFieldsData({
                    ...fieldsData,
                    [field.linkedTo]: e.target.value
                })}
            />
        </Box>
        }

        if(field.fieldType === "plainText") {
            return <>
            <Typography> {field.displayName} </Typography>
            <Typography sx={{fontWeight:'bold', fontSize:"24px"}}> {field.value} </Typography>
        </>
        }

        if(field.fieldType === "select") {
            return <>
                <Typography> {field.displayName} </Typography>
            
                {
                    field.isLoading ? (
                        <CircularProgress />
                    ) : (
                    <Select 
                        sx={{width:"30%"}} 
                        type={field.fieldType} 
                        defaultValue={fieldsData[field.linkedTo]}
                        error={field.error}
                        onChange={(e) => setFieldsData({
                            ...fieldsData,
                            [field.linkedTo]: e.target.value
                        })}
                    >
                        {field.options.map((x, i) => <MenuItem 
                            key={i} 
                            value={x.optionValue}> 
                                {x.optionDisplayName} 
                        </MenuItem>)}
                    </Select>
                    )
                }
            </>
        }
        // generic field
        return <>
            <Typography> {field.displayName} </Typography>
            <TextField sx={{width:"30%"}} type={field.fieldType} 
            error={fieldsData[field.linkedTo] === "" && triedToDelete}
            defaultValue={fieldsData[field.linkedTo]}
            onChange={(e) => setFieldsData({
                ...fieldsData,
                [field.linkedTo]: e.target.value
            })}/>
        </>
    }

    return <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', height: "80vh"}}>
        <h1 style={{fontSize:"30px"}}>Delete driver</h1>
        {fields.map((x, i) => {
            return <Box 
                key={i}
                sx={{width:"100%", display:'flex', flexDirection:'column', alignItems:'center', gap:'20px'}}> 
                {renderFields(x)} 
            </Box> 
        })}
       
       {loading ? (<CircularProgress/>) : (
           <Button variant='outlined' sx={{width:"30%"}} onClick={handleDeleteDriver}>Delete driver</Button>
       )}
    </Box>

}

export default DeleteDriverForm;