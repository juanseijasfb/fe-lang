import { useState } from "react";

import { 
    Box, Button, CircularProgress, MenuItem,
    Select, TextField, Typography 
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

import { 
    addMultipleRestrictions
} from '@/services/ApiServices';

import TransferList from "@/components/transfer-list";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { STATES_LIST } from "@/utils/constants";
import { Item, RestrictionPayload } from "@/types/types";

const RestrictStatesForDriversStepTwo = ({
    selectedUsers,
    goBack
}) => {
    const { t } = useTranslation();
    const { user } = useAuth0();
    const [fieldsData, setFieldsData] = useState({
        dispatcher: user?.email || "",
    });

    const mappedStates = STATES_LIST.map((x, i) => {
        return {
            id: i,
            value: x,
        }
    })

    const [leftSide, setLeftSide] = useState<Item[]>(mappedStates); // sin seleccionar
    const [rightSide, setRightSide] = useState<Item[]>([]); // drivers seleccionados


    const [isLoading, setIsLoading] = useState(false);

    const nextStep = async () => {

        let restrictions: RestrictionPayload[] = [];

        selectedUsers.forEach((x) => {
            const statesMapped = rightSide.map((y) => {
                const data =  {
                    subject: "D",
                    type: "ST", 
                    subjectValue: x?.value, 
                    typeValue: y?.value,
                    validUntil: "2099-12-31 00:00:00"
                };
               return data
            })

            restrictions.push(...statesMapped);
        })



        setIsLoading(true);

        await addMultipleRestrictions(restrictions)
        .then(() => {
            toast.success(t('statesRestrictedSuccessfully'));
        }).catch(() => {
            toast.error(t('errorWhenTryingToRestrictState'));
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    let fields = [
        {
            displayName: t('selectStatesToRestrict'),
            linkedTo: 'driverToLink',
            fieldType: "transferList",
        },
    ];


    const renderFields = (field) => {

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
                    leftTitle={t('available')}
                    rightTitle={t('toLink')}
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

export default RestrictStatesForDriversStepTwo;