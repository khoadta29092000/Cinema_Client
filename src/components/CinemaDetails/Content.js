
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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

import { useEffect, useState } from "react";
import Search from 'components/Search';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from 'firebase';
import { v4 } from "uuid";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from "yup";
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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const columns1 = [
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
        id: 'Action',
        label: 'Action',
        minWidth: 100,
        align: '',
    },
];

const columns = [
    { id: 'Image', label: "Image", minWidth: 150 },
    { id: 'Id', label: "Id", minWidth: 100 },
    {
        id: 'Title',
        label: 'Title',
        minWidth: 150,
    },
    {
        id: 'Time',
        label: 'Time',
        minWidth: 100,
    },
    {
        id: 'StartTime',
        label: 'StartTime',
        minWidth: 100,
    },
    {
        id: 'EndTime',
        label: 'EndTime',
        minWidth: 100,
    },
    {
        id: 'Rated',
        label: 'Rated',
        minWidth: 100,
    },
    {
        id: 'Action',
        label: 'Action',
        minWidth: 100,
    }

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


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Content() {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    const [selectedValue, setSelectedValue] = React.useState([]);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const [errorDate, setErrorDate] = useState("");
    const [data, setData] = useState([]);
    const [dataFilm, setDataFilm] = useState([]);
    const [dataFilmNotInCinema, setDataFilmNotInCinema] = useState([]);
    const [dataServiceNotInCinema, setDataServiceNotInCinema] = useState([]);
    const [dataService, setDataServiceInCinema] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("success");
    const [alert, setAlert] = useState(false);
    var today = new Date();
    const [startDate, setStartDate] = React.useState(today);
    const [endValue, setEndValue] = React.useState(today);
    const [startValue, setStartValue] = React.useState(today);
    const formik = useFormik({
        initialValues: {
            filmId: "",
            startime: '',
            endtime: '',
        },
        validationSchema: Yup.object().shape({
            filmId: Yup.string().required('Required'),


        }), onSubmit: values => {
            console.log("ngu ne", startValue, endValue, startValue < endValue)
            if (startValue < endValue == false) {
                setErrorDate("end date can't be before start date")
            } else {
                setErrorDate("")
                let DataBody
                DataBody = {
                    filmId: values.filmId,
                    cinemaId: state?.name,
                    startime: startValue,
                    endtime: endValue,

                }
                hanleCreateFilm(DataBody);
            }

        },
    });
    const formik1 = useFormik({
        initialValues: {
            serviceId: "",
            quantity: '',

        },
        validationSchema: Yup.object().shape({
            serviceId: Yup.string().required('Required'),
            quantity: Yup.number().typeError("Must be number!").max(100, "Quantity not > 100").required(),

        }), onSubmit: values => {

            let DataBody1
            DataBody1 = {
                serviceId: values.serviceId,
                cinemaId: state?.name,
                quantity: values.quantity,
            }
            hanleCreateService(DataBody1);
        },
    });
    async function hanleCreateFilm(data) {
        const res = await fetch(`http://cinemasystem2.somee.com/api/FilmInCinema`, {
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
                        featchFilmInCinemaList();
                        featchServiceInCinemaList();
                        featchFilmNotInCinemaList();
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
    async function hanleCreateService(data) {
        const res = await fetch(`http://cinemasystem2.somee.com/api/ServiceInCinema`, {
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
                        featchFilmInCinemaList();
                        featchServiceInCinemaList();
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
    async function hanleDeleteFilm(data) {
        const res = await fetch(`http://cinemasystem2.somee.com/api/FilmInCinema/${data}?CinemaId=${state?.name}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {

                if (result) {
                    if (result?.statusCode == 200) {
                        setMess("DELETE Successfullly")
                        setAlert(true)
                        setStatus("success")
                        handleClose();
                        featchFilmInCinemaList();
                        featchServiceInCinemaList();
                        featchFilmNotInCinemaList();
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
    async function hanleDeleteService(data) {
        const res = await fetch(`http://cinemasystem2.somee.com/api/ServiceInCinema/${data}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {

                if (result) {
                    if (result?.statusCode == 200) {
                        setMess("DELETE Successfullly")
                        setAlert(true)
                        setStatus("success")
                        handleClose();
                        featchFilmInCinemaList();
                        featchServiceInCinemaList();
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

    const handleClickOpen = (data) => {


        setOpen(true);
        setSelectedValue(data);
        setSelectedImage(data.img);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedImage(undefined);
        SetClick(false);

    };
    function createData2(data) {

        let Title = data.title;
        let Id = data.id;
        let Quantity = data.quantityInCinema;
        let Price = data.price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ";

        let Action = (
            <div className='gap-x-8 flex'>

                <button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8" >
                    <DeleteIcon onClick={() => hanleDeleteService(data.serviceInCinemaId)} />
                </button>
            </div>
        );
        let Image = (
            <img
                src={data.image}
                loading="lazy"
                className='h-28 w-28'
            />)
        return { Image, Id, Title, Price, Quantity, Action };
    }
    function createData(data) {
        let StartTime = data.startime.slice(8, 10) + "/" + data.startime.slice(5, 7) + "/" + data.startime.slice(0, 4);
        let EndTime = data.endtime.slice(8, 10) + "/" + data.endtime.slice(5, 7) + "/" + data.endtime.slice(0, 4);
        let Title = data.title;
        let Time = data.time + " Phút";
        let Rated = data.rated;
        let Id = data.id;

        let Image = (
            <img
                src={data.image}
                loading="lazy"
                className='h-28 w-28'
            />)

        let Action = (
            <div className='gap-x-8 flex'>

                <button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8" >
                    <DeleteIcon onClick={() => hanleDeleteFilm(data.id)} />
                </button>
            </div>
        );

        return { Image, Id, Title, Time, StartTime, EndTime, Rated, Action };
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedImage, setSelectedImage] = React.useState();
    const [click, SetClick] = React.useState(false)
    const { state } = useLocation()
    useEffect(() => {
        featchFilmInCinemaList();
        featchServiceInCinemaList();
        featchFilmList();
        featchFilmNotInCinemaList();
        featchServiceNotInCinemaList();
        setPage(0);
    }, [search,startDate]);
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
    const rows2 = dataService.map((data, index) => {
        return (createData2(data))
    })

    let Id;
    if (selectedValue.id != undefined) {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5' defaultValue={id} disabled id="outlined-basic" label="Id" variant="outlined" />
        </div>)
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

            setDataFilm(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchFilmNotInCinemaList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/FilmInCinema/AllFilmNotInCinema/${state?.name}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataFilmNotInCinema(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchServiceNotInCinemaList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/Service`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataServiceNotInCinema(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchFilmInCinemaList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/FilmInCinema/AllFilmInCinemaToday/${state?.name}/${formatDate(startDate)}`;

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
    async function featchServiceInCinemaList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/ServiceInCinema/AllServiceInCinema?CinemaId=${state?.name}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataServiceInCinema(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    const [progresspercent, setProgresspercent] = useState(0);
    const [message, setMess] = useState(false)
    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlert(false);
    };
    const callbackSearch = (childData) => {
        setSearch(childData)
    };
    const FilmNoInCinema = dataFilm.filter(item => {
        data.map(item1 => {
            if (item.id != item1.id) {
                return item
            }
        })
    })

    const RoomOptions = dataFilmNotInCinema.map((item, index) => ({
        id: item.id,
        label: item.title
    }))

    const Room1Options = dataServiceNotInCinema.map((item, index) => ({
        id: item.id,
        label: item.title
    }))
   
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange1 = (newValue) => {


        setStartValue(newValue.format('YYYY/MM/DD'));

    };
    const handleChange2 = (newValue) => {
        setEndValue(newValue.format('YYYY/MM/DD'));

    }; const handleChange3 = (newValue) => {
        setStartDate(newValue.format('YYYY/MM/DD'));

    };
    console.log("ala", dataFilm)
    return (
        <section className=" ml-0 xl:ml-64  px-5 pt-10  ">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab onClick={() => setPage(0)} label="Film In Cinema" {...a11yProps(0)} />
                        <Tab onClick={() => setPage(0)} label="Service In Cinema" {...a11yProps(1)} />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <section className="   px-5 pt-10  ">
                        <Snackbar open={alert} autoHideDuration={4000} onClose={handleCloseAlert} className="float-left w-screen">
                            <Alert onClose={handleCloseAlert} severity={status} >
                                {message}
                            </Alert>
                        </Snackbar>
                        <Paper className='' sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableHead >
                                <div className='pt-2 pl-4 block font-semibold text-xl'>
                                    Films
                                </div>
                            </TableHead>
                            <button className='bg-blue-600 text-white rounded-md ml-5 mt-8 my-6 py-2 px-4' onClick={handleClickOpen}>
                                Add Film In Cinema
                            </button>
                            <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                                className="max-h-full"
                            >
                                <form onSubmit={formik.handleSubmit}>
                                    <BootstrapDialogTitle id="" onClose={handleClose}>
                                        Film
                                    </BootstrapDialogTitle>
                                    <DialogContent dividers >
                                        {errorDate && <div className="text-red-600 mb-2 font-bold">{errorDate}</div>}
                                        <div className='max-w-5xl my-5 mx-auto'>
                                            {formik.errors.idFilm
                                                ? (<Box><div className="text-red-600 mb-2 font-bold">{formik.errors.idFilm}</div>
                                                </Box>)
                                                : null}
                                            <Autocomplete
                                                disableClearable
                                                onChange={(event, value) => formik.setFieldValue("filmId", value.id)}
                                                onBlur={formik.handleBlur} value={formik.values.idFilm}
                                                id="idFilm"
                                                options={RoomOptions}

                                                renderInput={(params) => <TextField {...params} label="Film" />}

                                            />


                                        </div>
                                        <div className='max-w-5xl my-5 mx-auto'>
                                            {formik.errors.startime ? (
                                                <div className="text-red-600 mb-2 font-bold">{formik.errors.startime}</div>

                                            ) : null}
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                   className='w-96 my-5'
                                                    label="Start Date"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={startValue}
                                                    onChange={handleChange1}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className='max-w-5xl my-5 mx-auto'>
                                            {formik.errors.endtime ? (
                                                <div className="text-red-600 mb-2 font-bold">{formik.errors.endtime}</div>

                                            ) : null}

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker

                                                    className='w-96 my-5'
                                                    label="End Date"
                                                    inputFormat="MM/DD/YYYY"
                                                    id="endtime"
                                                    value={endValue}
                                                    onChange={handleChange2}
                                                    onBlur={formik.handleBlur}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </div>

                                    </DialogContent>
                                    <DialogActions>
                                        <Button type='submit'>
                                            Save
                                        </Button>
                                    </DialogActions>
                                </form>
                            </BootstrapDialog>
                            <div className=' float-left ml-5 gap-5 my-6   flex'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="MM/DD/YYYY"
                                        value={startDate}
                                        onChange={handleChange3}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                            </div>
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
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <section className="   px-5 pt-10  ">
                        <Snackbar open={alert} autoHideDuration={4000} onClose={handleCloseAlert} className="float-left w-screen">
                            <Alert onClose={handleCloseAlert} severity={status} >
                                {message}
                            </Alert>
                        </Snackbar>
                        <Paper className='' sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableHead >
                                <div className='pt-2 pl-4 block font-semibold text-xl'>
                                    Service
                                </div>
                            </TableHead>
                            <button className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4' onClick={handleClickOpen}>
                                Add Service In Cinema
                            </button>
                            <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                                className="max-h-full"
                            >
                                <form onSubmit={formik1.handleSubmit}>
                                    <BootstrapDialogTitle id="" onClose={handleClose}>
                                        Service Detail
                                    </BootstrapDialogTitle>
                                    <DialogContent dividers >
                                        <div className='max-w-5xl my-5 mx-auto'>
                                            {formik1.errors.serviceId
                                                ? (<Box><div className="text-red-600 mb-2 font-bold">{formik1.errors.serviceId}</div>
                                                </Box>)
                                                : null}
                                            <Autocomplete
                                                disableClearable
                                                onChange={(event, value) => formik1.setFieldValue("serviceId", value.id)}
                                                onBlur={formik1.handleBlur} value={formik1.values.serviceId}
                                                id="serviceId"
                                                options={Room1Options}

                                                renderInput={(params) => <TextField {...params} label="Service" />}

                                            />


                                        </div>
                                        <div className='max-w-5xl  my-5 mx-auto'>
                                            {formik1.errors.quantity
                                                ? (<div className="text-red-600 mb-2 font-bold">{formik1.errors.quantity}</div>
                                                )
                                                : null}
                                            <TextField error={formik1.errors.quantity ? "error" : null} onChange={formik1.handleChange}
                                                onBlur={formik1.handleBlur} value={formik1.values.quantity}
                                                id="quantity" className='w-96 my-5' label="Quantity" variant="outlined" />
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button type='submit'>
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
                                            {columns1.map((column) => (
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
                                        {rows2
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                        {columns1.map((column) => {
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
                                count={rows2.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </section>
                </TabPanel>

            </Box>
        </section >
    );
}
