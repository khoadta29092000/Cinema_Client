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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import Search from 'components/Search';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from 'firebase';
import { v4 } from "uuid";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { data } from 'autoprefixer';

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
    { id: 'Id', label: "Id", minWidth: 150 },
    {
        id: 'Title',
        label: 'Title',
        minWidth: 150,
    },
    {
        id: 'Room',
        label: 'Room',
        minWidth: 100,
    },
    {
        id: 'Active',
        label: 'Active',
        minWidth: 100,
    },
    {
        id: 'Edit',
        label: 'Edit',
        minWidth: 100,
    },
    {
        id: 'Delete',
        label: 'Delete',
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
    const [status, setStatus] = useState("");
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [roomId, setRoomId] = useState("");
    const [dataCinema, setDataCinema] = useState([]);
    const [dataSeat, setDataSeat] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);
    const [search, setSearch] = useState("");
    const [click, SetClick] = useState(false)
    const [selectedImage, setSelectedImage] = useState("");
    const [alert, setAlert] = useState(false);
    const handleClickOpen = (data) => {
        console.log("111111", data);
        setOpen(true);
        setSelectedValue(data);
        setSelectedImage(data.img);
        setRoomId(data.roomId)
        setId(data.id)
        setTitle(data.title)
        setDescription(data.description)
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedImage(undefined);
        SetClick(false);
    };

    const body = {
        id: id,
        title: title,
        description: description,
        roomId: roomId,
        active: true
    };
    let Id;
    if (selectedValue.id != undefined) {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5' onChange={e => setId(e.target.value)} defaultValue={selectedValue.id} disabled id="outlined-basic" label="Id" variant="outlined" />
        </div>)
    }
    useEffect(() => {
        featchCinemaList();
        featchRoomList();
        featchSeatList();
        setPage(0);
    }, [search]);
    function createData(data) {
        let Id = data.id;
        let Title = data.title;
        let Room;

        dataRoom.map(item => {
            if (data.roomId == item.id) {

                return Room = item.title

            }
        })
        let Active = (<button className="text-white  outline-none bg-black cursor-pointer rounded-lg   h-8 w-8" onClick={() => handleUpdateStatus(data.id)}>
            {data.active == true ? <PublicIcon /> : <PublicOffIcon />}
        </button>);
        let Edit = (<button className="text-white  outline-none bg-blue-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
            <EditIcon />
        </button>);
        let Delete = (<button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8" onClick={() => handleDelete(data)}>
            <DeleteIcon />
        </button>);

        return { Id, Title, Room, Active, Edit, Delete };
    }
    async function handleUpdateStatus(data) {
        try {


            const requestURL = `http://www.cinemasystem2.somee.com/api/Seat/UpdateActive?id=${data}`;

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
                            featchSeatList();
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



    const rows1 = dataSeat.map((data, index) => {
        return (createData(data))
    })
    async function featchCinemaList() {
        try {


            const requestURL = `http://www.cinemasystem2.somee.com/api/Cinema`;

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
    async function featchSeatList() {
        try {


            const requestURL = `http://www.cinemasystem2.somee.com/api/Seat?search=${search}`;

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

    async function featchRoomList() {
        try {


            const requestURL = `http://www.cinemasystem2.somee.com/api/Room`;

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


    const [progresspercent, setProgresspercent] = useState(0);


    const [errorr, setError] = useState("false")
    const [message, setMess] = useState(false)
    async function handleUpdateOrCreate() {

        if (selectedValue.id != undefined) {
            const res = await fetch(`http://www.cinemasystem2.somee.com/api/Seat/${selectedValue?.id}`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(result => {

                    if (result) {
                        if (result?.statusCode == 200) {
                            setMess("Update Successfullly")
                            setAlert(true)
                            setStatus("success")
                            handleClose();
                            featchSeatList();
                        } if (result?.statusCode == 409) {
                            setError(result?.message)

                        }

                    } else {
                        alert("Update UnSuccessfullly")
                    }
                    return res

                })
                .catch((error) => {
                    throw ('Invalid Token')
                })
            return body

        } else {
            const res = await fetch(`http://www.cinemasystem2.somee.com/api/Seat`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(result => {

                    if (result) {
                        if (result?.statusCode == 200) {
                            setMess("Add Successfullly")
                            setAlert(true)
                            setStatus("success")
                            handleClose();
                            featchSeatList();
                        } if (result?.statusCode == 409) {
                            setError(result?.message)

                        }

                    } else {
                        alert("Add UnSuccessfullly")
                    }
                    return res

                })
                .catch((error) => {
                    throw ('Invalid Token')
                })
            return body
        }

    }
    async function handleDelete(data) {

        let res = await fetch(`http://www.cinemasystem2.somee.com/api/Seat/${data?.id}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(res => res.json())
            .then(result => {

                if (result?.statusCode === 200) {
                    setMess(result.content)
                    setAlert(true)
                    featchSeatList();
                } else {
                    alert("delete thất bại")
                    // setError(result.message)
                    // alert("tài khoản hoặc mật khẩu sai kìa")
                }
                return res

            })
            .catch((error) => {
                throw ('Invalid Token')
            })
        return res
    }
    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlert(false);
    };
    const callbackSearch = (childData) => {
        setSearch(childData)

    };

    

   
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
                        Seat Management
                    </div>
                </TableHead>
                <button className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4' onClick={handleClickOpen}>
                    Add Seat
                </button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby=""
                    open={open}
                >
                    <BootstrapDialogTitle id="" onClose={handleClose}>
                        Add Seat
                    </BootstrapDialogTitle>
                    <DialogContent dividers >

                        {Id}

                        <div className='max-w-5xl my-5 mx-auto'>
                            <TextField className='w-96 my-5' onChange={e => setTitle(e.target.value)} defaultValue={selectedValue.title} autoComplete='off' id="outlined-basic" label="Title" variant="outlined" />
                        </div>
                        <div className='max-w-5xl my-5 mx-auto'>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Room</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={roomId}
                                        label="Supplier"
                                        onChange={e => setRoomId(e.target.value)}
                                    >

                                        {dataRoom.map((cate, index) => {
                                            
                                                return (
                                                    <MenuItem value={cate.id}>{cate.title + "," + cate.cinemaId}</MenuItem>
                                                )
                                        })}

                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='max-w-5xl my-5 mx-auto'>
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
                            <textarea id="message" onChange={e => setDescription(e.target.value)} defaultValue={selectedValue.description} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleUpdateOrCreate}>
                            Save
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
                <div className='pr-5 my-6 float-right'>

                    <Search parentCallback={callbackSearch} />
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


