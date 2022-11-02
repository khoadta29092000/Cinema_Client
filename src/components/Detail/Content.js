import React from 'react'
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
export default function Content() {
    const [dataFilmInCinema, setDataFilmInCinema] = useState("");
    let location = useLocation();
    useEffect(() => {
        featchFilmDetails();

    }, []);
    console.log("11", location.state, dataFilmInCinema)
    async function featchFilmDetails() {
        try {

            const requestURL = `http://cinemasystem.somee.com/api/Film/${location.state.name}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataFilmInCinema(responseJSON.data)



        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    return (
        <section className="pb-28  mb-28">
            <div className="container max-w-7xl mx-auto px-4">


                <div className='grid grid-cols-5 mb-28 pb-28'>
                    <div className='p-5 mx-auto'>
                        <img className='  h-80 ' src={dataFilmInCinema.image} />
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
             
            </div>
        </section >
    )
}


