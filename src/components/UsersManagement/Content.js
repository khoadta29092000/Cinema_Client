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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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
import queryString from 'query-string';
import { useEffect, useState } from "react";
import Search from 'components/Search';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from 'firebase';
import { v4 } from "uuid";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import { empty } from 'uuidv4';
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
  { id: 'Email', label: "Email", minWidth: 150 },
  {
    id: 'FullName',
    label: 'FullName',
    minWidth: 150,
    align: '',
  },
  {
    id: 'Phone',
    label: 'Phone',
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
    id: 'View',
    label: 'View',
    minWidth: 100,
    align: '',
  },
  {
    id: 'Delete',
    label: 'Delete',
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
  const [id, setId] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(false);
  const [address, setAddress] = useState("");
  const [stationId, setStationId] = useState("");
  const [RoleId, setRoleId] = useState("");
  const [avatar, setAvartar] = useState("");
  const [dataStation, setDataStation] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("success");
  const [alert, setAlert] = useState(false);
  const handleClickOpen = (data) => {
    console.log("111111", data);
    setOpen(true);
    setSelectedValue(data);
    setSelectedImage(data.avatar);
    setId(data.id)
    setEmail(data.email)
    setPassword(data.password)
    setFullname(data.fullname)
    setPhone(data.phone)
    setGender(data.gender)
    setAddress(data.address)
    setStationId(data.cinemaId)
    setAvartar(data.avatar)
    setRoleId(data.roleId)

  };
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(undefined);
    SetClick(false);

  };
  const validName = new RegExp(/^.{4,3000}$/);
  const validPhone = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
  const validNum = new RegExp("^[0-9]*$");

  const body = {
    id: id,
    email: email,
    password: password,
    fullname: fullname,
    phone: phone,
    gender: gender,
    address: address,
    stationId: null,
    avatar: avatar,
    isAdmin: true,
  };
  const bodyCreate = {
    id: id,
    email: email,
    password: password,
    fullname: fullname,
    phone: phone,
    gender: gender,
    address: address,
    stationId: null,
    avatar: avatar,
    isAdmin: true,
  };
  function createData(data) {
    let Email = data.email;
    let FullName = data.fullName;
    let Phone = data.phone;
    let Image = (
      <img
        src={data.avatar}
        loading="lazy"
        className='h-28 w-28'
      />)
    let Active = (<button className="text-white  outline-none bg-black cursor-pointer rounded-lg   h-8 w-8" onClick={() => handleUpdateStatus(data.id)}>
      {data.active == true ? <PublicIcon /> : <PublicOffIcon />}
    </button>);
    let View = (<button className="text-white  outline-none bg-blue-600 rounded-lg   h-8 w-8" onClick={() => handleClickOpen(data)}>
      <RemoveRedEyeIcon />
    </button>);
    let Delete = (<button className="text-white  outline-none bg-red-600 rounded-lg   h-8 w-8" onClick={() => handleDelete(data)}>
      <DeleteIcon />
    </button>);
    return { Image, Email, FullName, Phone, Active, View, Delete };
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedImage, setSelectedImage] = React.useState();
  const [click, SetClick] = React.useState(false)
  const [emailExits, setEmailExists] = useState(false)
  useEffect(() => {
    featchStationList();
    featchAdminList();
    setPage(0);
  }, [search]);

  async function handleUpdateStatus(data) {
    try {


      const requestURL = `http://www.cinemasystem.somee.com/api/Account/UpdateActive?id=${data}`;

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
              featchAdminList();
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("----------", page, rowsPerPage)



  const rows1 = data.map((data, index) => {

    return (createData(data))

  })

  let Id;
  if (selectedValue.id != undefined) {
    Id = (<div className='max-w-5xl my-5 mx-auto'>
      <TextField className='w-96 my-5' defaultValue={id} disabled id="outlined-basic" label="Id" variant="outlined" />
    </div>)
  }
  async function featchAdminList() {
    try {


      const requestURL = `http://www.cinemasystem.somee.com/api/Account?search=${search}`;

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
  async function featchStationList() {
    try {


      const requestURL = `http://www.cinemasystem.somee.com/api/Cinema`;

      const response = await fetch(requestURL, {
        method: `GET`,
        headers: {
          'Content-Type': 'application/json',

        },
      });
      const responseJSON = await response.json();

      const data = responseJSON;

      setDataStation(responseJSON.data)

      console.log("aa fetch", responseJSON.data)

    } catch (error) {
      console.log('Fail to fetch product list: ', error)
    }
  }

  console.log("aa fetch", data)


  const [progresspercent, setProgresspercent] = useState(0);

  async function handleUpload() {
    if (click == false) { setAvartar(selectedImage) }
    else {
      const storageRef = ref(storage, `Avartar/${selectedImage.name + v4()}`);
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
            setAvartar(downloadURL)
          });
        }
      );
    }
  }
  const [NumError, setNum] = useState(false)
  const [phoneErrorr, setDesErr] = useState(false)
  const [nameError, setNameError] = useState(false)
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

  async function handleUpdateOrCreate() {

    if (selectedValue.id != undefined) {
      const res = await fetch(`http://www.cinemasystem.somee.com/api/Account/${selectedValue.id}`, {
        method: `PUT`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bodyCreate)
      }).then(res => res.json())
        .then(result => {

          if (result) {
            if (result?.statusCode == 200) {
              setMess("Update Successfullly")
              setAlert(true)
              setStatus("success")
              handleClose();
              featchAdminList();
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

    } if (selectedValue.id == undefined) {
      console.log("aaangu", selectedValue.id)
      const res = await fetch(`http://www.cinemasystem.somee.com/api/Account`, {
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
              setMess("add Successfullly")
              setAlert(true)
              setStatus("success")
              handleClose();
              featchAdminList();
            }

          } else {
            alert("add UnSuccessfullly")
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
              featchAdminList();
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



  let dataRole = [{ id: 1, name: "Admin" }, { id: 2, name: "Employee" }, { id: 3, name: "Customer" },]


  const AccOptions = dataRole.map((item, index) => ({
    id: item.id,
    label: item.name
  }))
  return (
    <section className=" ml-0 xl:ml-64  px-5 pt-10  ">
      <Snackbar open={alert} autoHideDuration={3000} onClose={handleCloseAlert} className="float-left w-screen">
        <Alert onClose={handleCloseAlert} severity="success" >
          {message}
        </Alert>
      </Snackbar>
      <Paper className=' ' sx={{ width: '100%', overflow: 'hidden' }}>
        <TableHead >
          <div className='pt-2 pl-4 block font-semibold text-xl'>
            Customer Management
          </div>
        </TableHead>
       
        <div className=' float-left ml-5 gap-5 my-6   grid grid-cols-6'>
          <div className='col-span-1 outline-none hover:outline-none'>
            <button className='bg-blue-600 text-white rounded-md ml-5 mt-2 py-2 px-4' onClick={handleClickOpen}>
              Add Account
            </button>


          </div>
          <div className='col-span-5 outline-none  hover:outline-none'>
            <Autocomplete

              disableClearable
              id="combo-box-demo"
              options={AccOptions}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Role" />}
              onChange={(event, value) => setRoleId(value)}
            />


          </div>
         
        </div>
        <div className='pr-5 my-6 float-right'>
            <Search parentCallback={callbackSearch} />
          </div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle onClose={handleClose}>
            Customer Detail
          </BootstrapDialogTitle>
          <DialogContent dividers >
            {nameError && <div className='text-red-600 ml-11 mb-5 text-xl'>Text 4 - 30 character </div>}
            {NumError && <div className='text-red-600 ml-11 mb-5 text-xl'>Id not Number</div>}
            {phoneErrorr && <div className='text-red-600 ml-11 mb-5 text-xl'>phone must be valid</div>}
            {emailExits && <div className='text-red-600 ml-11 mb-5 text-xl'>Email exists </div>}
            {Id}
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
              {selectedImage == undefined ? <div></div> : <img alt="" className='mx-auto h-48 w-48 my-5' src={click == false ? selectedValue.avatar : window.URL.createObjectURL(selectedImage)} />}
            </div>
            <Button variant="contained"
              component="label"

              onClick={handleUpload} className='bg-blue-600 text-white rounded-md ml-5 my-6 py-2 px-4' >
              Save Img
            </Button>
            <div className='max-w-5xl my-5 mx-auto'>
              <TextField className='w-96 my-5' onChange={e => setFullname(e.target.value)} defaultValue={selectedValue.fullname} id="outlined-basic" label="Full Name" variant="outlined" />
            </div>
            <div className='max-w-5xl my-5 mx-auto'>
              <TextField className='w-96 my-5' onChange={e => setEmail(e.target.value)} defaultValue={selectedValue.email} autoComplete='off' id="outlined-basic" label="Email" variant="outlined" />
            </div>
            <div className='max-w-5xl my-5 mx-auto'>
              <TextField className='w-96 my-5' onChange={e => setPassword(e.target.value)} autoComplete='off' defaultValue={selectedValue.password} id="outlined-basic" label="Password" variant="outlined" type="password" />
            </div>
            <div className='max-w-5xl my-5 mx-auto'>
              <TextField className='w-96 my-5' onChange={e => setPhone(e.target.value)} defaultValue={selectedValue.phone} id="outlined-basic" label="Phone" variant="outlined" />
            </div>
            <div className='max-w-5xl my-5 mx-auto'>
              <TextField className='w-96 my-5' onChange={e => setAddress(e.target.value)} defaultValue={selectedValue.phone} id="outlined-basic" label="Address" variant="outlined" />
            </div>
            <div className='max-w-5xl my-5 mx-auto'>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={gender}
                    label="Gender"
                    onChange={e => setGender(e.target.value)}
                  >
                    <MenuItem value={true}>Male</MenuItem>
                    <MenuItem value={false}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className='max-w-5xl my-5 mx-auto'>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cinema</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={stationId}
                    label="Station"
                    onChange={e => setStationId(e.target.value)}
                  >
                    {dataStation.map((cate, index) => {
                      console.log("aaaaa", cate.id)
                      return (

                        <MenuItem key={index} value={cate.id}>{cate.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className='max-w-5xl my-5 mx-auto'>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={RoleId}
                    label="Station"
                    onChange={e => setRoleId(e.target.value)}
                  >
                    {dataRole.map((cate, index) => {
                      console.log("aaaaa", cate.id)
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