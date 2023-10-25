import { useEffect, useState } from "react";

import { 
    Box, Button, CircularProgress, MenuItem,
    Select, TextField, Typography 
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

import { 
    getRestrictions,
    removeRestrictions
} from '@/services/ApiServices';

import TransferList from "@/components/transfer-list";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Item } from "@/types/types";

const RemoveRestrictStatesForDriversStepTwo = ({
    selectedUsers,
    goBack
}) => {
    const { t } = useTranslation();
    const { user } = useAuth0();
    const [fieldsData, setFieldsData] = useState({
        dispatcher: user?.email || "",
    });

    const [leftSide, setLeftSide] = useState<Item[]>([]); // sin seleccionar
    const [rightSide, setRightSide] = useState<Item[]>([]); // drivers seleccionados

    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        setIsLoading(true);
        const getDriversRestrictions = async () => {
                let promisesArr: Promise<any>[] = [];

                selectedUsers.forEach((x) => {
                    const promise = new Promise<Item[]>((resolve, reject) => {
                        return getRestrictions({
                            carrier: "",
                            driverName: x.value,
                        }).then((result) => {

                            const filtered = result.filter((z) => z.Type === "ST");
                            const itemsMapped: Item[] = filtered.map((states) => {
                                const name = `${states.TypeValue} - ${x.value}`;
                                return {
                                    id: crypto.randomUUID(),
                                    value: name,
                                    metadata: {
                                        driver: x.value,
                                        state: states.TypeValue,
                                        fullStateName: states.TypeValue,
                                    },
                                };
                            })

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
                        console.log("items", x);
                        newData.push(...x);
                    })
                })

                setLeftSide(newData);

            }).finally(() => {
                setIsLoading(false);
            })
        
        }

        getDriversRestrictions();
    }, []);

    const nextStep = async () => {

        if(rightSide.length <= 0){
            toast.error(t("mustSelectRestrictionToRemove"));
            return;
        }

        const payload = rightSide.map((x) => {
            const data =  {
                subject: "D",
                type: "ST", 
                subjectValue: x?.metadata?.driver, 
                typeValue: x?.metadata?.state
            };
            return data
        })

        console.log(payload);

        setIsLoading(true);

        await removeRestrictions(payload)
        .then(() => {
            toast.success(t('restrictionsRemovedSuccessfully'));
        }).catch(() => {
            toast.error(t('errorWhenTryingToRemoveRestrictions'));
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    let fields = [
        {
            displayName: t('selectRestrictionsToRemove'),
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
                <Typography sx={{fontWeight:'bold'}}> {field.displayName} </Typography>
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
                <Typography sx={{fontWeight:'bold'}}> {field.displayName} </Typography>
                <TransferList 
                    disabledForm={isLoading}
                    left={leftSide}
                    setLeft={setLeftSide}
                    right={rightSide}
                    setRight={setRightSide}
                    loading={isLoading}
                    leftTitle={t('existentRestrictions')}
                    rightTitle={t('restrictionsToRemove')}
                />
            </>
        }

        // generic field
        return <>
            <Typography sx={{fontWeight:'bold'}}> {field.displayName} </Typography>
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

        {fields.map((x, i) => <Box key={i} sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', width:"100%"}}>
            {renderFields(x)}
        </Box> )}
        
        <Button variant='outlined' sx={{width:"30%"}} onClick={() => nextStep()} disabled={isLoading}>
            {t('confirmSelectionAndRestrict')}
        </Button>
    </Box>

}

export default RemoveRestrictStatesForDriversStepTwo;