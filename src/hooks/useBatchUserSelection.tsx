import BatchSelectDrivers from "@/components/forms/drivers/batch-select";
import { useState } from "react";

const useBatchSelection = ({parentCb, filterListOnGoBack, disableComponent = false}) => {
    const [leftSide, setLeftSide] = useState([]); // sin seleccionar
    const [rightSide, setRightSide] = useState([]); // drivers seleccionados

    const [availableDispatchers, setAvailableDispatchers] = useState([]); 
    
    const renderDriverSelection = () => {
        return <BatchSelectDrivers 
            leftSide={leftSide}
            setLeftSide={setLeftSide}
            rightSide ={rightSide}
            setRightSide={setRightSide}
            availableDispatchers={availableDispatchers}
            setAvailableDispatchers={setAvailableDispatchers}
            parentCb={parentCb}
            filterListOnGoBack={filterListOnGoBack}
            disableComponent={disableComponent}
        />
    }
    return {
        leftSide,
        rightSide,
        renderDriverSelection
    }
}

export default useBatchSelection;