// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { getPendingApprovals } from '@/services/ApiServices';
// import { toast } from "react-toastify";
// import { CircularProgress } from "@mui/material";

const ListBox = ({
    listElements,
    keyToCompare,
    selectedElement,
    setSelectedElement,
    setHasSelectedElement,
    title = ""
}) => {

    // const { t } = useTranslation();
    // const [isLoadingList, setIsLoadingList] = useState(false);

    const handleSelect = (x) => {
        setSelectedElement(x)
        setHasSelectedElement(true);
    };

    const renderList = () => {

        return  <ul style={{listStyle:"none", padding: 0, cursor:"pointer"}}>

                {listElements.map((x: any) => {
                    if(x[keyToCompare] === selectedElement[keyToCompare]) {
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
        // if(isLoadingList) {
        //     return <div style={{width:"100%", height:"100%", display:"flex", alignItems:'center', justifyContent:"center"}}>
        //         <CircularProgress /> 
        //     </div>
        // }

        if(listElements?.length === 0) {
            return  <div style={{width:"100%", height:"100%", display:"flex", alignItems:'center', justifyContent:"center"}}>
            </div>
        }

        return renderList()
    }

    return <>
    
        <h2> {title} </h2>
        <div style={{backgroundColor:'', height:"80%", border:"1px solid black", overflowX:"hidden", overflowY:"auto"}}>
        
            {render()}

        </div>
    </>
}

export default ListBox;