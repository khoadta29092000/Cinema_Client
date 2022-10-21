import DefaultHeaderDashboard from 'components/DefaultHeaderDashboard';
import Content from 'components/DeliveryBoyDetail/Content';
import DefaultNavbarAdmin from 'components/DefaultNavbarAdmin';
import { React, useState, } from 'react';
import Modal from '@mui/material/Modal';
import DefaultFooterDashboard from 'components/DefaultFooterDashboard';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Header from 'components/DeliveryBoyDetail/Header';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

export default function DeliveryBoyDetail() {
    const [openNav, setOpenNav] = useState(false);
    const handleClose = () => setOpenNav(false);

    function callbackFunction(childData) {
        setOpenNav(childData);
        console.log("111111111111111", openNav)
    }

    let modal;
    if (openNav == true) {
        modal = (<Modal
            keepMounted
            open={openNav}
            onClose={handleClose}
            className={openNav == true ? `xl:hidden visible ` : ""}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <DefaultNavbarAdmin />
        </Modal>)
    }

    return (
        <>
            <div className=' grid grid-cols-12'>
                <div className=" invisible xl:visible absolute w-64 z-20  bg-lightblue2">
                    <DefaultNavbarAdmin className="" />
                    {modal}
                </div>
                <main className="ml-0 mb-0 bg-gray-100  w-screen overflow-y-auto h-screen ">
                    <div className='absolute   z-10'>
                        <DefaultHeaderDashboard parentCallback={callbackFunction} className="" />
                    </div>
                    <div className='  ml-0 xl:ml-64  mt-28 text-white ' role="presentation" onClick={handleClick}>
                        <Breadcrumbs className='pl-5' aria-label="breadcrumb">
                            <Link underline="hover" to="/" className='hover:underline' color="inherit" >
                                Home
                            </Link>
                            <Link underline="hover" to="/DeliveryBoyManagement" className='hover:underline' color="inherit" >
                            Delivery Boy
                            </Link>
                            <Typography color="text.primary">Detail</Typography>
                        </Breadcrumbs>
                    </div>
      
                    <div className='mb-12'>
                       <Content />
                    </div>
                    <DefaultFooterDashboard
                    />
                </main>
            </div>
        </>
    );
}
