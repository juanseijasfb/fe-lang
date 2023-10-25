import { useEffect, useState } from "react";

import { 
    Box,
    Button, 
    CircularProgress,
    MenuItem,
    Select, 
    TextField, 
    Typography 
} from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

import { 
    getDriversList,
    getDispatcherList 
} from '@/services/ApiServices';

import TransferList from "@/components/transfer-list";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const BatchSelectDrivers = ({
    leftSide, setLeftSide,
    rightSide, setRightSide,
    availableDispatchers, setAvailableDispatchers,
    parentCb, filterListOnGoBack,
    disableComponent = false
}) => {
    const { t } = useTranslation();
    const { user } = useAuth0();
    const [fieldsData, setFieldsData] = useState({
        dispatcher: user?.email || "",
    });

    const [loadingTransferList, setLoadingTransferList] = useState(true);
    const [loadingDispatchers, setLoadingDispatchers] = useState(true);

    useEffect(() => {
        const getAvailableDispatchers = async () => {

            const dispatchers = await getDispatcherList().catch(() => {
                toast.error(`${t('errorRetrievingDispatcherList')}`);
                setLoadingDispatchers(false);
            });

            if(!dispatchers) {
                setLoadingDispatchers(false);
                return;
            }

            // aqui podrimos filtrar si esta enabled o no?
            const list = dispatchers?.map((x) => {
                return {
                    id: x.dispatcherId,
                    value: x.dispatcher
                }
            })

            setAvailableDispatchers(list)
            setLoadingDispatchers(false);
        }

        getAvailableDispatchers();
    }, []);

    useEffect(() => {
        setLoadingTransferList(true);
        const fetchDrivers = async () => {
            let driversList = await getDriversList().catch(() => {
               
                toast.error(`${t('errorTryingToGetDrivers')}`);
                setLoadingTransferList(false);
            });

            const fullDriverList = driversList.map((x) => {
                return {
                    id: x.driverId,
                    value: x.fullName,
                }
            });

            if(filterListOnGoBack) {
                const rightSideIds = rightSide.map((x) => x.id);
                const fullDriverListFiltered = [...fullDriverList].filter((x) => !rightSideIds.includes(x.id))
                setLeftSide(fullDriverListFiltered);
            } else {
                setLeftSide(fullDriverList);
            }
            
            setLoadingTransferList(false);
        }

        fetchDrivers();
    }, [fieldsData.dispatcher]);

    const nextStep = async () => {

        if(rightSide.length <= 0){
            toast.error(t('mustSelectDriverToContinue'));
            return;
        }
        parentCb();
    }

    let fields = [
        {
            displayName: "Dispatcher",
            linkedTo: 'dispatcher',
            fieldType: "select",
            options: availableDispatchers
        },
        {
            displayName: t('selectDriversToOpperate'),
            linkedTo: 'driverToLink',
            fieldType: "transferList",
        },
    ];


    const renderFields = (field) => {
        if(loadingDispatchers) {
            return <CircularProgress  />
        }

        if(field.fieldType === "select") {
            return <>
                <Typography sx={{ fontWeight:'bold' }}> {field.displayName} </Typography>
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
                <Typography sx={{ fontWeight:'bold' }}> {field.displayName} </Typography>
                <TransferList 
                    disabledForm={disableComponent}
                    left={leftSide}
                    setLeft={setLeftSide}
                    right={rightSide}
                    setRight={setRightSide}
                    loading={loadingTransferList}
                    leftTitle={t('available')}
                    rightTitle={t('selected')}
                />
            </>
        }

        // generic field
        return <>
            <Typography sx={{ fontWeight:'bold' }}> {field.displayName} </Typography>
            <TextField sx={{ width:"30%" }} type={field.type} 
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
                <Button variant='outlined' sx={{width:"30%"}} onClick={() => nextStep()} disabled={disableComponent}>
                    {t('confirmSelectionAndContinue')}
                </Button>
            )
        }
    </Box>

}

export default BatchSelectDrivers;