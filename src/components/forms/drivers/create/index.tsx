import { useEffect, useState } from "react";

import { 
    Box, Button, CircularProgress, MenuItem,
    Select, TextField, Typography 
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

import { useAppStore } from "@/store";
import { AppStore } from "@/types/storeTypes";

import { createDriver, getCarriersList } from '@/services/ApiServices';

const CreateDriverForm = () => {
    const [fieldsData, setFieldsData] = useState({
        firstName: "",
        lastName: "",
        mcNumber: "",
        maxWeight: 99999,
        carrierName: "",
        trailerType: "",
    });
  
    const { setSnackbar }: AppStore = useAppStore();

    const {user} = useAuth0();

    const [triedToCreate, setTriedtoCreate] = useState(false);
    const [isLoadingCarriers, setIsLoadingCarriers] = useState(false);
    const [carriers, setCarriers] = useState([]);
    const [carrierNames, setCarrierNames] = useState({});
    const [loading, setLoading] = useState(false);

    const tryCreateDriver = async () => {

        setLoading(true);
        const payload = {
            ...fieldsData
        };

        payload.carrierName = carrierNames[payload.mcNumber]
        const invalid = Object.values(payload).some((x) => String(x)?.trim() === "");

        if(invalid) {
            setLoading(false);
            setTriedtoCreate(true);
            setSnackbar({
                openSnackbar: true,
                message: "Debe llenar todos los campos antes de continuar",
                severity:"error",
            })
            return;
        }

        await createDriver(payload)
        .then(() => {
            if(!user?.email) {
                setSnackbar({
                    openSnackbar: true,
                    message: "Error al intentar obtener el mail del dispatcher a vincular",
                    severity:"error",
                })
                return;
            }

            setSnackbar({
                openSnackbar: true,
                message: "Driver creado correctamente",
                severity:"success",
                autoHide: 0,
            })

            setLoading(false);
            // el add driver no linkea mas a dispatcher.
            // linkDriverToDispatcher(res.driverId);
        })
        .catch(() => {
            setSnackbar({
                openSnackbar: true,
                message: "Hubo un error al intentar crear el driver",
                severity:"error",
                autoHide: 0,
            })
            setLoading(false);
        })
    }

    useEffect(() => {
        const getCarriers = async () => {
            const data = await getCarriersList().catch(() => {
                setSnackbar({
                    openSnackbar: true,
                    message: "Hubo un error al intentar obtener la lista de carriers.",
                    severity:"error",
                })
            });

            if(!data) {
                return;
            }

            const mappedInfo = data.map((x) => {
                return {
                    optionValue: String(x.MCNumber),
                    carrierName: x.carrier,
                    optionDisplayName: `${x.MCNumber} - ${x.carrier}`
                }
            })

            const util = {};

            data.forEach((x) => {
                util[x.MCNumber] = x.carrier
            })
           
            setCarriers(mappedInfo);
            setCarrierNames(util);
            setIsLoadingCarriers(false);
        }

        setIsLoadingCarriers(true);
        getCarriers();
    },[])

    const fields = [
        {
            displayName: "First Name",
            linkedTo: 'firstName',
            fieldType: "textField",
        },
        {
            displayName: "Last Name",
            linkedTo: 'lastName',
            fieldType: "textField",
        },
        {
            displayName: "MC",
            linkedTo: 'mcNumber',
            fieldType: "select", // select?
            options: carriers,
            isLoading: isLoadingCarriers,
            error: !fieldsData.mcNumber && triedToCreate,
        },
        {
            displayName: "Max Load Weight",
            linkedTo: 'maxWeight',
            fieldType: "textField",
            valueType:"number",
        },
        {
            displayName: "Trailer type",
            linkedTo: 'trailerType',
            fieldType: "select", // select?
            error: !fieldsData.trailerType && triedToCreate,
            options: [
                {
                    optionValue: "V",
                    optionDisplayName: "V",
                },
                {
                    optionValue: "F",
                    optionDisplayName: "F",
                },
                {
                    optionValue: "R",
                    optionDisplayName: "R",
                }
            ]
        },
    ];

    const renderFields = (field) => {

        if(field.isHidden) {
            return <></>
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
                        defaultValue={""}
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

        if(field.fieldType === "plainText") {
            return <>
            <Typography> {field.displayName} </Typography>
            <Typography sx={{fontWeight:'bold', fontSize:"24px"}}> {field.value} </Typography>
        </>
        }

        // generic field
        return <>
            <Typography> {field.displayName} </Typography>
            <TextField sx={{width:"30%"}} type={field.valueType} 
            error={fieldsData[field.linkedTo] === "" && triedToCreate}
            defaultValue={fieldsData[field.linkedTo]}
            onChange={(e) => setFieldsData({
                ...fieldsData,
                [field.linkedTo]: e.target.value
            })}/>
        </>
    }

    return <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'20px'}}>
        <h1>Create new driver form</h1>
        {fields.map((x, i) => {
            return <Box 
            key={i}
            sx={{width:"100%", display:'flex', flexDirection:'column', alignItems:'center', gap:'20px'}}> 
            {renderFields(x)} 
            </Box> 
        })}
       
       <Box sx={{paddingBottom: "10px"}}>
            {loading ? (<CircularProgress/>) : (
                <Button variant='outlined' onClick={tryCreateDriver}>Create driver</Button>
            )}
       </Box>
    </Box>

}

export default CreateDriverForm;