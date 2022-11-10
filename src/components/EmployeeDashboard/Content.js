import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavLink, Link } from 'react-router-dom';
import { TodayOutlined } from '@mui/icons-material';

function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ':' + "00";
  return strTime;
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}
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
export default function Content(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [cinemaId, setCinemaId] = useState(1);
    const [dataCinema, setDataCinema] = useState([]);
    const [dataScheduling, setDataScheduling] = useState([]);
    const [dataNowFilm, setDataNowFilm] = useState([]);
    const [dataFilmInCinema, setDataFilmInCinema] = useState([]);
    var today = new Date();
  
  
    useEffect(() => {
      featchFilmNowList();
      featchCinemaList();
      featchSchedulingList();
      featchFimInCinemaList();
    }, [cinemaId]);
  
    async function featchCinemaList() {
      try {
  
  
        const requestURL = `http://www.cinemasystem.somee.com/api/Cinema`;
  
        const response = await fetch(requestURL, {
          method: `GET`,
          headers: {
            'Content-Type': 'application/json',
  
          },
        });
        const responseJSON = await response.json();
  
        const data = responseJSON;
  
        setDataCinema(responseJSON.data)
  
        console.log("aa fetch", responseJSON.data)
  
      } catch (error) {
        console.log('Fail to fetch product list: ', error)
      }
    }
    async function featchFimInCinemaList() {
      try {
        let cinemaid;
        if (cinemaId == "") {
          cinemaid = 0;
        } else {
          cinemaid = cinemaId
        }
  
        const requestURL = `http://cinemasystem.somee.com/api/FilmInCinema/AllFilmInCinemaToday/${cinemaid}`;
  
        const response = await fetch(requestURL, {
          method: `GET`,
          headers: {
            'Content-Type': 'application/json',
  
          },
        });
        const responseJSON = await response.json();
  
        const data = responseJSON;
  
        setDataFilmInCinema(responseJSON.data)
  
        console.log("aa fetch", responseJSON.data)
  
      } catch (error) {
        console.log('Fail to fetch product list: ', error)
      }
    }
    async function featchSchedulingList() {
      try {
        let cinemaid;
        if (cinemaId == "") {
          cinemaid = 0;
        } else {
          cinemaid = cinemaId
        }
        const requestURL = `http://cinemasystem.somee.com/api/Scheduling?startDate=${formatDate(today)}&endDate=${formatDate(today)}&CinemaId=${cinemaid}`;
  
        const response = await fetch(requestURL, {
          method: `GET`,
          headers: {
            'Content-Type': 'application/json',
  
          },
        });
        const responseJSON = await response.json();
  
        const data = responseJSON;
  
        setDataScheduling(responseJSON.data)
  
        console.log("aa fetch", responseJSON.data)
  
      } catch (error) {
        console.log('Fail to fetch product list: ', error)
      }
    }
    async function featchFilmNowList() {
      try {
  
  
        const requestURL = `http://www.cinemasystem.somee.com/api/Film`;
  
        const response = await fetch(requestURL, {
          method: `GET`,
          headers: {
            'Content-Type': 'application/json',
  
          },
        });
        const responseJSON = await response.json();
  
        const data = responseJSON;
  
        setDataNowFilm(responseJSON.data)
  
       
      } catch (error) {
        console.log('Fail to fetch product list: ', error)
      }
    }

    return (
        <section className="  ">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab  label="Film" {...a11yProps(0)} />
                        <Tab label="Service" {...a11yProps(1)} />
                        <Tab label="Checking" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                {dataCinema.map((itemCinema, index) => {
              return (

                < TabPanel className="overflow-y-scroll h-600" 
                 key={itemCinema.id} value={value} index={(index - 1) + 1}>

                  {dataFilmInCinema.map(itemFilm => {

                    return (
                      <div key={itemFilm.id} className='mb-5' style={{ width: '700px', display: 'flex' }} >
                         <Link to={{
                                        pathname: "/detail",
                                        state: {
                                            name: itemFilm.id
                                        }
                                       
                                    }}   >
                        <img width={200} height={250} src={itemFilm.image} /> <br />
                        </Link>
                        <div className="text-left ml-2 my-5 mt-2 mx-4  ">
                          <h3 className="text-3xl mb-2 text-green-700-300"> {itemFilm.title} </h3>
                          <div className="grid grid-cols-6 gap-5">
                            {dataScheduling.map(itemScheduling => {
                              
                              if (itemScheduling.filmId == itemFilm.id && formatTime(today) <= itemScheduling.startTime == true) {
                                return (
                                  <NavLink to={{
                                    pathname: "/Service",
                                    state: {
                                      name: itemFilm,
                                      scheduling: itemScheduling,
                                    }
                                  }} >
                                    <button className='border-2 p-2 text-xs pointer-events-auto  hover:border-yellow-600 hover:text-yellow-600'>{itemScheduling.startTime}

                                    </button>
                                  </NavLink>
                                )
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </TabPanel>
              )

            })}

                <TabPanel value={value} index={1}>
                   
                </TabPanel>

            </Box>
        </section>
    );
}
