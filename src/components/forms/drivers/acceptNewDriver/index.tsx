import { useState } from "react";
import PendingDriverApprovals from "../PendingDriverApprovals";
import CreateDriverForm from "../create";

const AcceptNewDriver = () => {
    const [pendingList, setPendingList] = useState([]);
    const [selectedDriverMetadata, setSelectedDriverMetadata] = useState<any>({});
    const [hasSelectedDriverToApprove, setHasSelectedDriverToApprove] = useState<boolean>(false);

    const removeApprovalFromList = () => {
        const oldList = [...pendingList];

        const newList = oldList.filter((x: any) => x.user_id !== selectedDriverMetadata.user_id);

        setPendingList(newList);
        setHasSelectedDriverToApprove(false);
    }

    return <div style={{display:'flex'}}>
        <div style={{width:"20%"}}>
            <PendingDriverApprovals
                selectedDriverMetadata={selectedDriverMetadata} 
                setSelectedDriverMetadata={(val) => setSelectedDriverMetadata(val)} 
                pendingList={pendingList}
                setPendingList={(val) => setPendingList(val)}
                setHasSelectedDriverToApprove={(val) => setHasSelectedDriverToApprove(val)} />
        </div>
        {hasSelectedDriverToApprove && (
            <div style={{width:"80%"}}>
                <CreateDriverForm 
                    preloadData={selectedDriverMetadata} 
                    triggerDriverPreCreated={true} 
                    removeApprovalFromList={removeApprovalFromList} 
                />
            </div>
        )}

    </div>
}

export default AcceptNewDriver;