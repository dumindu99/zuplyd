import React from 'react';
import { TextField, Grid, Button, Tabs, Tab, Typography, Box, Modal, Card, CardContent } from '@mui/material';
import Header from '../../components/header/header';
import Item from './items';
import AddCategory from './addCategory';
import AddItem from './addItem';
import axios from 'axios';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function products() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemInfo, setItemInfo] = React.useState<any>([]);

  const getItemInfo = () => {
    const company_ID = 'acdf214124';
    axios.get('http://localhost:7000/api/procurement/item/findAll/' + company_ID).then((res) => {
      setItemInfo(res.data.items);
    });
  };

  React.useEffect(() => {
    getItemInfo();
  }, []);

  return (
    <>
      <Header title={'Products'} />

      <div className="content">
        <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
              <Tab label="Items" {...a11yProps(0)} />
              <Tab label="Add Category" {...a11yProps(1)} />
              <Tab label="Add Item" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Item itemInfo={itemInfo} />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <AddCategory itemInfo={itemInfo} />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <AddItem />
          </TabPanel>

          <div className="content">
            <Grid container sx={{}} rowGap={0}></Grid>
          </div>
        </Box>
      </div>
    </>
  );
}

export default products;
