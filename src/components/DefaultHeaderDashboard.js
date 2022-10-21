import { React, useState, useRef, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Button1 from '@material-tailwind/react/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Link } from 'react-router-dom';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom';

export default function Header(props) {
    const history = useHistory();
    const [openNav, setOpenNav] = useState(false);
    const [profileList, setProfileList] = useState("");
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    let id2 = parseJwt(localStorage.getItem('token'))
    let prop = 'Id'
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
            console.log("aa aaaaaaaaaaaaaaa", profileList)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    useEffect(() => {
        featchProfile();
        setOpenNav(props.dataOpenNav);
      }, [openNav]);
    const handleOpenNav = () => {
        setOpenNav(!openNav);
        props.parentCallback(!openNav);
       
    };
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    console.log("--------------", openNav)

    const closeNav = () => {
        props.parentCallback(!openNav);
        setOpenNav(!openNav);
    };

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
        localStorage.removeItem('user-token');
        history.push("/");

    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    return (
        <div className="bg-lightblue2 text-white fixed z-50  w-screen ">
            <div className={' visible xl:invisible absolute   ml-5 pt-3   font-bold text-3xl'}>
                <MenuIcon onClick={handleOpenNav} />
            </div>
         
                 
                        <Button1
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="transparent"
                        className=" text-black float-right  h-16 w-56 z-50 ml-2"
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
                                        <Link to="/ProfileDashboard">
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
    );
}
