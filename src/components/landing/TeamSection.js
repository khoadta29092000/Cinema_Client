import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
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
        <Tab label={<div text-left my-5  mx-4 style={{  display: 'flex' }}   >
          <img src="https://kdq-react-movie-app.surge.sh/images/CGV_theater.jpg"  className="rounded-full" width="50"/>
          <h3 className="mt-4" > CGV nguyễn hồng đào </h3> <br/>
        
        </div>} {...a11yProps(1)}/>
   
        <Tab label={<div text-left ml-2 my-5 mt-2 mx-4 style={{  display: 'flex' }}   >
          <img src="https://kdq-react-movie-app.surge.sh/images/CGV_theater.jpg"  className="rounded-full" width="50"/>
          <h3  className="mt-4" > CGV Nguyễn Cửu Đàm </h3> <br/>
        
        </div>} {...a11yProps(2)} />
        <Tab label={<div text-left ml-2 my-5 mt-2 mx-4  style={{  display: 'flex' }}  >
          <img src="https://kdq-react-movie-app.surge.sh/images/CGV_theater.jpg"  className="rounded-full" width="50"/>
          <h3  className="mt-4"> CGV nguyễn Thái sơn </h3> <br/>
        
        </div>} {...a11yProps(3)} />
        <Tab label={<div text-left ml-2 my-5 mt-2 mx-4 style={{  display: 'flex' }}   >
          <img src="https://kdq-react-movie-app.surge.sh/images/CGV_theater.jpg"  className="rounded-full" width="50"/>
          <h3  className="mt-4" > CGV nguyễn Hồng đức </h3> <br/>
      
        </div>} {...a11yProps(4)} />

      </Tabs>
      <TabPanel   value={value} index={0}> 
      <div style={{ width: '300px', display: 'flex' }} >
      <img   width={50} height={50} src="https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/7/470x700_skytour.jpg" /> <br/>
      <div className="text-left ml-2 my-5 mt-2 mx-4  ">
        <h3 className="text-2xl text-green-700-300"> Hạ cánh khẩn cấp </h3>
        <div className="grid grid cols-6 gap-20">
           <NavLink to ="/Room/:id" >
               < p>  20:00</p>
           </NavLink>
        </div>
       </div>
      </div>
     
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div style={{ width: '300px', display: 'flex' }} >
      <img src="http://movieapi.cyberlearn.vn/hinhanh/cuoc-chien-sinh-tu.png" width="50" /> 
      <div className="text-left ml-2 my-5 mt-2 mx-4  ">
        <h3 className="text-2xl text-green-700-300"> Hạ cánh khẩn cấp </h3>
        <div className="grid grid cols-6 gap-20">
           <NavLink to ="/Room/:id" >
               < p>  21:00</p>
           </NavLink>
        </div>
       </div>
      </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div style={{ width: '300px', display: 'flex' }} >
      <img src="https://movieapi.cyberlearn.vn/hinhanh/game-of-throne_gp01.jpg" width="50" /> 
      <div className="text-left ml-2 my-5 mt-2 mx-4  ">
        <h3 className="text-2xl text-green-700-300"> Hạ cánh khẩn cấp </h3>
        <div className="grid grid cols-6 gap-20">
           <NavLink to ="/Room/:id" >
               < p>  21:00</p>
           </NavLink>
        </div>
       </div>
      </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <img src="https://movieapi.cyberlearn.vn/hinhanh/game-of-throne_gp01.jpg" width="50" /> 
      </TabPanel>
      
    </Box>
  );
}