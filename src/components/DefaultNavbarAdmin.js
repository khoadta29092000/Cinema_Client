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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import ChairIcon from '@mui/icons-material/Chair';
import MovieIcon from '@mui/icons-material/Movie';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DiscountIcon from '@mui/icons-material/Discount';
export default function DefaultNavbarAdmin() {

   const [open, setOpen] = useState(true);

   const handleClick = () => {
      setOpen(!open);
   };


   return (
      <aside className='fixed h-screen w-64 rounded-none' aria-label="Sidebar">
         <div className="overflow-y-auto rounded-none  px-3 bg-lightblue2 text-white  h-screen  dark:bg-gray-800">
            <div className='text-white ml-16 h-16 tracking-widest pt-3  text font-bold text-3xl'>
               <NavLink to="/">
                  DDKV
               </NavLink>
            </div>
            <div className='ml-2 uppercase mt-4 text-xs mb-5'>Main</div>
            <ul className="space-y-8">

               <li>
                  <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/Admindashboard" className="flex hover:text-black items-center p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <DashboardIcon className="w-6 h-6 text-gray-500 transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                     <span className="ml-3">Dashboard</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/Bill" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <LocalAtmIcon className="w-6 h-6 text-gray-500 transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                     <span className="flex-1 ml-3 whitespace-nowrap">Bill</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/Scheduling" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <AccessTimeIcon className="w-6 h-6 text-gray-500 transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                     <span className="flex-1 ml-3 whitespace-nowrap">Scheduling</span>
                  </NavLink>
               </li>

               <li className="   items-center p-2 text-base dark:text-gray-400 group-hover:text-black font-normal  rounded-lg " onClick={handleClick}>
                  <li>
                     <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/AccountsManagement" className="flex  hover:text-black items-center p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <GroupIcon className="-pl-10 text-gray-500 transition -mt-2  dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                        <span className="ml-3">Customer</span>
                     </NavLink>
                  </li>
               </li>
            </ul>
            <div className='ml-2 text-xs uppercase my-5'>Management</div>
            <ul className="space-y-8">


               <li>
                  <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/CinemaManagement" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <LocationOnIcon className="w-6 h-6 text-gray-500 transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                     <span className="flex-1 ml-3 whitespace-nowrap">Cinema</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/RoomsManagement" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <CameraIndoorIcon className="w-6 h-6 text-gray-500 transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                     <span className="flex-1 ml-3 whitespace-nowrap">Room</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/SeatsManagement" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <ChairIcon className="w-6 h-6 text-gray-500 transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                     <span className="flex-1 ml-3 whitespace-nowrap">seat</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/FilmsManagement" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <MovieIcon className="w-6 h-6 text-gray-500 transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                     <span className="flex-1 ml-3 whitespace-nowrap">Film</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/TypeManagement" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <CategoryIcon className="w-6 h-6 text-gray-500 transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                     <span className="flex-1 ml-3 whitespace-nowrap">Type</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/ServicesManagement" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <FastfoodIcon className="w-6 h-6 text-gray-500 transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                     <span className="flex-1 ml-3 whitespace-nowrap">service</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink activeStyle={{ backgroundColor: 'rgb(243 244 246)', color: 'black' }} to="/DeliveryBoyManagement" className="flex items-center hover:text-black p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <DiscountIcon className="w-6 h-6 text-gray-500 transition -mt-2 duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" />
                     <span className="flex-1 ml-3 whitespace-nowrap">coupon</span>
                  </NavLink>
               </li>
            </ul>
         </div>
      </aside>
   );
}
