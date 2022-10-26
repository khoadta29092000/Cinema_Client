import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {

    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
export default function TeamSection() {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Rạp 1 " {...a11yProps(1)} />
        <Tab label="Rạp 2" {...a11yProps(2)} />
        <Tab label="Rạp 3" {...a11yProps(3)} />
        <Tab label="Rạp 4" {...a11yProps(4)} />

      </Tabs>
      <TabPanel value={value} index={0}>
      <img src="https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/7/470x700_skytour.jpg" width="50" /> 
      </TabPanel>
      <TabPanel value={value} index={1}>
      <img src="http://movieapi.cyberlearn.vn/hinhanh/cuoc-chien-sinh-tu.png" width="50" /> 
      </TabPanel>
      <TabPanel value={value} index={2}>
      <img src="https://movieapi.cyberlearn.vn/hinhanh/game-of-throne_gp01.jpg" width="50" /> 
      </TabPanel>
      <TabPanel value={value} index={3}>
      <img src="https://movieapi.cyberlearn.vn/hinhanh/game-of-throne_gp01.jpg" width="50" /> 
      </TabPanel>
      
    </Box>
  );
}