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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Search from 'components/Search';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';
import { useEffect, useState } from "react";


import Autocomplete from '@mui/material/Autocomplete';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const columns = [
    { id: 'SchedulingId', label: "SchedulingId", minWidth: 50 },
    { id: 'Date', label: "Date", minWidth: 100 },
    { id: 'Room', label: "Room", minWidth: 100 },
    { id: 'Cinema', label: "Cinema", minWidth: 100 },
    { id: 'Time', label: "Time", minWidth: 100 },
    { id: 'Film', label: "Film", minWidth: 150 },
    { id: 'Active', label: "Active", minWidth: 100 },
    { id: 'View', label: "View", minWidth: 100 },

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
    const [area, setArea] = React.useState('');
    const [search, setSearch] = useState("");
    const [id, setId] = useState("");
    const [productId, setProductId] = useState("");

    const [deliveryBoy, setDeliveryBoy] = React.useState('');
    const [deliveryTripId, setDeliveryTripId] = React.useState('');
    const [slotId, setSlotId] = React.useState('');
    const [packageId, setPackageId] = React.useState('');
    const [packageOrderId, setPackageOrderId] = React.useState('');
    const [packageName, setpackageName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [productName, setProductName] = React.useState("");
    const [productImg, setProductImg] = React.useState("");
    const [statusOrder, setStatusOrder] = React.useState('');
    const [dataRoom, setDataRoom] = useState([]);
    const [dataScheduling, setDataScheduling] = useState([]);
    const [dataPackageorder, setDataPackageorder] = useState([]);
    const [dataPackage, setDataPackage] = useState([]);
    const [dataCinema, setDataCinema] = useState([]);
    const [dataAcc, setDataAcc] = useState([]);
    const [dataFilm, setDataFilm] = useState([]);
    const [dataFilmDetail, setDataFilmDetail] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [message, setMess] = useState(false);
    const [status, setStatus] = useState("success");
    const [alert, setAlert] = useState(false);
    async function handleUpdateStatus(data) {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Scheduling/UpdateActive?id=${data}`;

            const res = await fetch(requestURL, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            }).then(res => res.json())
                .then(result => {

                    if (result) {
                        if (result?.statusCode == 200) {
                            setMess(result?.message)
                            setAlert(true)
                            setStatus("success")
                            featchSchedulingList();
                        }

                    } else {
                        alert("Update UnSuccessfullly")
                    }
                    return res

                });


        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    const handleClickOpen = (data) => {
        console.log("111111", data);
        dataFilmDetail.map(item => {
            if (item.orderId == data.id) {
                dataProduct.map(product => {
                    if (product.id == item.productId) {
                        setProductImg(product.img)
                        setProductName(product.title)
                    }
                })
            }
        })
        setOpen(true);
        setId(data.id);
        setDeliveryTripId(data.deliveryTripId);
        setPackageOrderId(data.pacakeOrderId);
        setSlotId(data.slotId);
        setSelectedValue(data);
    };



    const handleClose = () => {
        setOpen(false);

    };
    const handleChangeArea = (event) => {
        setArea(event.target.value);
    };
    const handleChangeDeliveryBoy = (event) => {
        setDeliveryBoy(event.target.value);
    };
    const handleChangeSlot = (event) => {
        setSlotId(event.target.value);
    };
    console.log("qua da", dataCinema)
    function createData(data) {
        let SchedulingId = data.id;
        let Date = data.date.slice(8, 10) + "/" + data.date.slice(5, 7) + "/" + data.date.slice(0, 4);
        let Room;
        dataRoom.map(item => {
            if (data.roomId == item.id) {

                return Room = item.title

            }
        })
        let Cinema;
        dataCinema.map(item => {
            if (data.cinemaId == item.id) {

                return Cinema = item.name;
            }
        })
        let Time = data.startTime.slice(0, 5) + " - " + data.endTime.slice(0, 5);

        let Film;
        dataFilm.map(item => {
            if (data.filmId == item.id) {

                return Film = item.title

            }
        })
        let Active = (<button className="text-white  outline-none bg-black cursor-pointer rounded-lg   h-8 w-8" onClick={() => handleUpdateStatus(data.id)}>
            {data.active == true ? <PublicIcon /> : <PublicOffIcon />}
        </button>);

        let View = (<button className="text-white  outline-none bg-blue-600 rounded-lg  cursor-pointer   h-8 w-8" onClick={() => handleClickOpen(data)}>
            <RemoveRedEyeIcon />
        </button>);


        return { SchedulingId, Date, Room, Cinema, Time, Film, Active, View };
    }
    let Id;
    if (selectedValue.id != undefined) {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5' onChange={e => setId(e.target.value)} defaultValue={selectedValue.id} disabled id="outlined-basic" label="Id" variant="outlined" />
        </div>)
    } else {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5' onChange={e => setId(e.target.value)} defaultValue={selectedValue.id} id="outlined-basic" label="Id" variant="outlined" />
        </div>)
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
    const dataSlot = [
        { id: 1, name: "  Morning", location: "139-141 Nguyễn Gia Trí, P.25, Q.Bình Thạnh, TP. Hồ Chí Minh" },
        { id: 2, name: "Noon", location: "161 Xa Lộ Hà Nội, P. Thảo Điền, Q.2, TP. Hồ Chí Minh" },
        { id: 3, name: "Afternoon", location: "1311 Ông Cao Thắng, P.Tân Kì, Q.10, TP. Hồ Chí Minh" },

    ]

    useEffect(() => {
        featchSchedulingList();
        featchAccList();
        featchCinemaList();
        featchRoomList();
        featchFilmList();

        setPage(0);
    }, [search]);

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

            setDataScheduling(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

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
    async function featchCinemaList() {
        try {
            const requestURL = `http://www.cinemasystem.somee.com/api/Cinema`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataCinema(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchRoomList() {
        try {
            const requestURL = `http://www.cinemasystem.somee.com/api/Room`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataRoom(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

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

            setDataFilm(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    const [value, setValue] = React.useState('');

    const handleChange = (newValue) => {
        setValue(newValue);
    };


    const rows1 = dataScheduling.map((data, index) => {
        return (createData(data));
    })

    const rows = [
    ];

    const callbackSearch = (childData) => {
        setSearch(childData)

    };
    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlert(false);
    };
    const RoomOptions = dataRoom.map((item, index) => ({
        id: item.id,
        label: item.title
    }))
    const CinemaOptions = dataCinema.map((item, index) => ({
        id: item.id,
        label: item.name
    }))
    const filmOptions = dataFilm.map((item, index) => ({
        id: item.id,
        label: item.title
    }))
    return (
        <section className=" ml-0 xl:ml-64  px-5 pt-10  ">
            <Snackbar open={alert} autoHideDuration={4000} onClose={handleCloseAlert} className="float-left w-screen">
                <Alert onClose={handleCloseAlert} severity={status} >
                    {message}
                </Alert>
            </Snackbar>
            <Paper className='' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableHead >
                    <div className='pt-2 pl-4 block font-semibold text-xl'>
                        Scheduling
                    </div>
                </TableHead>
                <div className='float-left ml-5 gap-5 my-6   lg:flex '>
                    <div className='col-span-1 outline-none hover:outline-none'>

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={RoomOptions}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Room" />}
                        />


                    </div>
                    <div className='col-span-2'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={CinemaOptions}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Cinema" />}
                        />


                    </div>
                    <div className='col-span-1'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={filmOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Film" />}
                        />

                    </div>
                    <div className='col-span-1'>
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="" onClose={handleClose}>
                        Information Order Detail
                    </BootstrapDialogTitle>
                    <DialogContent dividers >

                        {Id}


                        <div className='max-w-5xl my-5 mx-auto'>
                            <TextField className='w-96 my-5' defaultValue={productName} autoComplete='off' id="outlined-basic" label="Product" variant="outlined" />
                        </div>
                        <div className='max-w-5xl my-5 mx-auto'>
                            <img alt="" className=' h-64 w-64 my-5' src={productImg} />
                        </div>
                    </DialogContent>

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