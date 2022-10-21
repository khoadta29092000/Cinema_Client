import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';



export default function Header() {

    return (
        <section className=" ml-0 xl:ml-64  px-5 pt-10  ">
        <Paper className=' grid  grid-cols-5'  >
            <div className=' px-5 col-span-2'></div>    
                <div className="h-64 mt-4 ">
                    <Avatar
                        className=''
                        alt="Remy Sharp"
                        sx={{ width: 160, height: 160 }}
                    > <p className="text-5xl">a</p>  </Avatar>
                    <h2 className='font-bold ml-6 text-3xl my-3'> Anh Khoa</h2>
                    <p className='ml-10'>0335739928</p>
                </div>
            <div className='col-span-2'></div>
            </Paper>
            </section>
    );
}