import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Search from 'components/Search';
import { type } from '@testing-library/user-event/dist/type';
const columns = [
    { id: 'Bill', label: "Bill", minWidth: 50 },
    { id: 'EmployeeChecked', label: "Employee Checked", minWidth: 50 },
    {
        id: 'Film',
        label: 'Film',
        minWidth: 150,
    },
    {
        id: 'Date',
        label: 'Date',
        minWidth: 100,
    },
    {
        id: 'Scheduling',
        label: 'Scheduling',
        minWidth: 100,
    },
    {
        id: 'Coupon',
        label: 'Coupon',
        minWidth: 100,
    },
    {
        id: 'Total',
        label: 'Total',
        minWidth: 100,
    },
    {
        id: 'View',
        label: 'View',
        minWidth: 100,
    },

];


export default function Content() {

    const [dataAcc, setDataAcc] = useState([]);
    const [dataFilm, setFilm] = useState([]);
    const [dataScheduling, setScheduling] = useState([]);
    const [dataCoupon, setDataCoupon] = useState([]);
    const [dataBill, setDataBill] = useState([]);
    const [Account, setAcccount] = useState(0);
    const [Coupon, setCoupon] = useState("");
    function createData(data) {
        let EmployeeChecked;
        let Bill = data.id;
        let Film;
        let Date;
        let Scheduling;
        let Coupon = data.couponId;
        let Total = data.total.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ";
        dataAcc.map(item => {
            if (data.accountId == item.id) {
                return EmployeeChecked = item.fullName
            }
        })

        dataScheduling.map(item => {
            if (data.schedulingId == item.id) {

                dataFilm.map(item1 => {
                    if (item.filmId == item1.id) {
                        return Film = item1.title
                    }
                })
            }
        })
        dataScheduling.map(item => {
            if (data.schedulingId == item.id) {
                return Date = item.date.slice(8, 10) + "/" + item.date.slice(5, 7) + "/" + item.date.slice(0, 4)

            }
        })
        dataScheduling.map(item => {
            if (data.schedulingId == item.id) {
                return Scheduling = item.startTime.slice(0, 5) + " - " + item.endTime.slice(0, 5)

            }
        })


        let View = (<button className="text-white  outline-none bg-blue-600 rounded-lg   h-8 w-8">

            <Link to={{
                pathname: "/Bill/Details",
                state: {
                    name: data.id
                }
            }}> <RemoveRedEyeIcon /></Link>
        </button>);


        return { Bill, EmployeeChecked, Film, Date, Scheduling, Coupon, Total, View };
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    console.log("----------", page, rowsPerPage)
    useEffect(() => {
        featchAccList();
        featchFilmList();
        featchBillList();
        featchSchedulingList();
        featchcouponList();
        setPage(0);
    }, [Account, Coupon]);
    async function featchAccList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/Account`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataAcc(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchSchedulingList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/Scheduling`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setScheduling(responseJSON.data)

            console.log("ngu12", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchFilmList() {
        try {
            const requestURL = `http://cinemasystem2.somee.com/api/Film`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setFilm(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchcouponList() {
        try {
            const requestURL = `http://cinemasystem2.somee.com/api/Coupon`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataCoupon(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchBillList() {
        try {
            let accid;
            if (Account.id == undefined) {
                accid = 0;
            } else {
                accid = Account.id
            }
            const requestURL = `http://cinemasystem2.somee.com/api/Bill?AccountId=${accid}&CouponId=${Coupon.id == undefined ? "" : Coupon.label}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataBill(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    const rows1 = dataBill.map((data, index) => {
        return (createData(data));
    })

    const rows = [
    ];
    const callbackSearch = (childData) => {


    };
    const all = [{ id: 0, fullName: "All" }];
   
    const AccOptions = dataAcc.map((item, index) => ({
        id: item.id,
        label: item.fullName
    }))
    AccOptions.unshift({id:0,label:"All"})


    const CoupomOptions = dataCoupon.map((item, index) => ({
        id: index + 1,
        label: item.id
    }))
    CoupomOptions.unshift({id:null,label:"All"})
    console.log("ngu123")

 

    return (
        <section className=" ml-0 xl:ml-64  px-5 pt-10  ">
            <Paper className='' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableHead >
                    <div className='pt-2 pl-4 block font-semibold text-xl'>
                        Bill Management
                    </div>
                </TableHead>
                <div className=' flex float-left ml-5 gap-5 my-6 w-full'>
                    <div className='col-span-5 outline-none hover:outline-none'>
                        <Autocomplete
                            disableClearable 
                            id="combo-box-demo"
                            options={AccOptions}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params}   label="Account" />}
                            onChange={(event, value) => setAcccount(value)}
                        />


                    </div>
                    <div className=' col-span-1 '>
                        <Autocomplete
                           disableClearable
                            id="combo-box-demo"
                            options={CoupomOptions}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Coupon" />}
                            onChange={(event, value) => setCoupon(value)}
                        />
                    </div> 
                    
                </div>


                <TableContainer sx={{}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className='z-0'>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}

                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows1
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                const value = row[column.id];


                                                return (
                                                    <TableCell key={column.id} >
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows1.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </section>
    );
}