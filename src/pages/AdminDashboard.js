
import Content from 'components/Admindashboard/Content';
import AdminTemplates from 'components/AdminTemplates';
import { React, useState, } from 'react';


export default function AdminDashboard(props) {
    const [openNav, setOpenNav] = useState(false);
    

    return (
       
                   <AdminTemplates>
                    <Content />
                   </AdminTemplates>
    );
}
