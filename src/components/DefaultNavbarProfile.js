import { React, useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import ManIcon from '@mui/icons-material/Man';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Image from '@material-tailwind/react/Image';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HttpsIcon from '@mui/icons-material/Https';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PasswordIcon from '@mui/icons-material/Password';
import HistoryIcon from '@mui/icons-material/History';
export default function DefaultNavbarProfile() {
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
            console.log("aa aaaaaaaaaaaaaaa", profileList)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    return (

        <aside className='  w-64 rounded-none' aria-label="Sidebar">
            <div className="overflow-y-auto rounded-none  px-3  text-white  h-screen ">
                <div className='text-white ml-16 h-16 tracking-widest pt-3  text font-bold text-3xl'>


                </div>

                <ul className="space-y-8">
                    <div className="w-40 h-52 mx-auto">


                        <img
                            src={profileList.avatar}
                        />



                    </div>

                    <li>
                        <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/profiledashboard" className="flex hover:text-black items-center p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <DashboardIcon className="w-12 h-12 text-black transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 22 22" />
                            <span className="ml-3 text-black ">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/profiledashboard/profile" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <AccountBoxIcon className="w-12 h-12 text-black transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 22 22" />
                            <span className="flex-1 ml-3 text-black  whitespace-nowrap">Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/profiledashboard/ChangePassword" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <PasswordIcon className="w-12 h-12 text-black transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 25 20" />
                            <span className="flex-1 ml-3 text-black  whitespace-nowrap">Change Password</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/profiledashboard/History" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <HistoryIcon className="w-12 h-12 text-black transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 22 22" />
                            <span className="flex-1 ml-3 text-black  whitespace-nowrap">History</span>
                        </NavLink>
                    </li>


                </ul>

            </div>
        </aside>
    );
}
