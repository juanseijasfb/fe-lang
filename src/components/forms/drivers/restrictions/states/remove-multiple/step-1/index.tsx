import useBatchSelection from "@/hooks/useBatchUserSelection";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RemoveRestrictStatesForDriversStepTwo from "../step-2";

const RemoveStatesRestrictionsForDrivers = () => {
    const [formStep, setFormStep] = useState("1");
    const [filterListOnGoBack, setFilterListOnGoBack] = useState(false);
    const { t } = useTranslation();

    const updateStep = () => {
        setFormStep("2");
        setFilterListOnGoBack(true);
    }

    const {
        rightSide,
        renderDriverSelection
    } = useBatchSelection({ parentCb: updateStep, filterListOnGoBack: filterListOnGoBack});

    if(formStep === "1") {
        return <>
            <h1 style={{fontSize:"30px", display:'flex', justifyContent:'center'}}>
                {t('removeStatesRestrictions')}
            </h1>
            {renderDriverSelection()}
        </>
    } 

    return <RemoveRestrictStatesForDriversStepTwo selectedUsers={rightSide} goBack={() => setFormStep("1")} />;
}

export default RemoveStatesRestrictionsForDrivers;