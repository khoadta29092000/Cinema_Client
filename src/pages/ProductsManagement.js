
import Header from 'components/DefaultHeaderDashboard';
import Content from 'components/ProductsManagement/Content';
import DefaultNavbarAdmin from 'components/DefaultNavbarAdmin';
import { React, useState, } from 'react';
import Modal from '@mui/material/Modal';
import DefaultFooterDashboard from 'components/DefaultFooterDashboard';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

export default function ProductsManagement() {
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
                        <Header parentCallback={callbackFunction} className="" />
                    </div>
                    <div className='  ml-0 xl:ml-64  mt-28 text-white ' role="presentation" onClick={handleClick}>
                        <Breadcrumbs className='pl-5' aria-label="breadcrumb">
                            <Link underline="hover" className='hover:underline' to="/" color="inherit" >
                                Home
                            </Link>
                            <Typography color="text.primary">Product</Typography>
                        </Breadcrumbs>
                    </div>
                    <div className='mb-12 mt-0'>
                        <Content />
                    </div>
                    <DefaultFooterDashboard
              />
                </main>
            </div>
        </>
    );
}
