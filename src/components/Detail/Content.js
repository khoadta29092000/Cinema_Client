import React from 'react'
import { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactPlayer from 'react-player/youtube'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


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
export default function Content() {
    window.scrollTo(0, 0);
    const [dataFilmInCinema, setDataFilmInCinema] = useState("");
    let location = useLocation();
    const [dataAcc, setDataAcc] = useState([]);
    const [Account, setAcccount] = useState(0);
    const [dataScheduling, setDataScheduling] = useState([]);
    var today = new Date();

    const [value, setValue] = React.useState(today);
    useEffect(() => {
        featchFilmDetails();
        featchAccList();
        featchSchedulingList();
    }, [Account, value]);
    console.log("11", location.state, dataFilmInCinema)
    async function featchAccList() {
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

            setDataAcc(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchFilmDetails() {
        try {

            const requestURL = `http://cinemasystem2.somee.com/api/Film/${location.state.name}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataFilmInCinema(responseJSON.data)

            console.log("ne", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchSchedulingList() {
        try {

            const requestURL = `http://www.cinemasystem.somee.com/api/Scheduling?Startdate=${formatDate(value)}&EndDate=${formatDate(value)}`;

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

    const AccOptions = dataAcc.map((item, index) => ({
        id: item.id,
        label: item.name
    }))
    AccOptions.unshift({ id: 0, label: "All" })
    const handleChange = (newValue) => {
        setValue(newValue);

    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   const  sortdataScheduling = dataScheduling.sort(function (a, b) {
        return ('' + a.startTime).localeCompare(b.startTime);
    })
    return (
        <section className="pb-28  mb-28">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <ReactPlayer url={dataFilmInCinema.trailer} />
                    </Typography>

                </Box>
            </Modal>
            <div className="container max-w-7xl mx-auto px-4">


                <div className='grid grid-cols-5 '>
                    <div onClick={handleOpen} className=' hover:transition-all cursor-auto  hover:scale-110 p-5 mx-auto'>
                        <img className='  h-80  cursor-pointer object-cover hover:opacity-75 w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out' src={dataFilmInCinema.image} />
                    </div>
                    <div className='p-5 col-span-2'>
                        <h2 className='font-normal text-3xl '>{dataFilmInCinema.title}</h2>
                        <div className='flex'>
                            <button className='text-white ml-2 mr-4 w-8 h-8 bg-blue-600'>C{dataFilmInCinema.rated}</button>
                            <div className='mt-1'>  <HistoryToggleOffIcon /> {dataFilmInCinema.time} Phút </div>
                        </div>
                        <div className='flex mt-2'>
                            <div className=' text-gray-500'> Actor:  </div>
                            <div className=' ml-2'> {dataFilmInCinema.actor} </div>
                        </div>
                        <div className='flex mt-2'>
                            <div className=' text-gray-500'> Language:  </div>
                            <div className=' ml-2'> {dataFilmInCinema.language} </div>
                        </div>
                        <div className='flex mt-2'>
                            <div className=' text-gray-500'> Director:  </div>
                            <div className=' ml-2'> {dataFilmInCinema.director} </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="container max-w-7xl pl-4 mx-auto px-4">
                <h2 className='text-3xl'>Content</h2>
                <hr className='border-2 border-blue-500 rounded-xl w-16 my-1' />
                <div className='mt-4 mb-10'>
                    <div>{dataFilmInCinema.description}</div>
                </div>
            </div>
            <div className="container max-w-7xl pl-4 mx-auto mb-20 px-4">
                <h2 className='text-3xl '>Scheduling</h2>
                <hr className='border-2 mb-10 border-blue-500 rounded-xl w-16 my-1' />
                <div className='float-left w-full  gap-5 mt-2 mb-5   lg:flex '>

                    <div className='col-span-1 outline-none hover:outline-none'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="MM/DD/YYYY"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                {dataAcc.map(item => {
                    return (
                        <div className='my-10 '>
                            <div className='w-full'>
                                <button className='bg-blue-600 text-white py-2 px-12 '>
                                    {item.name}
                                </button>
                            </div>
                            <div className='w-full border-2  py-8 flex  '>
                                <div>
                                    <p className='ml-5 mt-2'>
                                        2D -  Phụ đề
                                    </p>
                                </div>
                                <div className=''>

                                    {sortdataScheduling.map(itemScheduling => {

                                        if ( itemScheduling.cinemaId == item.id && itemScheduling.filmId == dataFilmInCinema.id && formatDate(today) == formatDate(value) ? formatTime(today) <= itemScheduling.startTime == true : itemScheduling.cinemaId == item.id && itemScheduling.filmId == dataFilmInCinema.id) {
                                         
                                                return (
                                                    <NavLink to={{
                                                        pathname: "/Service",
                                                        state: {
                                                            name: dataFilmInCinema,
                                                            scheduling: itemScheduling,
                                                        }
                                                    }} >
                                                        <button className='border-2 p-2 mb-5 mx-5 text-xs pointer-events-auto  hover:border-yellow-600 hover:text-yellow-600'>{itemScheduling.startTime}

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


            </div>

        </section >
    )
}


