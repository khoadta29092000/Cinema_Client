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
import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';
import Autocomplete from '@mui/material/Autocomplete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useFormik } from 'formik';
import * as Yup from "yup";
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
        id: 'Cinema',
        label: 'Cinema',
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
    const { state } = useLocation()

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState([]);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [filterCategoryId, setFilterCategoryId] = useState(state?.name == undefined ? "" : state?.name);
    const [categoryId, setCategoryId] = useState("");
    const [Active, setActive] = useState("");
    const [dataCate, setDataCate] = useState([]);
    const [data1, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("success");
    const [alert, setAlert] = useState(false);
    const formik = useFormik({
        initialValues: {
            id: "",
            title: "",
            description: "",
            cinemaId: "",
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().min(1, "Too Short!").max(4000, "Too Long!").required(),
            description: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
            cinemaId: Yup.number().required(),
        }), onSubmit: values => {

            let DataBody
            if (values.id == "") {
                DataBody = {
                    title: values.title,
                    description: values.description,
                    cinemaId: values.cinemaId,
                    active: true
                }
            } else {
                DataBody = {
                    id: values.id,
                    title: values.title,
                    description: values.description,
                    cinemaId: values.cinemaId,
                    active: values.active   
                }
            }
            handleUpdateOrCreate(DataBody);
        },
    });
    const handleClickOpen = (data) => {
        if (data != undefined) {
            formik.setValues(data);

        }
        setOpen(true);
        setSelectedValue(data);
        setSelectedImage(data.img);
        setCategoryId(data.cinemaId)
        setActive(data.active)

        setId(data.id)
        setTitle(data.title)
        setDescription(data.description)

    };
    const handleClose = () => {
        setOpen(false);
        setSelectedImage(undefined);
        SetClick(false);
    };

    function createData(data) {
        let Id = data.id;
        let Title = data.title;
        let Cinema;

        data1.map(item => {
            if (data.cinemaId == item.id) {

                return Cinema = item.name

            }
        })
        let Active = (<button className="text-white  outline-none bg-black cursor-pointer rounded-lg   h-8 w-8" onClick={() => handleUpdateStatus(data.id)}>
            {data.active == true ? <PublicIcon /> : <PublicOffIcon />}
        </button>);
        let Action = (
            <div className='gap-x-8 flex'>

                <button className="text-white  outline-none bg-blue-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
                    <RemoveRedEyeIcon />
                </button>
                <button className="text-white  outline-none bg-yellow-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
                    <EditIcon />
                </button>
                <button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8" onClick={() => handleDelete(data)}>
                    <DeleteIcon />
                </button>
            </div>
        );

        return { Id, Title, Cinema, Active, Action };
    }
    async function handleUpdateStatus(data) {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/Room/UpdateActive?id=${data}`;

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
                            featchCategoryList();
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



        const rows1 = dataCate.map((data, index) => {
            return (createData(data))
        })


    let Id;
    if (selectedValue.id != undefined) {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5' defaultValue={id} disabled id="outlined-basic" label="Id" variant="outlined" />
        </div>)
    }
    async function featchCategoryList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/Room?search=${search}`;

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


            const requestURL = `http://cinemasystem2.somee.com/api/Cinema`;

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

    const [error, setError] = useState(undefined)
    const [message, setMess] = useState(false)

    async function handleUpdateOrCreate(data) {

        if (selectedValue.id != undefined) {
            const res = await fetch(`http://cinemasystem2.somee.com/api/Room/${selectedValue?.id}`, {
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
                            setStatus("success")
                            handleClose();
                            featchCategoryList();
                        } if (result?.statusCode == 409) {
                            setError(result?.message)
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


        } else {
            const res = await fetch(`http://cinemasystem2.somee.com/api/Room`, {
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
                            setStatus("success")
                            handleClose();
                            featchCategoryList();
                        } if (result?.statusCode == 409) {
                            setError(result?.message)
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

        }

    }
    async function handleDelete(data) {

        let res = await fetch(`http://cinemasystem2.somee.com/api/Room/${data?.id}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
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

    const CinemaOptions = data1.map((item, index) => ({
        id: item.id,
        label: item.name
    }))
    CinemaOptions.unshift({ id: null, label: "All" })
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
                            add Room
                        </button>


                    </div>
                            

                </div>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <BootstrapDialogTitle id="" onClose={handleClose}>
                            Room Details
                        </BootstrapDialogTitle>
                        <DialogContent dividers >
                            {id != undefined ? <div className='max-w-5xl my-5 mx-auto'>
                                <TextField className='w-96 my-5' value={formik.values.id} disabled label="Id" variant="outlined" />
                            </div> : null}

                            <div className='max-w-5xl my-5 mx-auto'>
                                {formik.errors.title
                                    ? (<Box><div className="text-red-600 mb-2 font-bold">{formik.errors.title}</div>
                                    </Box>)
                                    : null}
                                <TextField error={formik.errors.title ? "error" : null} onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} value={formik.values.title}
                                    id="title" className='w-96 my-5' label="Title" variant="outlined" />
                            </div>
                            <div className='max-w-5xl my-5 mx-auto'>
                                <Box sx={{ minWidth: 120 }}>
                                    {formik.errors.cinemaId
                                        ? (<Box><div className="text-red-600 mb-2 font-bold">{formik.errors.cinemaId}</div>
                                        </Box>)
                                        : null}
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Cinema</InputLabel>
                                        <Select

                                            id="cinemaId"
                                            defaultValue={formik.values.cinemaId}
                                            label="Cinema"
                                            onChange={e => formik.setFieldValue("cinemaId", e.target.value)}
                                        >

                                            {data1.map((cate, index) => {
                                                if (cate.active == true) {
                                                    return (
                                                        <MenuItem value={cate.id}>{cate.name}</MenuItem>
                                                    )
                                                }

                                            })}

                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='max-w-5xl my-5 mx-auto'>
                                {formik.errors.description ? <div className="text-red-600 mb-2 font-bold">{formik.errors.description}</div> : null}
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
                                <textarea onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} value={formik.values.description} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button type='submit'>
                                Save
                            </Button>
                        </DialogActions>
                    </form>
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


