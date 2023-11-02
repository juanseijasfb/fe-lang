import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPendingApprovals } from '@/services/ApiServices';
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const PendingDriverApprovals = ({
    selectedDriverMetadata,
    setSelectedDriverMetadata,
    pendingList, setPendingList,
    setHasSelectedDriverToApprove
}) => {

    const { t } = useTranslation();
    const [isLoadingApprovalList, setIsLoadingApprovalList] = useState(false);


    useEffect(() => {
        const getUsersWatingForApproval = async () => {
            const data = await getPendingApprovals().catch(() => {
                toast.error(`${t('errorWhenTryingToFetchList')} ${t('pendingApprovals')}`);
            });

            if(!data) {
                setIsLoadingApprovalList(false);
                return;
            }

            setPendingList(data);
            setIsLoadingApprovalList(false);
        }

        setIsLoadingApprovalList(true);
        getUsersWatingForApproval();
    },[])
    
    const handleSelect = (x) => {
        setSelectedDriverMetadata(x)
        setHasSelectedDriverToApprove(true);
    };

    const renderList = () => {

        return  <ul style={{listStyle:"none", padding: 0, cursor:"pointer"}}>

                {pendingList.map((x: any) => {
                    if(x?.user_id === selectedDriverMetadata?.user_id) {
                        return <li key={x.user_id} style={{width:"100%", paddingLeft:"20px", background:"#1976d229"}} onClick={() => handleSelect(x)}>
                        {x?.email}
                    </li>       
                    }

                    return <li key={x.user_id} style={{width:"100%", paddingLeft:"20px"}} onClick={() => handleSelect(x)}>
                        {x?.email}
                    </li>                 
                })}
            </ul>
    }

    const render = () => {
        if(isLoadingApprovalList) {
            return <div style={{width:"100%", height:"100%", display:"flex", alignItems:'center', justifyContent:"center"}}>
                <CircularProgress /> 
            </div>
        }

        if(pendingList?.length === 0) {
            return  <div style={{width:"100%", height:"100%", display:"flex", alignItems:'center', justifyContent:"center"}}>
                 {t('noPendingApprovals')}
            </div>
        }

        return renderList()
    }

    return <>
    
        <h2> {t('pendingApprovals')} </h2>
        <div style={{backgroundColor:'', height:"80%", border:"1px solid black", overflowX:"hidden", overflowY:"auto"}}>
        
            {render()}

        </div>
    </>
}

export default PendingDriverApprovals;