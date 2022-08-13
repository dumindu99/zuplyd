import * as React from 'react';
import { TextField, Grid, Button, Tabs, Tab, Typography, Box, Modal, Card, CardContent } from '@mui/material';
import Header from '../../components/header/header';
import OrderTable from '../../components/order-table/order-table';

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

function orders() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Header title={'Orders'} />
      <div className="content">
        <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
              <Tab label="Received Requests" {...a11yProps(0)} />
              <Tab label="Sent Requests" {...a11yProps(1)} />
              <Tab label="Pending Requests" {...a11yProps(2)} />
              <Tab label="History" {...a11yProps(3)} />
            </Tabs>
          </Box>
          {/* warehouses tab */}
          <TabPanel value={value} index={0}>
            <OrderTable />
          </TabPanel>

          {/* shops tab */}
          <TabPanel value={value} index={1}></TabPanel>

          {/* procurement managers tab */}
          <TabPanel value={value} index={2}></TabPanel>

          {/* Hierarchy tab */}
          <TabPanel value={value} index={3}>
            Hierarchy
          </TabPanel>
        </Box>
      </div>
    </>
  );
}

export default orders;
