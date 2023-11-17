import useBatchSelection from "@/hooks/useBatchUserSelection";
import { getEnabledDrivers, postDisableDrivers } from "@/services/ApiServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const DisableDrivers = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const {
        rightSide,
        setLeftSide,
        setRightSide,
        renderDriverSelection
    } = useBatchSelection({
        parentCb: () => handleDisable(),
        filterListOnGoBack: false,
        withDispatcher: false,
        disableComponent: loading
    });

    useEffect(() => {

        setLoading(true);

        const getDrivers = async () => {
            await getEnabledDrivers().then((x: any) => {
                if(x?.msg === "err-drv007") {
                    toast.info(t('noEnabledDrivers'));
                    return;
                }
                const mappedData = x.map((z) => {
                    return {
                        id: z.driverId,
                        value: `${z.lastname},${z.firstname} (${z.email})` || z.email,
                    }
                })
                setLeftSide(mappedData);
                setLoading(false);
            })
        }

        getDrivers();
    }, []);
   
    const handleDisable = async () => {


        setLoading(true);
        const driverIds = rightSide.map((x: {id: number, value: string}) => x.id );

        await postDisableDrivers(driverIds.join(","))
        .then((x) => {

            if(x?.msg?.indexOf("ok") !== -1) {
                toast.success(t('driversDisabledSuccessfully'))
                setRightSide([]);
                return;
            }

            
            toast.error(t('failedToDisableDrivers'))
        })
        .catch(() => {
            toast.error(t('failedToDisableDrivers'))
        })
        .finally(() => {
            setLoading(false);
        })
    }
    
    return <>
    <h1 style={{fontSize:"30px", display:'flex', justifyContent:'center'}}>
        {t('disableDrivers')}
    </h1>
    {renderDriverSelection()}
</>
}

export default DisableDrivers;