import { Item, ItemTlist } from '@/types/types';
import {
  List, ListItem, ListItemText,
  Button, Grid, Paper,
  Typography, Box, CircularProgress, TextField, Autocomplete,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';

const TransferList = ({
  left = [] as Item[], 
  right = [] as Item[],
  setLeft,
  setRight,
  disabledForm = false,
  loading = false,
  leftTitle = "Disponible",
  rightTitle = "A vincular",
  disableAddAll = false,
}) => {
  
  const [leftSearchValue, setLeftSearchValue] = useState<ItemTlist | null>(null);
  const [rightSearchValue, setRightSearchValue] = useState<ItemTlist | null>(null);

  const { t } = useTranslation();

  if(loading) {
    return <Box sx={{display:'flex', alignItems:'center', height:"35vh"}}>
      <CircularProgress />
    </Box>;
  }

  const handleAddItem = (item: Item) => {
    const newSourceList = left.filter((i) => i.id !== item.id);
    setLeft(newSourceList);
    setRight([...right, item]);

    if(item.id === leftSearchValue?.id) {
      setLeftSearchValue(null);
    }
  };

  const handleRemoveItem = (item: Item) => {
    const newTargetList = right.filter((i) => i.id !== item.id);
    setRight(newTargetList);
    setLeft([...left, item]);

    if(item.id === rightSearchValue?.id) {
      setRightSearchValue(null);
    }
  };

  const handleAddAll = () => {
    setRight([...right, ...left]);
    setLeft([]);
  };

  const handleRemoveAll = () => {
    setLeft([...right, ...left]);
    setRight([]);
  };

  const handleAddLeftSearch = () => {
    if(!leftSearchValue){
      return;
    }
    const item: Item = {
      id: leftSearchValue.id,
      value: leftSearchValue.label,
    }
    handleAddItem(item)
  }

  const handleRemoveRightSearch = () => {
    if(!rightSearchValue){
      return;
    }
    const item: Item = {
      id: rightSearchValue.id,
      value: rightSearchValue.label,
    }
    handleRemoveItem(item)
  }

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
        paddingBottom:"20px"
      }}
    >
      <Box sx={{
          padding: 2,
          width: "50%",
          height: 400,
        }}>
          <Box sx={{
            display:'flex',
            alignItems:'center',
          }}>
            <Typography sx={{fontWeight:'bold'}}> {leftTitle} </Typography>
            <Box sx={{
              display:'flex',
              justifyContent:'end',
              alignItems:'center',
              flex: 1,
            }} >

              {leftSearchValue ? <Button onClick={() => handleAddLeftSearch()}> 
                {t('add')} 
              </Button> : <SearchIcon /> }

              <Autocomplete
                sx={{width:"50%"}}
                value={leftSearchValue}
                onChange={(_e, newValue) => {
                  setLeftSearchValue(newValue);
                }}
                options={left.map((x) => ({id: x.id, label: x.value}))} 
                renderInput={(params) => <TextField {...params} />}
                placeholder={t('search')}
              />
            </Box>
          </Box>
        <Paper
          sx={{
            padding: 2,
            height: 350,
            overflow: 'auto',
          }}
          >
          <List>
            {left?.sort((x, y) => x.value > y.value ? 1 : -1).map((item) => (
              <ListItem
                disabled={disabledForm}
                key={item.id}
                button
                onClick={() => handleAddItem(item)}
              >
                <ListItemText primary={item.value} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Grid container justifyContent="center" alignItems="center" sx={{width:"25%"}}>
        <Box sx={{display:'flex', flexDirection:'column'}}>
         {!disableAddAll && (
          <Button
              disabled={disabledForm}
              sx={{ marginTop: 2 }}
              variant="contained"
              color="primary"
              onClick={() => handleAddAll()}
          >
            {`${t('addAll')} >>`}
          </Button>
         )}
          <Button
            disabled={disabledForm}
            sx={{ marginTop: 2 }}
            variant="contained"
            color="primary"
            onClick={() => handleRemoveAll()}
          >
            {`<< ${t('removeAll')}`}
          </Button>
        </Box>
      </Grid>

      <Box sx={{
          padding: 2,
          width: "50%",
          height: 400,
        }}>
          <Box sx={{
            display:'flex',
            alignItems:'center',
          }}>
            <Typography sx={{fontWeight:'bold'}}> {rightTitle} </Typography>
            <Box sx={{
              display:'flex',
              justifyContent:'end',
              alignItems:'center',
              flex: 1,
            }} >

              {rightSearchValue ? <Button onClick={() => handleRemoveRightSearch()}> 
                {t('remove')} 
              </Button> : <SearchIcon /> }

              <Autocomplete
                sx={{width:"50%"}}
                value={rightSearchValue}
                onChange={(_e, newValue) => {
                  setRightSearchValue(newValue);
                }}
                options={right.map((x) => ({id: x.id, label: x.value}))} 
                renderInput={(params) => <TextField {...params} />}
                placeholder={t('search')}
              />
            </Box>
          </Box>
        <Paper
          sx={{
            padding: 2,
            height: 350,
            overflow: 'auto',
          }}
        >
          <List>
            {right?.sort((x, y) => x.value > y.value ? 1 : -1).sort().map((item) => (
              <ListItem
                disabled={disabledForm}
                key={item.id}
                button
                onClick={() => handleRemoveItem(item)}
              >
                <ListItemText primary={item.value} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      
    </Box>
  );
};

export default TransferList;
