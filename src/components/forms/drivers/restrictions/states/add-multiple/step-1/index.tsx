import useBatchSelection from "@/hooks/useBatchUserSelection";
import { useState } from "react";
import RestrictStatesForDriversStepTwo from "../step-2";
import { useTranslation } from "react-i18next";

const RestrictStatesForDriversStepOne = () => {
    const [formStep, setFormStep] = useState("1");
    const [filterListOnGoBack, setFilterListOnGoBack] = useState(false);
    const { t } = useTranslation();

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
        return <>
            <h1 style={{fontSize:"30px", display:'flex', justifyContent:'center'}}>
                {t('createDriverRestrictions')}
            </h1>
            {renderDriverSelection()}
        </>
    } 

    return <RestrictStatesForDriversStepTwo selectedUsers={rightSide} goBack={() => setFormStep("1")} />;
}

export default RestrictStatesForDriversStepOne;