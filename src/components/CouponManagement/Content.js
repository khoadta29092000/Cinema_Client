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
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import Search from 'components/Search';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useFormik } from "formik";
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
    { id: 'Id', label: "Id", minWidth: 100 },
    {
        id: 'Discount',
        label: 'Discount',
        minWidth: 100,
    },
    {
        id: 'StartDate',
        label: 'Start Date',
        minWidth: 100,
    },
    {
        id: 'EndDate',
        label: 'End Date',
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
const BootstrapDialogdiscount = (props) => {
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

BootstrapDialogdiscount.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function Content() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState([]);
    const [status, setStatus] = useState("");
    const [id, setId] = useState("");
    const [discount, setDiscount] = useState("");
    const [description, setDescription] = useState("");
    var today = new Date()
    const [startDate, setStartDate] = useState(dayjs(today));
    const [endDate, setEndDate] = useState(dayjs(today));
    const [dataCinema, setDataCinema] = useState([]);
    const [dataCoupon, setDataCoupon] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);
    const [search, setSearch] = useState("");
    const [click, SetClick] = useState(false)
    const [selectedImage, setSelectedImage] = useState("");
    const [alert, setAlert] = useState(false);
    let DataBody;
    const formik = useFormik({
        initialValues: {
            id: '',
            discount: '',
            startDate: '',
            endDate: '',
            description: '',
        },
        validationSchema: Yup.object().shape({
            id: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required('Required'),
            discount: Yup.number().typeError("Must be number!").max(100,"Dicount not > 100%").required('Required'),
            startDate: Yup.date().required('Required'),
            endDate: Yup.date(),
            description: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required("Required"),

        }), onSubmit: values => {
           
           
                DataBody = {
                    id: values.id,
                    discount: values.discount,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    description: values.description,
                }
                console.log("da bam", DataBody)
                handleUpdateOrCreate(values);
           
        }
    });
    async function handleUpdateOrCreate(values) {
        console.log("da bam", values)
        if (selectedValue.id != undefined) {
            const res = await fetch(`http://www.cinemasystem.somee.com/api/Coupon/${selectedValue?.id}`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(DataBody)
            }).then(res => res.json())
                .then(result => {

                    if (result) {
                        if (result?.statusCode == 200) {
                            setMess("Update Successfullly")
                            setAlert(true)
                            setStatus("success")
                            handleClose();
                            featchCouponList();
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
            const res = await fetch(`http://www.cinemasystem.somee.com/api/Coupon`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(DataBody)
            }).then(res => res.json())
                .then(result => {

                    if (result) {
                        if (result?.statusCode == 200) {
                            setMess("Add Successfullly")
                            setAlert(true)
                            setStatus("success")
                            handleClose();
                            featchCouponList();
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


    const handleClickOpen = (data) => {
        console.log("111111", data);
        setOpen(true);

        if (data != undefined) {
            formik.setValues(data);
        }

        setSelectedValue(data);
        setSelectedImage(data.img);
        setStartDate(data.startDate)
        setEndDate(data.endDate)
        setId(data.id)
        setDiscount(data.discount)
        setDescription(data.description)
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedImage(undefined);

        SetClick(false);
    };

    const body = {
        id: id,
        discount: discount,
        description: description,
        startDate: startDate,
        endDate: endDate,
        active: true,
        priceRange: 0
    };

    useEffect(() => {

        featchCouponList();
        setPage(0);
    }, [search]);
    function createData(data) {
        let Id = data.id;
        let Discount = data.discount + "%";
        let StartDate = data.startDate.slice(8, 10) + "/" + data.startDate.slice(5, 7) + "/" + data.startDate.slice(0, 4);;
        let EndDate = data.endDate.slice(8, 10) + "/" + data.endDate.slice(5, 7) + "/" + data.endDate.slice(0, 4);;


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

        return { Id, Discount, StartDate, EndDate, Active, Action };
    }
    async function handleUpdateStatus(data) {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Coupon/UpdateActive?id=${data}`;

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
                            featchCouponList();
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



    const rows1 = dataCoupon.map((data, index) => {
        return (createData(data))
    })

    async function featchCouponList() {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Coupon?search=${search}`;

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



    const [progresspercent, setProgresspercent] = useState(0);


    const [error, setError] = useState("")
    const [message, setMess] = useState(false)

    async function handleDelete(data) {

        let res = await fetch(`http://www.cinemasystem.somee.com/api/Coupon/${data?.id}`, {
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
                    featchCouponList();
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
    async function handleLa(data) {

        console.log("ngu", startDate)
        console.log("ngu", endDate)
        console.log("ngu", body)
    }
    const handleChange = (newValue) => {
        setStartDate(newValue);


    };
    const handleChange1 = (newValue) => {
        setEndDate(newValue);
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
                        Coupon Management
                    </div>
                </TableHead>
                <button className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4' onClick={handleClickOpen}>
                    Add Coupon
                </button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby=""
                    open={open}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <BootstrapDialogdiscount id="" onClose={handleClose}>
                            Add Coupon
                        </BootstrapDialogdiscount>
                        <DialogContent dividers >
                            {error && <div className='text-red-600 ml-11 mb-5 text-xl'>{error}</div>}

                            {selectedValue.id == undefined ?
                                <div className='max-w-5xl my-5 mx-auto'>
                                    {formik.errors.id && formik.touched.id ? (
                                        <Box > <div className="text-red-600 mb-2 font-bold">{formik.errors.id}</div>
                                            <TextField error className='w-96 my-5' onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} defaultValue={formik.values.id} id="id" label="Id" variant="outlined" />

                                        </Box>
                                    ) : <TextField className='w-96 my-5' onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} defaultValue={formik.values.id} id="id" label="Id" />}
                                </div>
                                :
                                <div className='max-w-5xl my-5 mx-auto'>
                                    <TextField className='w-96 my-5' onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} defaultValue={formik.values.id} disabled id="id" label="Id" variant="outlined" />
                                </div>
                            }

                            <div className='max-w-5xl my-5 mx-auto'>

                                {formik.errors.discount && formik.touched.discount ? (
                                    <Box > <div className="text-red-600 mb-2 font-bold">{formik.errors.discount}</div>
                                        <TextField error className='w-96 my-5' onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} defaultValue={formik.values.discount} id="discount" label="discount" variant="outlined" />
                                    </Box>
                                ) : <TextField className='w-96 my-5' onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} defaultValue={formik.values.discount} autoComplete='off' id="discount" label="discount" variant="outlined" />}


                            </div>
                            <div className='max-w-5xl my-5 mx-auto'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        className='w-96 my-5'
                                        label="Start Date"
                                        inputFormat="MM/DD/YYYY"
                                        id="startDate"
                                        value={formik.values.startDate}
                                        onChange={value => formik.setFieldValue("startDate", value)}
                                        onBlur={formik.handleBlur}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className='max-w-5xl my-5 mx-auto'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        className='w-96 my-5'
                                        label="End Date"
                                        inputFormat="MM/DD/YYYY"
                                        id="endDate"
                                        value={formik.values.endDate}
                                        onChange={value => formik.setFieldValue("endDate", value)}
                                        onBlur={formik.handleBlur}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className='max-w-5xl my-5 mx-auto'>

                            </div>
                            <div className='max-w-5xl my-5 mx-auto'>
                                {formik.errors.description && formik.touched.description ? (
                                    <div className="text-red-600 mb-2 font-bold">{formik.errors.description}</div>

                                ) : null}

                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
                                <textarea onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} defaultValue={formik.values.description} id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <TextField type="submit" onSubmit={formik.handleSubmit}>
                                Save
                            </TextField>
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


