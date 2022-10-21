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
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage"
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
        id: 'Title',
        label: 'Title',
        minWidth: 150,
    },
    {
        id: 'Product',
        label: 'Product',
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
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [click, SetClick] = useState(false)
    const [selectedImage, setSelectedImage] = useState("");
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
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedImage(undefined);
        SetClick(false);
    };
    const validName = new RegExp(/^.{6,30}$/);
    const validDes = new RegExp(/^.{6,300}$/);
    const body =  {   
        id: id,         
        title: title,
        description: description,       
        img: img,
        active: true
    };
    let Id;
    if (selectedValue.id != undefined) {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5'onChange={e => setId(e.target.value)}  defaultValue={selectedValue.id} disabled id="outlined-basic" label="Id" variant="outlined" />
        </div>)
    } else {
        Id = (<div className='max-w-5xl my-5 mx-auto'>
            <TextField className='w-96 my-5' onChange={e => setId(e.target.value)} defaultValue={selectedValue.id} id="outlined-basic" label="Id" variant="outlined" />
        </div>)
    }
    useEffect(() => {
        featchCategoryList();
        setPage(0);
    }, [search] );
    function createData(data) {
        let Title = data.title;
    
        let Image = (
            <img
                src={data.img}
                loading="lazy"
                className='h-28 w-28'
            />)
        let Product = (
            <Link
                to={{
                    pathname: "/ProductsManagement",
                    state: {
                        name: data.id
                    }
                }} className="">
                <button className="text-white  outline-none bg-green-500 px-3 py-2 rounded-xl  ">
                    View Products
                </button>
            </Link>)
        let Edit = (<button className="text-white  outline-none bg-blue-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
            <EditIcon />
        </button>);
        let Delete = (<button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8" onClick={() => handleDelete(data)}>
            <DeleteIcon />
        </button>);

        return { Image, Title, Product, Edit, Delete };
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

    async function featchCategoryList() {
        try {
    
         
          const requestURL = `http://www.subcriptionmilk.somee.com/api/Categories/Getallcategories?search=${search}`;
    
          const response = await fetch(requestURL, {
            method: `GET`,
            headers: {
              'Content-Type': 'application/json',
             
            },
          });
          const responseJSON = await response.json();
    
          const  data  = responseJSON;
    
          setData(responseJSON.data)
        
       console.log("aa fetch", responseJSON.data)
    
        } catch (error) {
          console.log('Fail to fetch product list: ', error)
        }
      }

      console.log("aa fetch", data)
    
    
    const [progresspercent, setProgresspercent] = useState(0);

async function handleUpload(){
    if(click == false){setImg(selectedImage)}
        else{
            const storageRef =  ref(storage, `Category/${selectedImage.name + v4()}`);
            const uploadTask =  uploadBytesResumable(storageRef, selectedImage);
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
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>  {
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
    async function handleUpdateOrCreate()  {     
        if (!validName.test(title)) {
            setNameError(true)
            setPhoneErrorr(false)
            setNameExists(false)
            setIdExists(false)
        }else if (!validDes.test(description)) {
            setNameError(false)
            setPhoneErrorr(true)
            setNameExists(false)
            setIdExists(false)
        }else if (TitleExists(title) == true && selectedValue.id == undefined) {
            setNameError(false)
            setPhoneErrorr(false)
            setNameExists(true)
            setIdExists(false)
        }else if (IdExists(id) == true && selectedValue.id == undefined) {
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
            if(selectedValue.id != undefined){
                const res = await fetch(`http://www.subcriptionmilk.somee.com/api/Categories/update`, {
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
                                featchCategoryList();
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
              
            }else{
                const res = await fetch(`http://www.subcriptionmilk.somee.com/api/Categories/create`, {
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
                                handleClose();
                                featchCategoryList();
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

            let res = await fetch(`http://www.subcriptionmilk.somee.com/api/Categories/${data?.id}`, {
                method: `DELETE`,
                headers: {
                    'Content-Type': 'application/json',
                  
                },
            }).then(res => res.json())
                .then(result => {
    
                    if (result?.statusCode === 200) {
                        setMess(result.content)
                        setAlert(true)
                        featchCategoryList();
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
            <Paper className='' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableHead >
                    <div className='pt-2 pl-4 block font-semibold text-xl'>
                        Category Management
                    </div>
                </TableHead>
                <button className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4' onClick={handleClickOpen}>
                    Add Category
                </button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby=""
                    open={open}
                >
                    <BootstrapDialogTitle id="" onClose={handleClose}>
                        Add Delivery Boy
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
                        { selectedImage == undefined  ? <div></div> :  <img alt="" className='mx-auto h-24 w-24 my-5'src={ click == false ? selectedValue.img : window.URL.createObjectURL(selectedImage) } />}
                        </div>
                        <Button  variant="contained"
                                component="label"
                    
                                onClick={handleUpload} className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4' >
                  Save Img
                </Button>      
                        <div className='max-w-5xl my-5 mx-auto'>
                            <TextField className='w-96 my-5' onChange={e => setTitle(e.target.value)} defaultValue={selectedValue.title} autoComplete='off' id="outlined-basic" label="Title" variant="outlined" />
                        </div>
                        <div className='max-w-5xl my-5 mx-auto'>
                            <TextField className='w-96 my-5' onChange={e => setDescription(e.target.value)} defaultValue={selectedValue.description} autoComplete='off' id="outlined-basic" label="Description" variant="outlined" />
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


