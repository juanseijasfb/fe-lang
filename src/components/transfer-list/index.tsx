import {
  List, ListItem, ListItemText,
  Button, Grid, Paper,
  Typography, Box, CircularProgress, TextField, Autocomplete,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Item {
  id: number;
  value: string;
}

const TransferList = ({
    left = [] as Item[], 
    right = [] as Item[],
    setLeft,
    setRight,
    disabledForm = false,
    loading = false,
    leftTitle = "Disponible",
    rightTitle = "A vincular",
  }) => {

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
  };

  const handleRemoveItem = (item: Item) => {
    const newTargetList = right.filter((i) => i.id !== item.id);
    setRight(newTargetList);
    setLeft([...left, item]);
  };

  const handleAddAll = () => {
    setRight([...right, ...left]);
    setLeft([]);
  };

  const handleRemoveAll = () => {
    setLeft([...right, ...left]);
    setRight([]);
  };

  // const handleFilterLeft = (text) => {
  //   const newList = left.filter((x) => x.value.includes(text) )
  //   setLeft(newList);
  // }

  // const handleFilterRight = (text) => {
    
  // }

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
              flex: 1,
            }} >
              {/* <Autocomplete
                sx={{width:"50%"}}
                options={left.map((x) => x.value)} 
                renderInput={(params) => <TextField {...params} />}
                placeholder={t('search')}
              /> */}
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
            <Button
              disabled={disabledForm}
              sx={{ marginTop: 2 }}
              variant="contained"
              color="primary"
              onClick={() => handleAddAll()}
          >
            {`${t('addAll')} >>`}
          </Button>
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
              flex: 1,
            }} >
              {/* <Autocomplete
                sx={{width:"50%"}}
                options={right.map((x) => x.value)} 
                renderInput={(params) => <TextField {...params} />}
                placeholder={t('search')}
              /> */}
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
