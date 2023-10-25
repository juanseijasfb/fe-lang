import { useCallback, useEffect, useState } from "react";

import { 
    Box, Button, CircularProgress, MenuItem,
    Select, TextField, Typography 
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

// import { 
//     addDriverToDispatcher, 
//     getDriversList,
//     removeDriverFromDispatcher,
//     getDispatcherList 
// } from '@/services/ApiServices';

import TransferList from "@/components/transfer-list";
// import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { STATES_LIST } from "@/utils/constants";
import { Item, RestrictionPayload } from "@/types/types";
import { addRestrictions, getCitiesByState } from "@/services/ApiServices";
import { toast } from "react-toastify";

const RestrictStatesForDriversStepTwo = ({
    goBack,
    selectedStates,
    selectedDrivers,
}) => {
    const { t } = useTranslation();
    const { user } = useAuth0();
    const [fieldsData, setFieldsData] = useState({
        dispatcher: user?.email || "",
    });

    const [leftSide, setLeftSide] = useState<Item[]>(); // sin seleccionar
    const [rightSide, setRightSide] = useState<Item[]>([]); // drivers seleccionados

    const [isLoading, setIsLoading] = useState(false);

    const [loadingTransferList, setLoadingTransferList] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const getDriversRestrictions = async () => {
                const statesList = selectedStates.map((x) => x.value);

                let promisesArr: Promise<any>[] = [];

                statesList.forEach((state) => {
                    const promise = new Promise<Item[]>((resolve, reject) => {
                        return getCitiesByState({
                            state: state,
                        }).then((cityList) => {

                            const itemsMapped: Item[] = cityList.map((city) => {
                                return {
                                    id: crypto.randomUUID(),
                                    value: `${city}:${state}`,
                                };
                            })

                            console.log("itemsMapped", itemsMapped)

                            if(itemsMapped.length <= 0) {
                                toast.info(t("noResultsFound"));
                            }

                            resolve(itemsMapped);
                        })
                        .catch(() => {
                            reject()
                            return [];
                        })
                    });
                    promisesArr.push(promise);
                });

            Promise.all(promisesArr).then(() => {
                let newData: Item[] = [];
                promisesArr.forEach((prom) => {
                    prom.then((x) => {
                        console.log("prom",x);

                        newData.push(...x);
                    })
                })
                console.log(newData);


                setLeftSide(newData);

            }).finally(() => {
                setIsLoading(false);
            })
        
        }

        getDriversRestrictions();
    }, []);


    const nextStep = async () => {

        let restrictions: RestrictionPayload[] = [];

        selectedDrivers.forEach((x) => {
            const statesMapped = rightSide.map((y) => {
                const data =  {
                    subject: "D",
                    type: "CI", 
                    subjectValue: x?.value, 
                    typeValue: y?.value,
                    validUntil: "2099-12-31 00:00:00"
                };
               return data
            })

            restrictions.push(...statesMapped);
        })

        setIsLoading(true);

        await addRestrictions(restrictions)
        .then((res) => {
            if(res?.msg?.includes("err")){
                toast.error(t('errorWhenTryingToRestrictCities'));
                return;
            }
            setRightSide([])
            toast.success(t('citiesRestrictedSuccessfully'));
        }).catch(() => {
            toast.error(t('errorWhenTryingToRestrictCities'));
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    let fields = [
        {
            displayName: t('selectDriversToAddRestrictions'),
            linkedTo: 'driverToLink',
            fieldType: "transferList",
        },
    ];


    const renderFields = (field) => {
        if(isLoading) {
            return <CircularProgress  />
        }

        if(field.fieldType === "select") {
            return <>
                <Typography> {field.displayName} </Typography>
                <Select 
                    sx={{width:"30%"}} 
                    type={field.type} 
                    defaultValue={user?.email}
                    onChange={(e) => setFieldsData({
                        ...fieldsData,
                        [field.linkedTo]: e.target.value
                    })}
                >
                    {field.options.map((x) => <MenuItem key={x.id} value={x.value}> {x.value} </MenuItem>)}
                </Select>
            </>
        }

        if(field.fieldType === "transferList") {

            return <>
                <Typography> {field.displayName} </Typography>
                <TransferList 
                    disableAddAll
                    disabledForm={isLoading}
                    left={leftSide}
                    setLeft={setLeftSide}
                    right={rightSide}
                    setRight={setRightSide}
                    loading={loadingTransferList}
                    leftTitle={t('available')}
                    rightTitle={t('toLink')}
                />
            </>
        }

        // generic field
        return <>
            <Typography> {field.displayName} </Typography>
            <TextField sx={{width:"30%"}} type={field.type} 
            error={fieldsData[field.linkedTo] === ""}
            onChange={(e) => setFieldsData({
                ...fieldsData,
                [field.linkedTo]: e.target.value
            })}/>
        </>
    }

    return <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'50px', minHeight:"80vh"}}>
                       
        <Box sx={{
            display:'flex', 
            justifyContent:'flex-start', 
            width:"95%",
            position:"absolute", 
        }}>
            <Button onClick={goBack} variant={'outlined'} disabled={isLoading}>{t('goBack')}</Button>
        </Box>
                
        <h1 style={{fontSize:"30px", display:'flex', justifyContent:'center'}}>
            {t('selectCitiesToRestrict')}
        </h1>

        {fields.map((x, i) => <Box key={i} sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', width:"100%"}}>
            {renderFields(x)}
        </Box> )}
        {!loadingTransferList &&
            (
                <Button variant='outlined' sx={{width:"30%"}} onClick={() => nextStep()} disabled={isLoading}>
                    {t('confirmSelectionAndRestrict')}
                </Button>
            )
        }
    </Box>

}

export default RestrictStatesForDriversStepTwo;