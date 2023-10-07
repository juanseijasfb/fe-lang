import { useEffect, useState } from "react";

import { 
    Box, Button, CircularProgress, MenuItem, 
    Select, TextField, Typography, Autocomplete
} from "@mui/material";

import { toast } from 'react-toastify';

import { getBrokerDetails, getCarriersList, addRestriction, addBroker } from '@/services/ApiServices';

import {STATES_LIST} from '@/utils/constants.js';

const AddCarrierRestrictionForm = () => {

    const [formSelected, setFormSelected] = useState("B");
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({});

    const [brokerMC, setBrokerMC] = useState("");
    const [debouncedBrokerMC, setDebouncedBrokerMC] = useState("");
    const [createNewbroker, setCreateNewBroker] = useState(false);

    const [restrictionPayLoad, setRestrictionPayLoad] = useState({
        subjectValue: "",
        typeValue: "",
        newBrokerName: "",
    });

    const [isLoadingBroker, setIsLoadingBroker] = useState(false);
    const [isLoadingCarriers, setIsLoadingCarriers] = useState(false);
    const [carriers, setCarriers] = useState([]);

    useEffect(() => {
        const getCarriers = async () => {
            const data = await getCarriersList().catch(() => {
                toast.error("Hubo un error al intentar obtener la lista de carriers.");
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
            setIsLoadingCarriers(false);
        }

        setIsLoadingCarriers(true);
        getCarriers();
    },[])

    useEffect(() => {

        if(brokerMC.trim() === "") {
            return;
        }

        setIsLoadingBroker(true);

        const timer = setTimeout(() => {

            const getBrokerInfo = async () => {
                setRestrictionPayLoad({...restrictionPayLoad, newBrokerName: ""})
                setCreateNewBroker(false);
                await getBrokerDetails(brokerMC)
                    .then((res) => {
                        setRestrictionPayLoad({...restrictionPayLoad, typeValue: brokerMC});
                        
                        setIsLoadingBroker(false);
                        if(res?.CompanyName) {
                            setDebouncedBrokerMC(res?.CompanyName);

                            toast.success("Broker obtenido correctamente.");
                        } else {
                            setDebouncedBrokerMC("");
                            setCreateNewBroker(true);

                            toast.error(`No se encontraron brokers para el MC '${brokerMC}' `);
                        }
                    })
                    .catch(() => {
                        toast.error("Hubo un error al intentar obtener el broker.");
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            }

            getBrokerInfo();
        }, 1000);

        return () => clearTimeout(timer);
    },[brokerMC]);

    const centerStyleProps = {display:'flex', flexDirection:'column', alignItems:'center', width:"100%", marginBottom:"20px"};

    const renderFields = (field) => {
      if(field.isHidden) {
          return <></>
      }

      if(field.isLoading){
        return <CircularProgress />
      }

      if(field.fieldType === "selectFormType") {
        return <Box sx={centerStyleProps}>
            <Typography sx={{fontWeight:"bold"}}>Seleccione el tipo de formulario de restricción</Typography>
            <Select defaultValue={formSelected} onChange={(e) => {
                setFormSelected(e.target.value)
                // we clear the previous info...
                setFormData({});
            }}>
                {/* <MenuItem value="ST">State</MenuItem>
                <MenuItem value="CI">City</MenuItem> */}
                <MenuItem value="B">Broker</MenuItem>
            </Select>
        </Box>
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
                    onChange={(e) =>  {

                        if(!field?.onChange) {
                            return;
                        }

                        field.onChange(e.target.value);
                    }}
                >
                    {field.options.map((x, i) => <MenuItem key={i} value={x.optionValue}> {x.optionDisplayName} </MenuItem>)}
                </Select>
                )
            }
        </>
      }

      if(field.fieldType === "autoComplete") {
        return <>
          <Typography> {field.displayName} </Typography>
          <Autocomplete
            disablePortal
            disabled={field.disabled}
            options={ field.options }
            sx={{ width: "30%" }}
            value={formData[field.linkedTo]}
            onChange={(e:any) => {
                setFormData({
                    ...formData,
                    [field.linkedTo]: e.target.textContent
                });
            }}
            renderInput={(params) => <TextField {...params} />}
        />
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
          <TextField sx={{width:"30%"}} type={field.fieldType} 
            // error={triedToCreate} 
             onChange={(e) => field.onChange(e)} 
          />
      </>
    }

    const handleAddRestriction = async () => {
                            
        const payload = {
            subject: "C", 
            type: formSelected, // B 
            subjectValue: restrictionPayLoad.subjectValue, // carrierMC
            typeValue: restrictionPayLoad.typeValue, // brokerMC
        };

        await addRestriction(payload)
        .then((res) => {

            // si hubo un error, no lo agrego al tree.
            if(res?.msg?.indexOf("ok") === -1){
                toast.error(`Hubo un error al intentar restringir "${payload.typeValue}"`);
                setLoading(false);
                return;
            }

            toast.success(`"${restrictionPayLoad.typeValue}" ha sido restringido.`);
            setLoading(false);
        }).catch(() => {
            toast.error(`Hubo un error al intentar restringir "${payload.typeValue}"`);
            setLoading(false);
        })
    }
  
    const addCarrierRestriction = async () => {
        if(formSelected !== "B"){
            //     message: `Under development`,
            return;
        }

        setLoading(true);

        if(createNewbroker && restrictionPayLoad.newBrokerName.length > 0) {
            toast.error(`Creando broker...`)
           
            await addBroker({ MCNumber: restrictionPayLoad.typeValue , brokerName: restrictionPayLoad.newBrokerName })
                .then((res) => {

                    // si hubo un error, no lo agrego al tree.
                    if(res?.msg?.indexOf("ok") === -1){
                        toast.error( `Hubo un error al intentar crear el broker "${restrictionPayLoad.typeValue}"`)
                        setLoading(false);
                        return;
                    } 

                    toast.success(`Broker creado con exito.`)
                    handleAddRestriction()

                }).catch(() => {
                    toast.error( `Hubo un error al intentar crear el broker "${restrictionPayLoad.typeValue}"`)
                    setLoading(false)
                })


            return;
        } 

        handleAddRestriction()
    }

    const renderFormSelected = () => {

        let fields: any = [];
        switch (formSelected) {
            case "ST":
                fields = [
                    {
                        displayName: "Carrier a asignar la restricción",
                        linkedTo: 'carrierToAddRestriction',
                        fieldType: "select",
                        // error: !fieldsData.trailerType && triedToCreate,
                        options: carriers,
                        isLoading: isLoadingCarriers,
                        onChange: (val: string) => {
                            setRestrictionPayLoad({...restrictionPayLoad, subjectValue: val})
                        }
                    },
                    {fieldType: "selectFormType"},
                    {
                        displayName: "State",
                        linkedTo: 'selectedState',
                        fieldType: "autoComplete",
                        options: STATES_LIST
                    },
                ];

                break;
            case "CI":
                fields = [
                    {
                        displayName: "Carrier a asignar la restricción",
                        linkedTo: 'carrierToAddRestriction',
                        fieldType: "select",
                        // error: !fieldsData.trailerType && triedToCreate,
                        options: carriers,
                        isLoading: isLoadingCarriers,
                        onChange: (val: string) => {
                            setRestrictionPayLoad({...restrictionPayLoad, subjectValue: val})
                        }
                    },
                    {fieldType: "selectFormType"},
                    {
                        displayName: "State",
                        linkedTo: 'selectedState',
                        fieldType: "autoComplete",
                        options: STATES_LIST
                    },
                    {
                        displayName: "City",
                        linkedTo: 'selectedCity',
                        fieldType: "autoComplete",
                        options: []
                    },
                ];
                break;
            case "B":

                fields = [
                    {
                        displayName: "Carrier a asignar la restricción",
                        linkedTo: 'carrierToAddRestriction',
                        fieldType: "select",
                        // error: !fieldsData.trailerType && triedToCreate,
                        options: carriers,
                        isLoading: isLoadingCarriers,
                        onChange: (val: string) => {
                            setRestrictionPayLoad({...restrictionPayLoad, subjectValue: val})
                        }
                    },
                    {fieldType: "selectFormType"},
                    {
                        displayName: "Broker MC",
                        linkedTo: 'bokerMC',
                        fieldType: "number",
                        // error: !fieldsData.trailerType && triedToCreate,
                        onChange: (e) => {
                            setBrokerMC(e.target.value);
                        }
                    },
                    {
                        displayName: "Broker Name",
                        linkedTo: 'brokerName',
                        fieldType: "plainText",
                        value: debouncedBrokerMC,
                        isLoading: isLoadingBroker,
                        isHidden: debouncedBrokerMC === "",
                    },
                    {
                        displayName: "New broker name",
                        linkedTo: 'newBrokerName',
                        fieldType: "text",
                        value: restrictionPayLoad.newBrokerName,
                        onChange: (e) => {
                            setRestrictionPayLoad({...restrictionPayLoad, newBrokerName: e.target.value})
                        },
                        isHidden: !createNewbroker,
                        isLoading: isLoadingBroker,
                    },
                ];
                break;
            default:
                break;
        }

        return fields.map((x) =>  {

            return <Box key={x.linkedTo} sx={{...centerStyleProps}}>
                {renderFields(x)}
            </Box>
        });
    }

  

    return <Box sx={centerStyleProps}>
      <h1>Agregar nueva restricción de carrier</h1>


        {renderFormSelected()}
        
        
        {loading ? (<CircularProgress/>) : (
            <Button variant='outlined' sx={{width:"30%"}} onClick={addCarrierRestriction} disabled={isLoadingBroker || isLoadingCarriers}>
                Add carrier restriction
            </Button>
        )}
    </Box>

}

export default AddCarrierRestrictionForm;