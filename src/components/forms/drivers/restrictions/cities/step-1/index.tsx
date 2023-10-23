import useBatchSelection from "@/hooks/useBatchUserSelection";
import { useState } from "react";
import RestrictStatesForDriversStepTwo from "../step-2";

const RestrictCitiesForDriversStepOne = () => {
    const updateStep = () => {
        setFormStep("2");
    }

    const {
        // leftSide, 
        rightSide,
        renderDriverSelection
    } = useBatchSelection({ parentCb: updateStep, filterListOnGoBack: true});

    const [formStep, setFormStep] = useState("1");

    if(formStep === "1") {
        return renderDriverSelection();
    } else if (formStep === "2") {
        return <RestrictStatesForDriversStepTwo selectedUsers={rightSide}/>
    }
    else {
        return <RestrictStatesForDriversStepTwo selectedUsers={rightSide}/>
    }

}

export default RestrictCitiesForDriversStepOne;