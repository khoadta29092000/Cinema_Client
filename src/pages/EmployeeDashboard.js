
import Content from 'components/EmployeeDashboard/Content';
import Header from 'components/EmployeeDashboard/Header';
import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';
import { React, useState, useEffect} from 'react';


export default function EmployeeDashboard() {
    const [openNav, setOpenNav] = useState(false);
   
 
    return (
        <>
            <div className="absolute mb-20 bg-black w-full z-20">
                <DefaultNavbar />
            </div>
            <main className=' container max-w-4xl mx-auto grid grid-cols-3  p-24 pt-32 gap-4  '>
                <div className=' col-span-2  w-full   '>
                <Content  />
                </div>
                <div className='  w-full  bg-gray-200 h-600 mt-12'>
                  <Header />
                </div>
              
            </main>
            <DefaultFooter className="mt-20"  />

            </>
    );
}
