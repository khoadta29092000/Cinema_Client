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

export default function TeamSection() {
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

      const requestURL = `http://cinemasystem2.somee.com/api/FilmInCinema/AllFilmInCinemaToday/${cinemaid}`;

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
      const requestURL = `http://cinemasystem2.somee.com/api/Scheduling?startDate=${formatDate(today)}&endDate=${formatDate(today)}&CinemaId=${cinemaid}`;

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
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  } 
  const  sortdataScheduling = dataScheduling.sort(function (a, b) {
    return ('' + a.startTime).localeCompare(b.startTime);
})

  return (
    <section className="pb-20 ">
      <div className="container max-w-7xl mx-auto px-4">

        <div className=''>
          <h2 className='text-3xl ml-4 font-bold'>Cinema</h2>
          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 800 }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              {dataCinema.map((item, index) => {
                return (

                  <Tab onClick={e => setCinemaId(item.id)} key={item.id} className="h-32" label={
                    <div style={{ width: '300px', display: 'flex' }}>
                      <img src={item.image} className="w-28 h-28 " />
                      <div className="text-left ml-2">
                        {item.name}
                        <p className="text-gray-400 ">{item.address}</p>
                      </div>
                    </div>
                  } {...a11yProps(1)} />


                )
              })}
            </Tabs>
     
            {dataCinema.map((itemCinema, index) => {
              return (

                < TabPanel className={dataFilmInCinema != "" ? "overflow-y-scroll" : ""
                } key={itemCinema.id} value={value} index={(index - 1) + 1}>

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
                            {sortdataScheduling.map(itemScheduling => {
                              
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

          </Box>
        </div>


      </div>
    </section >
  );
}