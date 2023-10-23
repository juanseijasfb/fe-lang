import useBatchSelection from "@/hooks/useBatchUserSelection";
import { useState } from "react";
import RestrictStatesForDriversStepTwo from "../step-2";

const RestrictStatesForDriversStepOne = () => {
    const updateStep = () => {
        setFormStep("2");
    }

    const {
        // leftSide, 
        rightSide,
        renderDriverSelection
    } = useBatchSelection({ parentCb: updateStep});

    const [formStep, setFormStep] = useState("1");

    if(formStep === "1") {
        return renderDriverSelection();
    } 

    return <RestrictStatesForDriversStepTwo selectedUsers={rightSide} goBack={() => setFormStep("1")} />;
}

export default RestrictStatesForDriversStepOne;