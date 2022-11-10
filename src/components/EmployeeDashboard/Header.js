import { Link } from 'react-router-dom';
import { React, useState, useRef, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
function handleClick(event) {
    event.preventDefault();
}

export default function Header(props) {
    const [profileList, setProfileList] = useState([]);
    useEffect(() => {   
        featchProfile();       
    }, []);
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    let id2 = parseJwt(localStorage.getItem('token'))
    let prop = 'Id'
    let proprole = 'role'
    
    async function featchProfile() {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Account/${id2[prop]}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setProfileList(responseJSON.data)
            console.log("nguqua", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    return (
        <section className="">           
                   <img className='mx-auto py-5 object-cover  h-72'
                        src={profileList.avatar} />
          <div className='pl-3 font-medium text-xl '>
            Employee Name:  {profileList.fullName} <a className='font-normal text-xl '>  </a>
          </div>
          <div className='pl-3 font-medium text-xl '>
            Cinema: {profileList.cinemaId}  <a className='font-normal text-xl '>  </a>
          </div>
        </section>
    );
}
