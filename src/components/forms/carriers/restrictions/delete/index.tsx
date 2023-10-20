import { useEffect, useState } from "react";

import { 
    Box, Button, CircularProgress, MenuItem, 
    Select, TextField, Typography
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


import { 
    getCarriersList, 
    removeRestriction,
    getRestrictions, 
    getBrokerRestrictionDetails,
 } from '@/services/ApiServices';

 import { RestrictionPayload } from '@/types/types';

import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const RemoveCarrierRestrictionForm = () => {
  
  const { t } = useTranslation();
  
  const [loading, setLoading] = useState(false);
  const [isLoadingCarriers, setIsLoadingCarriers] = useState(false);

  const [carriers, setCarriers] = useState([]);
  const [selectedCarrier, setSelectedCarrier] = useState("");
  
  const [selectedRestrictionsToRemove, setSelectedRestrictionsToRemove] = useState([]);
  const [brokerNames, setBrokerNames] = useState({});
  
  const [restrictionPayLoad, setRestrictionPayLoad] = useState({
      subjectValue: "",
      typeValue: "",
      newBrokerName: "",
  });

  const [restrictionsList, setRestrictionsList] = useState([]);
  const [disableForm, setDisableForm] = useState(false);
  const [isLoadingRestrictionList, setIsLoadingRestrictionList] = useState(false);

  const types = {
    "CI": "City",
    "ST": "State",
    "B": "Broker",
  }

  const centerStyleProps = {display:'flex', flexDirection:'column', alignItems:'center', width:"100%", marginBottom:"20px"};

  useEffect(() => {
      const getCarriers = async () => {
          const data = await getCarriersList().catch(() => {
            toast.error(`${t('errorWhenTryingToFetchList')} carriers`)
          });

          if(!data) {
              return;
          }

          const mappedInfo = data.map((x) => {
            return {
                optionValue: String(x.MCNumber),
                carrierName: x.carrier,
                optionDisplayName: `${x.MCNumber} - ${x.carrier}`
            }
          })

          const util = {};

          data.forEach((x) => {
              util[x.MCNumber] = x.carrier
          })
          
          setCarriers(mappedInfo);
          setIsLoadingCarriers(false);
      }

      setIsLoadingCarriers(true);
      getCarriers();
  },[])

  const renderFields = (field) => {

    if(field.isLoading){
      return <CircularProgress />
    }

    if(field.isHidden) {
        return <></>
    }

    if(field.fieldType === "select") {
      return <>
          <Typography> {field.displayName} </Typography>
      
          {
              field.isLoading ? (
                  <CircularProgress />
              ) : (
              <Select 
                  {...field}
                  sx={{width:"40%", height: "36px"}} 
                  type={field.fieldType} 
                  defaultValue={""}
                  error={field.error}
                  onChange={(e) =>  {

                      if(!field?.onChange) {
                          return;
                      }

                      field.onChange(e.target.value);
                  }}
              >
                {field.options.map((x, i) => <MenuItem key={i} value={x.optionValue}> {x.optionDisplayName} </MenuItem>)}
              </Select>
              )
          }
      </>
    }

    if(field.fieldType === "plainText") {
      return <>
        <Typography> {field.displayName} </Typography>
        <Typography sx={{fontWeight:'bold', fontSize:"24px"}}> {field.value} </Typography>
      </>
    }

    if(field.fieldType === "grid") {
      return <>
        <Typography> {field.displayName} </Typography>
        <DataGrid
              columns={field.columns}
              rows={field.rows}
              loading={false}
              rowHeight={38}
              autoHeight
              showCellVerticalBorder
              checkboxSelection
              getRowClassName={() => `fb-theme`}
              pagination
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              pageSizeOptions={[10]}
              onRowSelectionModelChange={(newSelection: any) => {
                setSelectedRestrictionsToRemove(newSelection);
              }}
          />
      </>
    }

    // generic field
    return <>
        <Typography> {field.displayName} </Typography>
        <TextField sx={{width:"30%"}} type={field.fieldType} 
          // error={triedToCreate} 
            onChange={(e) => field.onChange(e)} 
        />
    </>
  }


  const handleRemoveRestrictions = () => {

    if(selectedRestrictionsToRemove.length <= 0) {
      toast.error(t('mustSelectAnElement'))
      return;
    }

    setLoading(true);

    const promisesArr: any = [];
    selectedRestrictionsToRemove.forEach((el) => {
      
      let restrictionSelected: any = restrictionsList[el - 1];

      if(restrictionSelected.Type === "B") {

        const restrictionPayload: RestrictionPayload = {
          subject: restrictionSelected?.Subject,
          type: restrictionSelected?.Type,
          subjectValue: restrictionSelected?.SubjectValue,
          typeValue: brokerNames[restrictionSelected.TypeValue],
        } 

        const promise1 = new Promise((resolve, reject) => {
          removeRestrictionsProcessor(restrictionPayload, resolve, reject);
        });

        promisesArr.push(promise1)
        return;
      }

      const restrictionPayload: RestrictionPayload = {
        subject: restrictionSelected?.Subject,
        type: restrictionSelected?.Type,
        subjectValue: restrictionSelected?.SubjectValue,
        typeValue: restrictionSelected?.TypeValue,
      } 
      
      const promise2 = new Promise((resolve, reject) => {
        removeRestrictionsProcessor(restrictionPayload, resolve, reject);
      });
      
      promisesArr.push(promise2)
    })
    
    
    Promise.all(promisesArr).then(() => {
      getCarrierRestrictions(selectedCarrier);
    }).finally(() => {
      setLoading(false);
    })
  }

  const removeRestrictionsProcessor = async (payload: RestrictionPayload, resolve, reject) => {
     
      await removeRestriction(payload)
      .then((res) => {

          if(res?.indexOf("ok") === -1){
            toast.error(`${t('errorWhenTryingToRemoveRestriction')}: "${payload.typeValue}".`)
            return;
          }
          toast.success(`Restricción de "${payload.typeValue}" fue removida correctamente.`)
      }).catch(() => {
          toast.error(`${t('errorWhenTryingToRemoveRestriction')}: "${payload.typeValue}".`)
          reject();
      })
      .finally(() => {
        setRestrictionPayLoad({...restrictionPayLoad, subjectValue: ""});
        resolve();
      })
  }

  const getBrokerNames = async (brokerList, details) => {
    await getBrokerRestrictionDetails(brokerList)
    .then((res) => {

        if(res?.message || res?.msg) {
          toast.error(t('errorRetrievingBrokerNames'))
          setIsLoadingRestrictionList(false);
          setDisableForm(false);
          return;
        }

        const data = {};

        res.forEach((el) => {
          data[el.CompanyName] = el.MCNumber;
          data[el.MCNumber] = el.CompanyName;
        })

        setBrokerNames(data);

        const mappedInfo = details.map((x) => {
          return {
              ...x,
              TypeValue: data[x.TypeValue]
          } 
        })
        setRestrictionsList(mappedInfo);
        toast.success(t('restrictionsLoadedSuccessfully'))
    })
    .catch(() => {
        toast.error(t('errorRetrievingBrokerNames'))
    })
    .finally(() => {
      setIsLoadingRestrictionList(false);
      setDisableForm(false);
    })

  }

  const getCarrierRestrictions = async (carrierMC) => {
    setRestrictionsList([]);
    setDisableForm(true);
    setIsLoadingRestrictionList(true);
    await getRestrictions({carrier: carrierMC, driverName: ""})
    .then((x) => {

      if(x?.message || x?.msg) {
        toast.error(t('errorRetrievingCarrierRestrictions'))
        setIsLoadingRestrictionList(false);
        setDisableForm(false);
        return;
      }

      if(x?.length <= 0 ) {
        toast.info(`${t('restrictionsNotfoundForCarrier')} "${carrierMC}" `)
        setIsLoadingRestrictionList(false);
        setDisableForm(false);
        return;
      }

      const brokerRestrictionsList = x.filter((x) => x?.Type === "B");
      if(brokerRestrictionsList.length > 0) {
        const brokerMcs = brokerRestrictionsList.map((x) => x.TypeValue)?.join(",");
        getBrokerNames(brokerMcs, x);
        return;
      } 

      setRestrictionsList(x);

      toast.success(t('restrictionsLoadedSuccessfully'))
      
      setIsLoadingRestrictionList(false);
      setDisableForm(false);
    })
  }

  const renderFormSelected = () => {

      const fields = [
        {
            displayName: t('carrierToRemoveRestrictions'),
            linkedTo: 'carrierToAddRestriction',
            fieldType: "select",
            // error: !fieldsData.trailerType && triedToCreate,
            options: carriers,
            isLoading: isLoadingCarriers,
            disabled: disableForm,
            onChange: (val: string) => {
                setRestrictionPayLoad({...restrictionPayLoad, subjectValue: val});

                setSelectedCarrier(val);
                getCarrierRestrictions(val);
            }
        },
        {
          displayName:  t('listOfRestrictions'),
          linkedTo: 'restrictionList',
          fieldType: "grid",
          isHidden: restrictionsList.length === 0,
          isLoading: isLoadingRestrictionList,
          columns: [
            {
              field: "restrictionName",
              hide: false,
              headerName: t('restrictionName'),
              width: 600,
              sortable: false,
            },
            {
              field: "restrictionType",
              hide: false,
              headerName: t('type'),
              width: 100,
              sortable: false,
            },
          ],
          rows: restrictionsList.map((x: any, i) => {
            return {
              id: i + 1,
              restrictionName: x.TypeValue,
              restrictionType: types[x.Type],
            };
          }),
        }
    ];

    return fields.map((x) =>  {

        return <Box key={x.linkedTo} sx={{...centerStyleProps}}>
            {renderFields(x)}
        </Box>
    });
  }

  return <Box sx={{...centerStyleProps}}>
    <h1 style={{fontSize:"30px"}}></h1>

      {renderFormSelected()}
      
      {loading ? (<CircularProgress/>) : (
          <Button 
            variant='outlined'
            sx={{width:"30%"}} 
            onClick={handleRemoveRestrictions} 
            disabled={disableForm || isLoadingCarriers || selectedRestrictionsToRemove.length <= 0 || restrictionsList.length <= 0}>
              {t('removeRestrictions')}
          </Button>
      )}
  </Box>
}

export default RemoveCarrierRestrictionForm;