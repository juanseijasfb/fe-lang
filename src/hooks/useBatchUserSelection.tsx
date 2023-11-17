import BatchSelectDrivers from "@/components/forms/drivers/batch-select";
import { useState } from "react";

const useBatchSelection = ({parentCb, filterListOnGoBack, disableComponent = false, withDispatcher = true}) => {
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
            withDispatcher={withDispatcher}
        />
    }
    return {
        leftSide,
        rightSide,
        setLeftSide,
        setRightSide,
        renderDriverSelection
    }
}

export default useBatchSelection;