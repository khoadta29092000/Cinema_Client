import { React, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import NavLink from '@material-tailwind/react/NavLink';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import Icon from '@material-tailwind/react/Icon';
import Button1 from '@material-tailwind/react/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import logo from "../assets/img/logo.png"




export default function DefaultNavbar() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [profileList, setProfileList] = useState("");
    const anchorRef = useRef(null);
    useEffect(() => {
        if( localStorage.getItem("token") != null){
            featchProfile();
        }
        

    }, [name]);
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    let id2 = parseJwt(localStorage.getItem('token'))
    let prop = 'Id'
    let proprole = 'role' 
    console.log("ngu ", id2)
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
            console.log("ko", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    function handleLogoutClick() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    const [openNavbar, setOpenNavbar] = useState(false);
    let adminDashboard;
    let buttonSignIn;
    let buttonSingUp;
    let img;
    if (localStorage.getItem(`token`)) {
        img = (
            <div>
                
                        <Button1
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            color="transparent"
                            className=" text-white ml-2"
                            ripple="dark"
                        >
                            <Stack direction="row" spacing={2}>
                                <Avatar alt="Cindy Baker" src={profileList.avatar} />
                            </Stack>
                            <Typography color="White" className='pl-2'>{profileList.fullName}</Typography>
                        </Button1>
                
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}

                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem >
                                            <Link to="/profiledashboard">
                                                Dashboard
                                            </Link>
                                        </MenuItem>
                                        <MenuItem >
                                            <Link to="/profile">
                                                Profile
                                            </Link>
                                        </MenuItem>
                                       
                                       
                                        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        )
    } else {

        buttonSignIn = (
            <Link
                to="/login"

                rel="noreferrer"
            >
                <Button1
                    color="lightBlue"
                    className=" text-white ml-2"
                    ripple="dark"
                >
                    Sing In
                </Button1>
            </Link>
        )
        buttonSingUp = (
            <Link
                to="/register"
                rel="noreferrer"
            >
                <Button1
                    color="lightBlue"
                    className="bg-white mt-5 lg:mt-0 text-black ml-2"
                    ripple="dark"
                >
                    Sing Up
                </Button1>
            </Link>
        )
    }
    if (localStorage.getItem("token") != null) {
        if(id2[proprole]){
            adminDashboard = (
                <Link to="/Admindashboard">
                    <NavLink
                        rel="noreferrer"
                        ripple="light"
                    >
                        <DashboardIcon
    
                            size="xl"
                        />
                        &nbsp;Admin Dashboard
                    </NavLink>
                </Link>
            )
        }
       
    }

    return (
        <Navbar color="transparent" navbar>
            <NavbarContainer>
                <NavbarWrapper>

                    <NavbarBrand className=""><h2 className='h-full text-2xl tracking-widest'>DDKV</h2></NavbarBrand>

                    <NavbarToggler
                        className="hidden"
                        onClick={() => setOpenNavbar(!openNavbar)}
                        color="white"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        {adminDashboard}
                        <div className="flex flex-col lg:flex-row lg:items-center">
                            <Link to="/">
                                <NavLink
                                    ripple="light"
                                    className="my-link"
                                >
                                    <Icon name="home" size="2xl" />
                                    &nbsp;Home Page
                                </NavLink></Link>
                            <Link to="/Aboutus">
                                <NavLink
                                    ripple="light"
                                    className="my-link"
                                >
                                    <Icon name="apps" size="2xl" />
                                    &nbsp;About Us
                                </NavLink></Link>
                             <div className="text-white">
                                <Dropdown
                                    color="transparent"
                                    size="sm"
                                    buttonType="link"
                                    buttonText={
                                        <div className="py-2.5 font-medium flex items-center">
                                            <Icon
                                                name="view_carousel"
                                                size="2xl"
                                                color="white"
                                            />
                                            <span className="ml-2">
                                                items
                                            </span>
                                        </div>
                                    }
                                    ripple="light"
                                >
                                    <Link to="/Product">
                                        <DropdownItem color="lightBlue">
                                            Product
                                        </DropdownItem>
                                    </Link>
                                    <Link to="/Package">
                                        <DropdownItem color="lightBlue">
                                            Package
                                        </DropdownItem>
                                    </Link>

                                </Dropdown>
                            </div> 

                            <Link to="/ServiceAreas">
                                <NavLink


                                    rel="noreferrer"
                                    ripple="light"
                                >
                                    <LocationOnIcon />
                                    <div className="">Areas</div>
                                </NavLink>
                            </Link>
                             <div className="text-white mr-5">
                                <Dropdown
                                    color="transparent"
                                    size="sm"
                                    buttonType="link"
                                    buttonText={
                                        <div className="py-2.5 font-medium flex items-center">
                                            <span className="ml-2">
                                                More
                                            </span>
                                        </div>
                                    }
                                    ripple="light"
                                >

                                    <Link to="/ContractUs">
                                        <DropdownItem color="lightBlue">
                                            Contract Us
                                        </DropdownItem>
                                    </Link>
                                    <Link to="/FAQs">
                                        <DropdownItem color="lightBlue">
                                            FAQs
                                        </DropdownItem>
                                    </Link>
                                </Dropdown>
                            </div>  
                            <Dropdown
                                color="transparent"
                                size="sm"
                                buttonType="link"
                                buttonText={
                                    <div className="py-2.5 font-medium flex items-center">

                                        <SearchIcon className='text-white cursor-pointer  mb-5 lg:mb-0 mb ' />
                                    </div>
                                }
                                ripple="light"
                            >
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search Products"
                                        inputProps={{ 'aria-label': 'Search Product' }}
                                    />
                                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>

                                </Paper>
                            </Dropdown>
                            {buttonSignIn}
                            { buttonSingUp}
                            {img}


                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}
