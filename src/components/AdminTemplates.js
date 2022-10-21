import Header from 'components/DefaultHeaderDashboard';
import DefaultNavbarAdmin from 'components/DefaultNavbarAdmin';
import { React, useState, } from 'react';
import Modal from '@mui/material/Modal';
import DefaultFooterDashboard from 'components/DefaultFooterDashboard';


export default function AdminTemplates(props) {
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
            <div className=' grid  grid-cols-12'>
                <div className=" invisible xl:visible absolute w-64  z-20 bg-lightblue2">
                    <DefaultNavbarAdmin className="" />
                    {modal}
                </div>
                <main className="ml-0 mb-0 bg-gray-100 w-screen overflow-y-scroll  h-screen ">
                    <div className='absolute z-10'>
                        <Header parentCallback={callbackFunction} className="" />
                    </div>
                    <div className=' z-10 mb-20 '>
                    {props.children}
                    </div>
                    <DefaultFooterDashboard />
                </main>
            </div>
            
        </>
    );
}
