import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
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
import { useEffect, useState } from "react";
import Search from 'components/Search';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from 'firebase';
import { v4 } from "uuid";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

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
    { id: 'Id', label: "Id", minWidth: 100 },
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
        id: 'Active',
        label: 'Active',
        minWidth: 100,
    },
    {
        id: 'Action',
        label: 'Action',
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
    const [message, setMess] = useState(false)
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const [data, setData] = useState([]);
    const [dataLocation, setDataLocation] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("success");
    const [alert, setAlert] = useState(false);
    const formik = useFormik({
        initialValues: {
            id: "",
            address: "",
            locationId: "",
            name: "",
            description: "",
            image: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
            address: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
            locationId: Yup.number().typeError("Must be number!").required(),
            description: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),

        }), onSubmit: values => {

            let DataBody
            if (values.id == "") {
                DataBody = {

                    name: values.name,
                    address: values.address,
                    locationId: values.locationId,
                    description: values.description,
                    image: img,
                    active: true
                }
            } else {
                DataBody = {
                    id: values.id,
                    name: values.name,
                    address: values.address,
                    locationId: values.locationId,
                    description: values.description,
                    image: img,
                    active: true
                }
            }
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
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            setImg(downloadURL)
                            if (selectedValue.id != undefined) {
                                const res = await fetch(`http://cinemasystem2.somee.com/api/Cinema/${selectedValue.id}`, {
                                    method: `PUT`,
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                                    },
                                    body: JSON.stringify( click == false ?  {...DataBody, image: selectedValue.image} :  {...DataBody, image: downloadURL})
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


                            } else {
                                const res = await fetch(`http://cinemasystem2.somee.com/api/Cinema`, {
                                    method: `POST`,
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                                    },
                                    body: JSON.stringify({ ...DataBody, image: downloadURL })
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

                            }

                        });
                    }
                );
            }
        
        },
    });
    const handleClickOpen = (data) => {
            if (data != undefined) {
                formik.setValues(data);
            }
        setOpen(true);
        setSelectedValue(data);
        setSelectedImage(data.image);
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
    function createData(data) {
        let Name = data.name;
        let Id = data.id;
        let Address = data.address;

        dataLocation.map(item => {
            if (item.id == data.locationId) {
                return Location = item.name;
            }
        })
        let Image = (
            <img
                src={data.image}
                loading="lazy"
                className='h-28 w-28'
            />)
        let Active = (<button className="text-white  outline-none bg-black cursor-pointer rounded-lg   h-8 w-8" onClick={() => handleUpdateStatus(data.id)}>
            {data.active == true ? <PublicIcon /> : <PublicOffIcon />}
        </button>);
        let Action = (
            <div className='gap-x-8 flex'>
                <button className="text-white  outline-none bg-blue-600 rounded-lg   h-8 w-8">

                    <Link to={{
                        pathname: "/Cinema/Details",
                        state: {
                            name: data.id
                        }
                    }}> <RemoveRedEyeIcon /></Link>
                </button>
                <button className="text-white  outline-none bg-yellow-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
                    <EditIcon />
                </button>
                <button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8" onClick={() => handleDelete(data)}>
                    <DeleteIcon />
                </button>
            </div>
        );
        return { Image, Id, Name, Address, Location, Active, Action };
    }
    
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedImage, setSelectedImage] = React.useState();
    const [click, SetClick] = React.useState(false)

    async function handleUpdateStatus(data) {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/Cinema/UpdateActive?id=${data}`;

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

    useEffect(() => {
        featchLocationList();
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


    const rows1 = data.map((data, index) => {
        return (createData(data))
    })


    let Id;
    if (selectedValue.id != undefined) {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5' defaultValue={id} disabled id="outlined-basic" label="Id" variant="outlined" />
        </div>)
    }
    async function featchCinemaList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/Cinema?search=${search}`;

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
    async function featchLocationList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/Location`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataLocation(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    console.log("aa fetch", data)


    const [progresspercent, setProgresspercent] = useState(0);

   
    async function handleDelete(data) {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/Cinema    /${data?.id}`;

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
    const CoupomOptions = dataLocation.map((item, index) => ({
        id: item.id,
        label: item.name
    }))
    console.log(formik.values)
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
                        Cinemas Management
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
                    <form onSubmit={formik.handleSubmit}>
                        <BootstrapDialogTitle id="" onClose={handleClose}>
                            Cinema Detail
                        </BootstrapDialogTitle>
                        <DialogContent dividers >
                            {id != undefined ? <div className='max-w-5xl my-5 mx-auto'>
                                <TextField className='w-96 my-5' value={formik.values.id} disabled label="Id" variant="outlined" />
                            </div> : null}
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
                                {selectedImage == undefined ? <div></div> : <img alt="" className='mx-auto h-24 w-24 my-5' src={click == false ? selectedValue.image : window.URL.createObjectURL(selectedImage)} />}
                            </div>
                           
                            <div className='max-w-5xl my-5 mx-auto'>
                                {formik.errors.name
                                    ? (<Box><div className="text-red-600 mb-2 font-bold">{formik.errors.name}</div>
                                    </Box>)
                                    : null}
                                <TextField error={formik.errors.name ? "error" : null} onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} value={formik.values.name}
                                    id="name" className='w-96 my-5' label="Name" variant="outlined" />
                            </div>
                            <div className='max-w-5xl my-5 mx-auto'>
                                {formik.errors.address
                                    ? (<Box><div className="text-red-600 mb-2 font-bold">{formik.errors.address}</div>
                                    </Box>)
                                    : null}
                                <TextField onChange={formik.handleChange} error={formik.errors.address ? "error" : null}
                                    onBlur={formik.handleBlur} value={formik.values.address}
                                    id="address" className='w-96 my-5' label="Address" variant="outlined" />
                            </div>
                            <div className='max-w-5xl my-5 mx-auto'>

                                {formik.errors.locationId
                                    ? (<Box><div className="text-red-600 mb-2 font-bold">{formik.errors.locationId}</div>
                                    </Box>)
                                    : null}
                                <Autocomplete
                                    disableClearable
                                    id="combo-box-demo"
                                    options={CoupomOptions}
                                    renderInput={(params) => <TextField {...params} label="Location" />}
                                    onChange={(event, value) => formik.setFieldValue("locationId", value.id)}
                                />

                            </div>
                            <div className='max-w-5xl my-5 mx-auto'>
                                {formik.errors.description ? <div className="text-red-600 mb-2 font-bold">{formik.errors.description}</div> : null}
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
                                <textarea onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} value={formik.values.description} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button type='submit' >
                                Save
                            </Button>
                        </DialogActions>
                    </form>
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