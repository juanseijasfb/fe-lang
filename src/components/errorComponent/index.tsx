import { useTranslation } from "react-i18next";


const ErrorComponent = () => {
    
    const { t } = useTranslation();
    return <div style={{display:'flex', flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
        <h1> {t('unexpectedErrorTryAgain')}</h1>
    </div>
}

export default ErrorComponent;