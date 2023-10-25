import useBatchSelection from "@/hooks/useBatchUserSelection";
import { useState } from "react";
import RestrictCitiesForDriversStepTwo from "../step-2";
import RestrictCitiesForDriversStepTree from "../step-3";

const RestrictCitiesForDriversStepOne = () => {
    const goStepTwo = () => {
        setFormStep("2");
    }

    const goStepThree = () => {
        setFormStep("2");
    }

    const {
        // leftSide, 
        rightSide,
        renderDriverSelection
    } = useBatchSelection({ parentCb: goStepTwo, filterListOnGoBack: true});

    const [formStep, setFormStep] = useState("1");

    if(formStep === "1") {
        return renderDriverSelection();
    } else if (formStep === "2") {
        return <RestrictCitiesForDriversStepTwo selectedUsers={rightSide} goNext={goStepThree} goBack={goStepTwo} />
    }
    else {
        return <RestrictCitiesForDriversStepTree selectedUsers={rightSide} />
    }

}

export default RestrictCitiesForDriversStepOne;