import { useState } from "react";

import { 
    Box, Button, MenuItem,
    Select, TextField, Typography 
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

import TransferList from "@/components/transfer-list";
import { useTranslation } from "react-i18next";
import { STATES_LIST } from "@/utils/constants";
import { Item } from "@/types/types";
import { toast } from "react-toastify";

const RestrictCitiesForDriversStepTwo = ({
    goNext,
    goBack,
    setSelectedStates,
    prevSelection = []
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
    const [rightSide, setRightSide] = useState(prevSelection); // states seleccionados

    const nextStep = async () => {
        if(rightSide.length > 1) {
            toast.error(t("onlyOneState"))
            return;
        }
        setSelectedStates(rightSide);
        goNext();
    }

    let fields = [
        {
            displayName: t('selectDriversToAddRestrictions'),
            linkedTo: 'driverToLink',
            fieldType: "transferList",
        },
    ];


    const renderFields = (field) => {

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
                    disabledForm={false}
                    loading={false}
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
            <Button onClick={goBack} variant={'outlined'}>{t('goBack')}</Button>
        </Box>
        
        <h1 style={{fontSize:"30px", display:'flex', justifyContent:'center'}}>
            {t('selectStatesToGetCities')}
        </h1>

        {fields.map((x, i) => <Box key={i} sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', width:"100%"}}>
            {renderFields(x)}
        </Box> )}

        <Button variant='outlined' sx={{width:"30%"}} onClick={() => nextStep()} >
            {t('confirmSelectionAndContinue')}
        </Button>
    </Box>

}

export default RestrictCitiesForDriversStepTwo;