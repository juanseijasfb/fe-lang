import { useEffect, useState } from "react";

import { 
    Box, Button, CircularProgress, MenuItem,
    Select, TextField, Typography 
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";


import { editDriver, getCarriersList } from '@/services/ApiServices';

import { toast } from "react-toastify";

const EditDriverForm = (preloadData) => {
    const [triedToCreate, setTriedtoCreate] = useState(false);
    const [isLoadingCarriers, setIsLoadingCarriers] = useState(false);
    const [carriers, setCarriers] = useState([]);
    const [carrierNames, setCarrierNames] = useState({});
    const [loading, setLoading] = useState(false);

    const [fieldsData, setFieldsData] = useState({
        firstName: preloadData?.FirstName || "",
        lastName: preloadData?.LastName || "",
        mcNumber: String(preloadData?.MCNumber) || "",
        email: preloadData?.email || "",
        carrierName: preloadData?.Carrier || "",
        trailerType: preloadData?.Equipment || "",
        maxWeight: preloadData?.maxWeight || "",
    });


    const updateDriver = async () => {

        setLoading(true);
        const payload = {
            ...fieldsData
        };

        payload.carrierName = carrierNames[payload.mcNumber]
        
       
        const invalid = Object.values(payload).some((x) => x.toString().trim() === "");

        if(invalid) {
            setLoading(false);
            setTriedtoCreate(true);
            toast.error("Debe llenar todos los campos antes de continuar")
            return;
        }

        await editDriver(payload)
        .then(() => {
            toast.success("Driver actualizado correctamente")
        })
        .catch(() => {
            toast.error("Hubo un error al intentar actualizar el driver")
            setLoading(false);
        })
    }

    useEffect(() => {
        const getCarriers = async () => {
            const data = await getCarriersList().catch(() => {
                toast.error("Hubo un error al intentar obtener la lista de carriers")
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
            fieldType: "plainText",
            value: fieldsData.firstName,
        },
        {
            displayName: "Last Name",
            linkedTo: 'lastName',
            fieldType: "plainText",
            value: fieldsData.lastName,
        },
        {
            displayName: "Email",
            linkedTo: 'email',
            fieldType: "textField",
        },
        {
            displayName: "MC",
            linkedTo: 'mcNumber',
            fieldType: "select", // select?
            options: carriers,
            isLoading: isLoadingCarriers,
            error: !fieldsData.mcNumber && triedToCreate,
            value: fieldsData.mcNumber,
        },
        {
            displayName: "Max Load Weight",
            linkedTo: 'maxWeight',
            fieldType: "textField",
            valueType:"number",
            value: fieldsData.maxWeight,
        },
        {
            displayName: "Trailer type",
            linkedTo: 'trailerType',
            fieldType: "select", // select?
            error: !fieldsData.trailerType && triedToCreate,
            value: fieldsData.trailerType,
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
                    defaultValue={field.value || fieldsData[field.linkedTo]}
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
            <Typography sx={{fontWeight:'bold', fontSize:"24px"}}> {field.value || fieldsData[field.linkedTo]} </Typography>
        </>
        }

        // generic field
        return <>
            <Typography> {field.displayName} </Typography>
            <TextField sx={{width:"30%"}} type={field.fieldType} 
            error={fieldsData[field.linkedTo] === "" && triedToCreate}
            value={fieldsData[field.linkedTo]}
            onChange={(e) => setFieldsData({
                ...fieldsData,
                [field.linkedTo]: e.target.value
            })}/>
        </>
    }

    return <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'20px'}}>
        <h1>Edit driver form</h1>
        {fields.map((x, i) => {
            return <Box 
            key={i}
            sx={{width:"100%", display:'flex', flexDirection:'column', alignItems:'center', gap:'20px'}}> 
            {renderFields(x)} 
            </Box> 
        })}
       
       <Box sx={{paddingBottom: "10px"}}>
            {loading ? (<CircularProgress/>) : (
                <Button variant='outlined' onClick={updateDriver}>Update driver</Button>
            )}
       </Box>
    </Box>

}

export default EditDriverForm;