import { useEffect, useState } from "react";
import EditDriverForm from "./form";
import ListBox from "../../generic/ListBox";
import { getDriversList } from "@/services/ApiServices";
import { useTranslation } from "react-i18next";

const EditDriverWrapper = () => {
    const [driverList, setDriverList] = useState([]);
    const [selectedDriverMetadata, setSelectedDriverMetadata] = useState<any>({});
    const [hasSelectedDriver, setHasSelectedDriver] = useState<boolean>(false);

    const { t } = useTranslation();
    
    const getDrivers =  async () => {
        await getDriversList().then((x) => {
            setDriverList(x);
        })
   }

    useEffect(() => {
       getDrivers();
    }, [])

    return <div style={{display:'flex'}}>
        <div style={{width:"20%"}}>
            <ListBox
                title={t('driverList')}
                listElements={driverList}
                selectedElement={selectedDriverMetadata}
                keyToCompare="driverId"
                setSelectedElement={(val) => setSelectedDriverMetadata(val)}
                setHasSelectedElement={(val) => setHasSelectedDriver(val)}
            />
        </div>
        {hasSelectedDriver && (
            <div style={{width:"80%"}}>
                <EditDriverForm 
                    preloadData={selectedDriverMetadata} 
                    getLeftList={getDrivers}
                />
            </div>
        )}

    </div>

}

export default EditDriverWrapper;