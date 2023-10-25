import useBatchSelection from "@/hooks/useBatchUserSelection";
import { useState } from "react";
import RestrictCitiesForDriversStepTwo from "../step-2";
import RestrictCitiesForDriversStepTree from "../step-3";
import { useTranslation } from "react-i18next";

const RestrictCitiesForDriversStepOne = () => {
    const goStepOne = () => {
        setFormStep("1");
    }

    const goStepTwo = () => {
        setFormStep("2");
    }

    const goStepThree = () => {
        setFormStep("3");
    }

    const {
        // leftSide, 
        rightSide,
        renderDriverSelection
    } = useBatchSelection({ parentCb: goStepTwo, filterListOnGoBack: true});

    const { t } = useTranslation();
    const [formStep, setFormStep] = useState("1");
    const [selectedStates, setSelectedStates] = useState([]);

    if(formStep === "1") {
        return  <>
            <h1 style={{fontSize:"30px", display:'flex', justifyContent:'center'}}>
                {t('createCityRestrictions')}
            </h1>
            {renderDriverSelection()}
        </>
    } else if (formStep === "2") {
        return <RestrictCitiesForDriversStepTwo 
        goNext={goStepThree} 
        goBack={goStepOne}
        setSelectedStates={setSelectedStates} 
        prevSelection={selectedStates} />
    }
    
    return <RestrictCitiesForDriversStepTree 
        goBack={goStepTwo}
        selectedStates={selectedStates} 
        selectedDrivers={rightSide}
    />
}

export default RestrictCitiesForDriversStepOne;