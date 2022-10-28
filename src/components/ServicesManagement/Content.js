import * as React from 'react';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';
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
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { Box } from '@mui/system';
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
    { id: 'Title', label: "Title", minWidth: 150 },
    {
        id: 'Price',
        label: 'Price',
        minWidth: 100,
        align: '',
    },
    {
        id: 'Quantity',
        label: 'Quantity',
        minWidth: 100,
        align: '',
    },
    {
        id: 'Active',
        label: 'Active',
        minWidth: 100,
        align: '',
    },
    {
        id: 'Action',
        label: 'Action',
        minWidth: 100,
        align: '',
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
    const [status, setStatus] = useState("success");
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        page: 1,
        pageSize: 10,
        // title_like: '',
    })
    const [click, SetClick] = useState(false)
    const [selectedImage, setSelectedImage] = useState("");
    const [img, setImg] = useState("");
    const [alert, setAlert] = useState(false);
    const handleClickOpen = (data) => {
       
        setOpen(true);
        setId(data.id);
        setTitle(data.title);
        setQuantity(data.quantity);
        setPrice(data.price != undefined ? data.price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ" : data.price);
        setDescription(data.description);
        setImg(data.image);
        setSelectedImage(data.image);
        setSelectedValue(data);
    };

    const handleClose = () => {

        setOpen(false);
        setSelectedImage(undefined);
        SetClick(false);
        setSelectedValue([])
    };
    useEffect(() => {
        featchServiceList();
        setPage(0);
    }, [search]);
    function createData(data) {

        let Title = data.title;
        let Id = data.id;
        let Quantity = data.quantity;
        let Price = data.price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ";
        let Active = (<button className="text-white  outline-none bg-black cursor-pointer rounded-lg   h-8 w-8" onClick={() => handleUpdateStatus(data.id)}>
            {data.active == true ? <PublicIcon /> : <PublicOffIcon />}
        </button>);
        let Action = (
            <div className='gap-x-8 flex'>
                <button className="text-white  outline-none bg-yellow-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
                    <EditIcon />
                </button>
                <button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8" onClick={() => handleDelete(data)}>
                    <DeleteIcon />
                </button>
            </div>
        );
        let Image = (
            <img
                src={data.image}
                loading="lazy"
                className='h-28 w-28'
            />)
        return { Image, Id, Title, Price, Quantity, Active, Action };
    }
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function handleSearchTermChange(newFilters) {

        setFilters({
            ...filters,
            page: 1,
            title_like: newFilters.searchTerm,
        })
    }
    const callbackSearch = (childData) => {
        setSearch(childData)

    };
    async function handleUpdateStatus(data) {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Service/UpdateActive?id=${data}`;

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
                            featchServiceList();
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
    async function featchServiceList() {
        try {


            const requestURL = `http://cinemasystem.somee.com/api/Service?search=${search}`;

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

    let Id;
    if (id != undefined) {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5' defaultValue={id} onChange={e => setId(e.target.value)} disabled label="Id" variant="outlined" />
        </div>)
    } else {

    }


    const rows1 = data.map((data, index) => {
        return (createData(data))
    })
    const [progresspercent, setProgresspercent] = useState(0);

    async function handleUpload() {
        if (click == false) { setImg(selectedImage) }
        else {
            const storageRef = ref(storage, `deliveryman/${selectedImage.name + v4()}`);
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
    const [error, setError] = useState("")
    const [message, setMess] = useState("")

    async function handleUpdateOrCreate(data) {


        if (selectedValue.id != undefined) {
            const res = await fetch(`http://cinemasystem.somee.com/api/Service/${selectedValue?.id}`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(result => {

                    if (result) {
                        if (result?.statusCode == 200) {
                            setMess("Update Successfullly")
                            setAlert(true)
                            handleClose();
                            featchServiceList();
                        } else {
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
            

        } else {
            const res = await fetch(`http://cinemasystem.somee.com/api/Service`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(result => {

                    if (result) {
                        if (result?.statusCode == 200) {
                            setMess("Add Successfullly")
                            setAlert(true)
                            handleClose();
                            featchServiceList();
                        } else {
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
            
        }

    }
    async function handleDelete(data) {

        let res = await fetch(`http://cinemasystem.somee.com/api/Service/${data?.id}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(res => res.json())
            .then(result => {

                if (result?.statusCode === 200) {
                    setMess(result.message)
                    setAlert(true)
                    featchServiceList();
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
    console.log("selected img", selectedValue.id)
    return (
        <section className=" ml-0 xl:ml-64  px-5 pt-10  ">
            <Snackbar open={alert} autoHideDuration={4000} onClose={handleCloseAlert} className="float-left w-screen">
                <Alert onClose={handleCloseAlert} severity="success" >
                    {message}
                </Alert>
            </Snackbar>
            <Paper className='' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableHead >
                    <div className='pt-2 pl-4 block font-semibold text-xl'>
                        Service  Management
                    </div>
                </TableHead>
                <button className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4' onClick={handleClickOpen}>
                    Add Service
                </button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <Formik
                        initialValues={{
                            id: "",
                            title: "",
                            quantity: "",
                            price: "",
                            description: "",
                            image: ""
                        }}
                        validationSchema={Yup.object().shape({
                            title: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required('Required'),
                            quantity: Yup.number().typeError("Must be number!").max(10000, "Too Long!").required('Required'),
                            price:Yup.number().typeError("Must be number!").max(4000, "Too Long!").required('Required'),
                            description: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required('Required'),
                            image: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required('Required'),
                        })}
                        onSubmit={values => {
                            handleUpdateOrCreate(values);
                            console.log("ngu xa", values);
                        }}
                    >
                        {props => (
                            <Form>
                                <BootstrapDialogTitle onClose={handleClose}>
                                    Service Details
                                </BootstrapDialogTitle>
                                <DialogContent dividers >


                                    {error && <div className='text-red-600 ml-11 mb-5 text-xl'>{error}</div>}

                                    {Id}
                                    {props.errors.image && props.touched.image ? <div className="text-red-600 mb-2 font-bold">{props.errors.image}</div> : null}
                                    <div className='max-w-5xl my-5 mx-auto'>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4'
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
                                        {props.errors.title && props.touched.title
                                            ? (<Box><div className="text-red-600 mb-2 font-bold">{props.errors.title}</div>
                                                <TextField error onChange={props.handleChange}
                                                    onBlur={props.handleBlur} value={props.values.title}
                                                    id="title" className='w-96 my-5' label="Title" variant="outlined" /></Box>)
                                            : <TextField onChange={props.handleChange}
                                                onBlur={props.handleBlur} value={props.values.title}
                                                id="title" className='w-96 my-5' label="Title" variant="outlined" />}
                                        
                                    </div>
                                    <div className='max-w-5xl my-5 mx-auto'>
                                    {props.errors.quantity && props.touched.quantity
                                            ? (<Box><div className="text-red-600 mb-2 font-bold">{props.errors.quantity}</div>
                                                <TextField error onChange={props.handleChange}
                                                    onBlur={props.handleBlur} value={props.values.quantity}
                                                    id="quantity" className='w-96 my-5' label="Quantity" variant="outlined" /></Box>)
                                            : <TextField onChange={props.handleChange}
                                                onBlur={props.handleBlur} value={props.values.quantity}
                                                id="quantity" className='w-96 my-5' label="Quantity" variant="outlined" />}
                                       
                                    </div>
                                    <div className='max-w-5xl my-5 mx-auto'>
                                    {props.errors.price && props.touched.price
                                            ?( <Box><div className="text-red-600 mb-2 font-bold">{props.errors.price}</div>
                                                <TextField error onChange={props.handleChange}
                                                    onBlur={props.handleBlur} value={props.values.price}
                                                    id="price" className='w-96 my-5' label="Quantity" variant="outlined" /></Box>)
                                            : <TextField onChange={props.handleChange}
                                                onBlur={props.handleBlur} value={props.values.price}
                                                id="price" className='w-96 my-5' label="Quantity" variant="outlined" />}
                                      
                                    </div>
                                    <div className='max-w-5xl my-5 mx-auto'>
                                    {props.errors.description && props.touched.description ? <div className="text-red-600 mb-2 font-bold">{props.errors.description}</div> : null}
                                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
                                        <textarea onChange={props.handleChange}
                                            onBlur={props.handleBlur} value={props.values.description} id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button type='submit' >

                                        Save
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>

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
        </section >
    );
}

