import useBatchSelection from "@/hooks/useBatchUserSelection";
import { useState } from "react";
import RestrictStatesForDriversStepTwo from "../add-multiple/step-2";

const RestrictStatesForDriversStepOne = () => {
    const [formStep, setFormStep] = useState("1");
    const [filterListOnGoBack, setFilterListOnGoBack] = useState(false);

    const updateStep = () => {
        setFormStep("2");
        setFilterListOnGoBack(true);
    }

    const {
        // leftSide, 
        rightSide,
        renderDriverSelection
    } = useBatchSelection({ parentCb: updateStep, filterListOnGoBack: filterListOnGoBack});



    if(formStep === "1") {
        return renderDriverSelection();
    } 

    return <RestrictStatesForDriversStepTwo selectedUsers={rightSide} goBack={() => setFormStep("1")} />;
}

export default RestrictStatesForDriversStepOne;