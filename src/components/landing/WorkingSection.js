//import Card from '@material-tailwind/react/Card';
import StatusCard from 'components/landing/StatusCard';
import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './Flim_Flip.css'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function WorkingSection() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [dataNowFilm, setDataNowFilm] = useState([]);
    const [dataComingFilm, setDataComingFilm] = useState([]);
   
    useEffect(() => {
        featchFilmNowList();
        featchFilmComingList();
    }, []);
    async function featchFilmNowList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/FilmInCinema/AllFilmInCinemaToday`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataNowFilm(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchFilmComingList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/FilmInCinema/AllFilmInCinemaComingSoon`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataComingFilm(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
   

    return (
        <section className="pb-5  ">
            <div className="container max-w-7xl mx-auto px-4">

                <div className=' text-center '>


                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab style={{ outline: "none !important" }} className='outline-0' label="Now Showing" {...a11yProps(0)} />
                            <Tab className='outline-0' label="Coming soon" {...a11yProps(1)} />

                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className='mt-5 w-full h-full  grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 2xl:grid-cols-3 gap-2'>
                            {dataNowFilm.slice(0, 6).map((product, index) => {
                                 console.log('1412', product)
                                return (
                                    
                                    <Link to={{
                                        pathname: "/detail",
                                        state: {
                                            name: product.id
                                        }
                                       
                                    }}  key={index} className=" relative mx-auto " sx={{ minWidth: 100 }} >
                                 
                                        <div className="relative w-96 h-56 text-white overflow-hidden cursor-pointer transition-all duration-700 card">
                                            <CardMedia
                                                component="img"
                                                image={product?.image}
                                                className="absolute inset-0 h-72   flex justify-center items-center bg-white transition-all duration-500 delay-200 z-20 hover:opacity-0"
                                            />
                                            <CardMedia
                                                component="img"
                                                image="https://img.freepik.com/premium-vector/cinema-movie-background-popcorn-filmstrip-clapboard-tickets-movie-time-background_41737-248.jpg"
                                                className="absolute inset-0  flex justify-center items-center bg-black transition-all hover:scale-125 z-10 card-back"
                                            />
                                        </div>

                                        <CardContent>
                                            <h2 className="-mt-2 float-left font-semibold text-base" >
                                                {product?.title}
                                            </h2>

                                        </CardContent>
                                     
                                        </Link>
                                )
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <div className='mt-5 w-full h-full  grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 2xl:grid-cols-3 gap-2'>
                            {dataComingFilm.slice(0, 6).map((product, index) => {
                                return (
                                    <Link to={{
                                        pathname: "/detail",
                                        state: {
                                            name: product.id
                                        }
                                       
                                    }}  key={product.id} className=" relative mx-auto " sx={{ minWidth: 100 }} >
                                 
                                        <div className="relative w-96 h-56 text-white overflow-hidden cursor-pointer transition-all duration-700 card">
                                            <CardMedia
                                                component="img"
                                                image={product?.image}
                                                className="absolute inset-0 h-72   flex justify-center items-center bg-white transition-all duration-500 delay-200 z-20 hover:opacity-0"
                                            />
                                            <CardMedia
                                                component="img"
                                                image="https://img.freepik.com/premium-vector/cinema-movie-background-popcorn-filmstrip-clapboard-tickets-movie-time-background_41737-248.jpg"
                                                className="absolute inset-0  flex justify-center items-center bg-black transition-all hover:scale-125 z-10 card-back"
                                            />
                                        </div>

                                        <CardContent>
                                            <h2 className="-mt-2 float-left font-semibold text-base" >
                                                {product?.title}
                                            </h2>

                                        </CardContent>
                                     
                                        </Link>
                                )
                            })}
                        </div>
                    </TabPanel>


                </div>


            </div>
        </section>
    );
}
