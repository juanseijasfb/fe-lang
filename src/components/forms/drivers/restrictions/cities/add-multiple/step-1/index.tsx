import useBatchSelection from "@/hooks/useBatchUserSelection";
import { useState } from "react";
import RestrictCitiesForDriversStepTwo from "../step-2";
import RestrictCitiesForDriversStepTree from "../step-3";
import { useTranslation } from "react-i18next";

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

    const { t } = useTranslation();
    const [formStep, setFormStep] = useState("1");
    const [selectedDriversAndStates, setSelectedDriversAndStates] = useState([]);

    if(formStep === "1") {
        return  <>
            <h1 style={{fontSize:"30px", display:'flex', justifyContent:'center'}}>
                {t('createCityRestrictions')}
            </h1>
            {renderDriverSelection()}
        </>
    } else if (formStep === "2") {
        return <RestrictCitiesForDriversStepTwo 
        selectedUsers={rightSide} 
        goNext={goStepThree} 
        goBack={goStepTwo}
        selectedDriversAndStates={selectedDriversAndStates} 
        setSelectedDriversAndStates={setSelectedDriversAndStates} />
    }

    
    return <RestrictCitiesForDriversStepTree 
        goBack={goStepTwo}
        selectedDriversAndStates={selectedDriversAndStates} 
    />
}

export default RestrictCitiesForDriversStepOne;