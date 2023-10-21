import {
  List, ListItem, ListItemText,
  Button, Grid, Paper,
  Typography, Box, CircularProgress,
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
           <Typography sx={{fontWeight:'bold'}}>{leftTitle}</Typography>
        <Paper
          sx={{
            padding: 2,
            height: 400,
            overflow: 'auto',
          }}
          >
          <List>
            {left.map((item) => (
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
        <Typography sx={{fontWeight:'bold'}}> {rightTitle} </Typography>
        <Paper
          sx={{
            padding: 2,
            height: 400,
            overflow: 'auto',
          }}
        >
          <List>
            {right.map((item) => (
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
