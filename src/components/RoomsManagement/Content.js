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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import Search from 'components/Search';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from 'firebase';
import { v4 } from "uuid";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useLocation } from 'react-router-dom';
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
        id: 'Title',
        label: 'Title',
        minWidth: 150,
    },
    {
        id: 'Category',
        label: 'Category',
        minWidth: 100,
    },
    {
        id: 'Supplier',
        label: 'Supplier',
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
    const { state } = useLocation()

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState([]);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [filterCategoryId, setFilterCategoryId] = useState(state?.name == undefined ? "" : state?.name);
    const [categoryId, setCategoryId] = useState("");
    const [supplierId, setsupplierId] = useState("");
    const [dataCate, setDataCate] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("success");
    const [alert, setAlert] = useState(false);
    const handleClickOpen = (data) => {
        console.log("111111", data);
        setOpen(true);
        setSelectedValue(data);
        setSelectedImage(data.img);
        setCategoryId(data.categoryId)

        setImg(data.img)
        setId(data.id)
        setTitle(data.title)
        setDescription(data.description)
        setsupplierId(data.supplierId)
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedImage(undefined);
        SetClick(false);
    };
    const validName = new RegExp(/^.{6,30}$/);
    const validDes = new RegExp(/^.{6,300}$/);
    const body = {
        id: id,
        title: title,
        description: description,
        img: img,
        active: "1",
        categoryId: categoryId,
        supplierId: supplierId
    };
    function createData(data) {
        let Title = data.title;
        let Category;
        let Supplier;
        dataCate.map((cate, index) => {
            if (data.categoryId == cate.id) {
                return Category = cate.title
            }
        })
        dataSupplier.map((sup, index) => {
            if (data.supplierId == sup.id) {
                return Supplier = sup.Title
            }
        })
        let Image = (
            <img
                src={data.img}
                loading="lazy"
                className='h-28 w-28'
            />)
        let Edit = (<button className="text-white  outline-none bg-blue-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
            <EditIcon />
        </button>);
        let Delete = (<button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8" onClick={() => handleDelete(data)}>
            <DeleteIcon />
        </button>);

        return { Image, Title, Category, Supplier, Edit, Delete };
    }
    useEffect(() => {

        featchCategoryList();
        featchProductList();
        setPage(0);
    }, [search, filterCategoryId]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedImage, setSelectedImage] = React.useState();
    const [click, SetClick] = React.useState(false)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    console.log("----------", page, rowsPerPage)

    const dataSupplier = [
        { id: 1, Title: "TH-Milk" },
        { id: 2, Title: "VinaMilk" },
        { id: 3, Title: "FBT Milk" },
        { id: 4, Title: "Yakun" },

    ]
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
            <TextField className='w-96 my-5' defaultValue={id} disabled id="outlined-basic" label="Id" variant="outlined" />
        </div>)
    } else {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5' onChange={e => setId(e.target.value)} defaultValue={selectedValue.id} id="outlined-basic" label="Id" variant="outlined" />
        </div>)
    }
    async function featchCategoryList() {
        try {


            const requestURL = `http://www.subcriptionmilk.somee.com/api/Categories/Getallcategories`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataCate(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchProductList() {
        try {


            const requestURL = `http://www.subcriptionmilk.somee.com/api/Products/Getallproduct?search=${search}&filter=${filterCategoryId}`;

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
            const storageRef = ref(storage, `Product/${selectedImage.name + v4()}`);
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
    const [phoneErrorr, setPhoneErrorr] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [message, setMess] = useState(false)
    const [nameExists, setNameExists] = useState(false)
    const [idExists, setIdExists] = useState(false)
    async function handleUpdateOrCreate() {
        if (!validName.test(title)) {
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
                const res = await fetch(`http://www.subcriptionmilk.somee.com/api/Products/update`, {
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
                                setStatus("success")
                                handleClose();
                                featchProductList();
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
                const res = await fetch(`http://www.subcriptionmilk.somee.com/api/Products/create`, {
                    method: `POST`,
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(body)
                }).then(res => res.json())
                    .then(result => {

                        if (result) {
                            if (result?.statusCode == 201) {
                                setMess("Add Successfullly")
                                setAlert(true)
                                setStatus("success")
                                handleClose();
                                featchProductList();
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

        let res = await fetch(`http://www.subcriptionmilk.somee.com/api/Products/${data?.id}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',

            },
        }).then(function (response) {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Not Delete Bacause Product In Order');
        }).then(result => {

            setMess("Delete Successfully")
            setAlert(true)
            setStatus("success")
            featchProductList();

        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ',
            );
            setStatus("warning")
            setMess(error.message)
            setAlert(true)
        });
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
                        Rooms Management
                    </div>
                </TableHead>

                <div className='float-left ml-5 gap-5 my-6  grid grid-cols-6'>
                    <div className='col-span-1 outline-none hover:outline-none'>
                        <button className='bg-blue-600 text-white rounded-md ml-5 mt-2 py-2 px-4' onClick={handleClickOpen}>
                           Rooms Product
                        </button>


                    </div>
                    <div className='col-span-2 w-full'>
                        <Box sx={{ maxWidth: 420, width: 320 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={filterCategoryId}
                                    label="Category"
                                    onChange={e => setFilterCategoryId(e.target.value)}
                                >
                                    <MenuItem value={""}>All</MenuItem>
                                    {dataCate.map((cate, index) => {
                                        return (
                                            <MenuItem key={index} value={cate.id}>{cate.title}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                </div>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >

                    <BootstrapDialogTitle id="" onClose={handleClose}>
                        Product Details
                    </BootstrapDialogTitle>
                    <DialogContent dividers >
                        {nameError && <div className='text-red-600 ml-11 mb-5 text-xl'>Text 6 - 30 character </div>}

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
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={categoryId}
                                        label="Supplier"
                                        onChange={e => setCategoryId(e.target.value)}
                                    >

                                        {dataCate.map((cate, index) => {
                                            return (
                                                <MenuItem key={index} value={cate.id}>{cate.title}</MenuItem>
                                            )
                                        })}

                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className='max-w-5xl my-5 mx-auto'>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Supplier</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={supplierId}
                                        label="Supplier"
                                        onChange={e => setsupplierId(e.target.value)}
                                    >

                                        {dataSupplier.map((cate, index) => {
                                            return (
                                                <MenuItem key={index} value={cate.id}>{cate.Title}</MenuItem>
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




                <div className='pr-5 my-6  float-right'>

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


