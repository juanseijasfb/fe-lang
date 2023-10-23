import { useEffect, useState } from "react";

import { 
    Box, Button, CircularProgress, MenuItem,
    Select, TextField, Typography 
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

import { 
    addDriverToDispatcher, 
    getDriversList,
    removeDriverFromDispatcher,
    getDispatcherList 
} from '@/services/ApiServices';

import TransferList from "@/components/transfer-list";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { STATES_LIST } from "@/utils/constants";
import { Item } from "@/types/types";

const RestrictStatesForDriversStepTwo = ({
    selectedUsers,
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
    const [rightSide, setRightSide] = useState([]); // drivers seleccionados


    const [isLoading, setIsLoading] = useState(false);

    const [loadingTransferList, setLoadingTransferList] = useState(false);

    const linkDrivers = async () => {
        const payload = {
            dispatcher: fieldsData.dispatcher,
            driversList: rightSide.map((x: {id: number, value: string}) => x.id).join(","),
        };

        await addDriverToDispatcher(payload)
        .then(() => {
            toast.success(`${t('driversLinkedSuccessfully')}`);
        }).catch(() => {
            toast.error(`${t('errorTryingToLink')}`);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const nextStep = async () => {
        // setIsLoading(true);
        // const payload = {
        //     dispatcher: fieldsData.dispatcher,
        //     driversList: leftSide.map((x: {id: number, value: string}) => x.id).join(","),
        // };

        // await removeDriverFromDispatcher(payload)
        // .then(() => {
        //     linkDrivers();
        // }).catch(() => {
        //     setIsLoading(false);
        //     toast.error(`${t('errorTryingToUnlink')}`);
        // })
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