import useBatchSelection from "@/hooks/useBatchUserSelection";
import { getDisabledDrivers, postEnableDrivers } from "@/services/ApiServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const EnableDrivers = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const {
        rightSide,
        setLeftSide,
        setRightSide,
        renderDriverSelection
    } = useBatchSelection({
        parentCb: () => handleEnable(),
        filterListOnGoBack: false,
        withDispatcher: false,
        disableComponent: loading
    });

    useEffect(() => {

        setLoading(true);
        const getDrivers = async () => {
            await getDisabledDrivers().then((x: any) => {
                if(x?.msg === "err-drv007") {
                    toast.info(t('noDisabledDrivers'));
                    setLoading(false);
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
   
    const handleEnable = async () => {

        setLoading(true);
        const driverIds = rightSide.map((x: {id: number, value: string}) => x.id );

        await postEnableDrivers(driverIds.join(","))
        .then((x) => {

            if(x?.msg?.indexOf("ok") !== -1) {
                toast.success(t('driversEnabledSuccessfully'));
                setRightSide([]);
                return;
            }
            
            toast.error(t('failedToEnableDrivers'))
        })
        .catch(() => {
            toast.error(t('failedToEnableDrivers'))
        })
        .finally(() => {
            setLoading(false);
        })
    }
    
    return <>
    <h1 style={{fontSize:"30px", display:'flex', justifyContent:'center'}}>
        {t('enableDrivers')}
    </h1>
    {renderDriverSelection()}
</>
}

export default EnableDrivers;