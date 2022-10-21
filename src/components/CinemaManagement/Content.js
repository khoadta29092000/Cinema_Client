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
import queryString from 'query-string';
import { useEffect, useState } from "react";
import Search from 'components/Search';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from 'firebase';
import { v4 } from "uuid";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
    { id: 'Image', label: "Image", minWidth: 150 },
    {
        id: 'Name',
        label: 'Name',
        minWidth: 150,
    },
    {
        id: 'Address',
        label: 'Address',
        minWidth: 100,
    },
    {
        id: 'Location',
        label: 'Location',
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
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("success");
    const [alert, setAlert] = useState(false);
    const handleClickOpen = (data) => {
        console.log("111111", data);
        setOpen(true);
        setSelectedValue(data);
        setSelectedImage(data.img);
        setImg(data.img)
        setId(data.id)
        setTitle(data.title)
        setDescription(data.description)
        setPrice(data.price)
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedImage(undefined);
        SetClick(false);
   
    };
    const validName = new RegExp(/^.{6,30}$/);
    const validDes = new RegExp(/^.{6,3000}$/);
    const validNum = new RegExp("^[0-9]*$");

    const body = {
        id: id,
        name: title,
        description: description,
        img: img,
        price: price
    };
    function createData(data) {
        let Name = data.name;
        let Address = data.address ;
        let Location = data.locationId ;

        let Image = (
            <img
                src={data.image}
                loading="lazy"
                className='h-28 w-28'
            />)
        let Edit = (<button className="text-white  outline-none bg-blue-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
            <EditIcon />
        </button>);
        let Delete = (<button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8"onClick={() => handleDelete(data)}> 
            <DeleteIcon />
        </button>);

        return { Image, Name, Address, Location,Edit, Delete };
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedImage, setSelectedImage] = React.useState();
    const [click, SetClick] = React.useState(false)



    useEffect(() => {
        featchCinemaList();
        setPage(0);
    }, [search]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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


    let Id;
    if (selectedValue.id != undefined) {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5'  defaultValue={id} disabled id="outlined-basic" label="Id" variant="outlined" />
        </div>)
    } else {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5' onChange={e => setId(e.target.value)} defaultValue={selectedValue.id} id="outlined-basic" label="Id" variant="outlined" />
        </div>)
    }

    async function featchCinemaList() {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Cinema?search=${search}`;

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
    async function featchCinemaList() {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Cinema?search=${search}`;

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
    console.log("aa fetch", data)


    const [progresspercent, setProgresspercent] = useState(0);

    async function handleUpload() {
        if (click == false) { setImg(selectedImage) }
        else {
            const storageRef = ref(storage, `Package/${selectedImage.name + v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedImage);
            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImg(downloadURL)
                    });
                }
            );
        }
    }
    console.log("img nenaenan", img)
    const [NumError, setNum] = useState(false)
    const [phoneErrorr, setDesErr] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [message, setMess] = useState(false)
    const [nameExists, setNameExists] = useState(false)
    const [idExists, setIdExists] = useState(false)
    async function handleUpdateOrCreate() {
        
            if (selectedValue.id != undefined) {
                const res = await fetch(`http://www.cinemasystem.somee.com/api/Cinema/${selectedValue.id}`, {
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
                                featchCinemaList();
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
                const res = await fetch(`http://www.cinemasystem.somee.com/api/Cinema`, {
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
                                featchCinemaList();
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
        try {
    
    
          const requestURL = `http://www.cinemasystem.somee.com/api/Account/${data?.id}`;
    
          const res = await fetch(requestURL, {
            method: `DELETE`,
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
                  featchCinemaList();
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
                        Cinema Management
                    </div>
                </TableHead>
                <button className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4' onClick={handleClickOpen}>
                    Add Cinema
                </button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="" onClose={handleClose}>
                        Package Detail
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        {nameError && <div className='text-red-600 ml-11 mb-5 text-xl'>Text 6 - 30 character </div>}
                        {NumError && <div className='text-red-600 ml-11 mb-5 text-xl'>Id or Price Not Number</div>}
                        {phoneErrorr && <div className='text-red-600 ml-11 mb-5 text-xl'>Description 6 - 300 character</div>}
                        {nameExists && <div className='text-red-600 ml-11 mb-5 text-xl'>Title Exists </div>}

                        {idExists && <div className='text-red-600 ml-11 mb-5 text-xl'>Id Exitsts</div>}
                        {Id}
                        <div className='max-w-5xl my-5 mx-auto'>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={(event) => {
                                        setSelectedImage(event.target.files[0]);
                                        SetClick(true);
                                    }}
                                />
                            </Button>
                        </div>
                        <div className='max-w-5xl my-5 mx-auto'>
                            {selectedImage == undefined ? <div></div> : <img alt="" className='mx-auto h-24 w-24 my-5' src={click == false ? selectedValue.img : window.URL.createObjectURL(selectedImage)} />}
                        </div>
                        <Button variant="contained"
                            component="label"

                            onClick={handleUpload} className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4' >
                            Save Img
                        </Button>
                        <div className='max-w-5xl my-5 mx-auto'>
                            <TextField className='w-96 my-5' onChange={e => setTitle(e.target.value)} defaultValue={selectedValue.title} autoComplete='off' id="outlined-basic" label="Title" variant="outlined" />
                        </div>
                        <div className='max-w-5xl my-5 mx-auto'>
                            <TextField className='w-96 my-5' onChange={e => setPrice(e.target.value)} autoComplete='off' defaultValue={selectedValue.price} id="outlined-basic" label="Prcie" variant="outlined" />
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