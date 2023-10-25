import useBatchSelection from "@/hooks/useBatchUserSelection";
import { useState } from "react";
import RemoveRestrictCitiesForDriversStepTwo from "../step-2";
import { useTranslation } from "react-i18next";

const RemoveCitiesRestrictionsForDrivers = () => {
    const updateStep = () => {
        setFormStep("2");
    }

    const {
        // leftSide, 
        rightSide,
        renderDriverSelection
    } = useBatchSelection({ parentCb: updateStep, filterListOnGoBack: true});

    const [formStep, setFormStep] = useState("1");
    const { t } = useTranslation();

    if(formStep === "1") {
        return <>
            <h1 style={{fontSize:"30px", display:'flex', justifyContent:'center'}}>
                {t('removeCitiesRestrictions')}
            </h1>
            {renderDriverSelection()}
        </>
    }

    return <RemoveRestrictCitiesForDriversStepTwo selectedUsers={rightSide} goBack={() => setFormStep("1")} />
}

export default RemoveCitiesRestrictionsForDrivers;