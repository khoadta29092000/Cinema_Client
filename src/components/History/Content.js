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
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Card } from "@mui/material";
import { Link } from 'react-router-dom';
import Search from 'components/Search';
import { type } from '@testing-library/user-event/dist/type';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const columns = [

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

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function Content() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState([]);
    const [dataTicked, setDataTicked] = useState([]);
    const [dataAcc, setDataAcc] = useState([]);
    const [dataFilm, setFilm] = useState([]);
    const [dataServiceInBill, setDataServiceInBill] = useState([]);
    const [dataScheduling, setScheduling] = useState([]);
    const [dataCoupon, setDataCoupon] = useState([]);
    const [dataBill, setDataBill] = useState([]);
    const [Account, setAcccount] = useState(0);
    const [Coupon, setCoupon] = useState("");
    const [dataSeat, setDataSeat] = useState([]);
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


        let View = (<button className="text-white  outline-none bg-yellow-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
            <RemoveRedEyeIcon />
        </button>);


        return { Bill, EmployeeChecked, Film, Date, Scheduling, Coupon, Total, View };
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleClose = () => {
        setOpen(false);



    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = (data) => {
        setOpen(true);
        setSelectedValue(data);
    };
    useEffect(() => {
        featchAccList();
        featchFilmList();
        featchBillList();
        featchSchedulingList();
        featchcouponList();
        featchDataServiceInBillList();
        featchSeatList();
        setPage(0);
        if (selectedValue.id != undefined) {
            featchTickedList();
        }
    }, [selectedValue]);
    async function featchDataServiceInBillList() {
        try {
            const requestURL = `http://cinemasystem.somee.com/api/ServiceInBill/ServiceInBill`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataServiceInBill(responseJSON.data)



        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchSeatList() {
        try {
            const requestURL = `http://www.cinemasystem.somee.com/api/Seat`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataSeat(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchTickedList() {
        try {

            const requestURL = `http://www.cinemasystem.somee.com/api/Ticked?BillId=${selectedValue.id}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataTicked(responseJSON.data)



        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchAccList() {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Account`;

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


            const requestURL = `http://www.cinemasystem.somee.com/api/Scheduling`;

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
            const requestURL = `http://www.cinemasystem.somee.com/api/Film`;

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
            const requestURL = `http://www.cinemasystem.somee.com/api/Coupon`;

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
            const requestURL = `http://www.cinemasystem.somee.com/api/Bill?AccountId=${accid}&CouponId=${Coupon.id == undefined ? "" : Coupon.label}`;

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
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    let id2 = parseJwt(localStorage.getItem('token'))
    let prop = 'Id'
    let proprole = 'role'
    const rows1 = dataBill.map((data, index) => {

        return (createData(data));

    })
    const rows2 = dataBill.map((data, index) => {
        dataTicked.map(item => {
            if (item.billId == data.id) {
                console.log("----------", item.billId == data.id)
                return item.price
            }
        })
    })
    const rows = [
    ];
    console.log("----------", rows2)
    const callbackSearch = (childData) => {


    };
    const all = [{ id: 0, fullName: "All" }];

    const AccOptions = dataAcc.map((item, index) => ({
        id: item.id,
        label: item.fullName
    }))
    AccOptions.unshift({ id: 0, label: "All" })


    const CoupomOptions = dataCoupon.map((item, index) => ({
        id: index + 1,
        label: item.id
    }))
    CoupomOptions.unshift({ id: null, label: "All" })
    console.log("ngu123")



    return (
        <section className=" ml-0 xl:ml-64 w-full  px-5 pt-10  ">
            <Paper className='' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableHead >
                    <div className='pt-2 pl-4 block font-semibold text-2xl'>
                        History
                    </div>
                </TableHead>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    className="max-h-full"
                >

                    <BootstrapDialogTitle id="" onClose={handleClose}>
                        Bill Details
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        {dataTicked.map((item, index) => {
                            return (
                                <Card key={index} className=" cursor-pointer w-64 mb-5 text-white" sx={{ height: 120, witdh: 400 }}        >
                                    <CardContent className='text-black ' >
                                        <Typography gutterBottom variant="h5" component="div">
                                            Seat: {dataSeat.map(item1 => {
                                                if (item1.id == item.seatId) {
                                                    return (item1.title)
                                                }
                                            })}
                                        </Typography>
                                        <Typography variant="body2" color="">
                                            Price: {item.price}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            )
                        })}

                        {dataServiceInBill.map((item, index) => {
                            if (selectedValue.id == item.billId)
                                return (

                                    <div >
                                        <Card key={item.id} className=" cursor-pointer mb-5 text-white" sx={{ height: 112 }} >
                                            <CardContent className='text-black ' >
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Service: {item.serviceName}
                                                </Typography>
                                                <Typography variant="body2" color="">

                                                </Typography>
                                                <Typography variant="body2" color="">

                                                </Typography>
                                                <Typography variant="body2" color="">
                                                    Quantity: {item.quantity}
                                                </Typography>
                                            </CardContent>

                                        </Card>
                                    </div>

                                )
                        })}
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit'>
                            Save
                        </Button>
                    </DialogActions>

                </BootstrapDialog>


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
                    rowsPerPageOptions={[5]}
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