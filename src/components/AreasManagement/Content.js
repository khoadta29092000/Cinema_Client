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
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { display } from '@mui/system';
import { useEffect, useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Search from 'components/Search';


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
    {
        id: 'Title',
        label: 'Title',
        minWidth: 150,
    },
    {
        id: 'Adress',
        label: 'Adress',
        minWidth: 300,
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
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [slotId, setSlotId] = useState("");
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [alert, setAlert] = useState(false);
    const validName = new RegExp(/^.{6,30}$/);
    const validDes = new RegExp(/^.{6,300}$/);
    const body = {
        id: id,
        title: title,
        address: address,
        description: description,
        slotId: slotId

    };
    const bodyCreate = {
        id: id,

        title: title,
        address: address,
        description: description,
        slotId: slotId
    };
    const handleClickOpen = (data) => {
        console.log("111111", data);
        setOpen(true);
        setId(data.id);
        setTitle(data.title);
        setAddress(data.address);
        setDescription(data.description);
        setSlotId(data.slotId);
        setSelectedValue(data)
    };
    const handleClose = () => {
        setOpen(false);

    };
    function createData(data) {
        let Title = data.title;
        let Adress = data.address;
        let Description = data.description;
        let Edit = (<button className="text-white  outline-none bg-blue-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
            <EditIcon />
        </button>);
        let Delete = (<button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8" onClick={() => handleDelete(data)}>
            <DeleteIcon />
        </button>);

        return { Title, Adress, Edit, Delete };
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

    const slot = [
        { id: 1, name: "  Morning : 6:30 AM - 7:00 AM", location: "139-141 Nguyễn Gia Trí, P.25, Q.Bình Thạnh, TP. Hồ Chí Minh" },
        { id: 2, name: "Noon : 12:00 AM - 12:30 AM ", location: "161 Xa Lộ Hà Nội, P. Thảo Điền, Q.2, TP. Hồ Chí Minh" },
        { id: 3, name: "Afternoon : 5:30 AM - 6:00 AM ", location: "1311 Ông Cao Thắng, P.Tân Kì, Q.10, TP. Hồ Chí Minh" },

    ]
    useEffect(() => {
        featchStationist();
        setPage(0);
    }, [search]);

    async function featchStationist() {
        try {


            const requestURL = `http://www.subcriptionmilk.somee.com/api/Stations/Getallstations?search=${search}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setData(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    function TitleExists(title) {
        return data.some(function (el) {
            return el.title.toLowerCase() == title.toLowerCase();
        });
    }
    function IdExists(id) {
        return data.some(function (el) {
            return el.id == id;
        });
    }

    const rows1 = data.map((data, index) => {
        return (createData(data))
    })

    const [desErrorr, setPhoneErrorr] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [message, setMess] = useState(false)
    const [nameExists, setNameExists] = useState(false)
    const [idExists, setIdExists] = useState(false)
    async function handleUpdateOrCreate() {
        if (!validName.test(title) || !validName.test(address)) {
            setNameError(true)
            setPhoneErrorr(false)
            setNameExists(false)
            setIdExists(false)
        } else if (!validDes.test(description)) {
            setNameError(false)
            setPhoneErrorr(true)
            setNameExists(false)
            setIdExists(false)
        } else if (TitleExists(title) == true && selectedValue.id == undefined) {
            setNameError(false)
            setPhoneErrorr(false)
            setNameExists(true)
            setIdExists(false)
        } else if (IdExists(id) == true && selectedValue.id == undefined) {
            setNameError(false)
            setPhoneErrorr(false)
            setNameExists(false)
            setIdExists(true)
        }
        else {
            setNameExists(false)
            setIdExists(false)
            setNameError(false)
            setPhoneErrorr(false)
            if (selectedValue.id != undefined) {
                const res = await fetch(`http://www.subcriptionmilk.somee.com/api/Stations/update`, {
                    method: `PUT`,
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(body)
                }).then(res => res.json())
                    .then(result => {

                        if (result) {
                            if (result?.statusCode == 201) {
                                setMess("Update Successfullly")
                                setAlert(true)
                                handleClose();
                                featchStationist();
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
                const res = await fetch(`http://www.subcriptionmilk.somee.com/api/Stations/create`, {
                    method: `POST`,
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(bodyCreate)
                }).then(res => res.json())
                    .then(result => {

                        if (result) {
                            if (result?.statusCode == 201) {
                                setMess("Add Successfullly")
                                setAlert(true)
                                handleClose();
                                featchStationist();
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
    }
    async function handleDelete(data) {

        let res = await fetch(`http://www.subcriptionmilk.somee.com/api/Stations/${data?.id}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',

            },
        }).then(res => res.json())
            .then(result => {

                if (result?.statusCode === 200) {
                    setMess(result.content)
                    setAlert(true)
                    featchStationist();
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
                <Alert onClose={handleCloseAlert} severity="success" >
                    {message}
                </Alert>
            </Snackbar>
            <Paper className=' ' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableHead >
                    <div className='pt-2 pl-4 block font-semibold text-xl'>
                        Station Management
                    </div>
                </TableHead>
                <button className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4' onClick={handleClickOpen}>
                    Add Station
                </button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="" onClose={handleClose}>
                        Station Detail
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        {nameError && <div className='text-red-600 ml-11 mb-5 text-xl'>Text 6 - 30 character </div>}

                        {desErrorr && <div className='text-red-600 ml-11 mb-5 text-xl'>Description 6 - 300 character</div>}
                        {nameExists && <div className='text-red-600 ml-11 mb-5 text-xl'>Title Exists </div>}

                        {idExists && <div className='text-red-600 ml-11 mb-5 text-xl'>Id Exitsts</div>}
                        {Id}

                        <div className='max-w-5xl my-5 mx-auto'>
                            <TextField className='w-96 my-5' onChange={e => setTitle(e.target.value)} defaultValue={selectedValue.title} id="outlined-basic" label="Title" variant="outlined" />
                        </div>
                        <div className='max-w-5xl my-5 mx-auto'>
                            <TextField className='w-96 my-5' onChange={e => setAddress(e.target.value)} defaultValue={selectedValue.address} autoComplete='off' id="outlined-basic" label="Address" variant="outlined" />
                        </div>
                        <div className='max-w-5xl my-5 mx-auto'>
                            <TextField className='w-96 my-5' onChange={e => setDescription(e.target.value)} defaultValue={selectedValue.description} autoComplete='off' id="outlined-basic" label="Description" variant="outlined" />
                        </div>
                        <div className='max-w-5xl my-5 mx-auto'>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Slot</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={slotId}
                                        label="Slot"
                                        onChange={e => setSlotId(e.target.value)}
                                    >

                                        {slot.map((cate, index) => {
                                            return (
                                                <MenuItem key={index} value={cate.id}>{cate.name}</MenuItem>
                                            )
                                        })}

                                    </Select>
                                </FormControl>
                            </Box>
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


