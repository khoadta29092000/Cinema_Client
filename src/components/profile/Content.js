import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import H3 from '@material-tailwind/react/Heading3';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
import ProfilePicture from 'assets/img/team-2-800x800.jpg';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import * as Yup from "yup"
import { data } from 'autoprefixer';
export default function Content() {
    const [id, setId] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setfullName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState();
    const [address, setAddress] = useState("");
    const [stationId, setStationId] = useState("");
    const [avatar, setAvartar] = useState("");
    const [dataStation, setDataStation] = useState([]);
    const [profileList, setProfileList] = useState();
  

    let DataBody;
    const formik = useFormik({
        initialValues:{
        id: '',
        email: '',
        password: '',
        fullName: '',
        phone: '',
        gender: '',
        address: '',
        avatar: '',
        isAdmin: '',
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
        // confirmPassword: Yup.string().oneOf([Yup.ref('matKhau'), null], 'Passwords must match'),
        fullName: Yup.string().min(3, "Too Short!"),
        phone: Yup.number().typeError("Must be number!").min(10, "Too Short!").required("Required"),
  
      }),
      onSubmit: values => {
        DataBody = {
            id: values.id,
            fullName:values.fullName,
            email:values.email,
            phone:values.phone,
            address:values.address,
            gender:values.gender,
            password:values.password,
            isAdmin:true,
            avatar: values.avatar,

        }
        console.log("da bam",DataBody)
        handleUpdateOrCreate(DataBody)
    }
  
    });
    useEffect(() => {
       
        featchProfile();
    }, []);
  
    async function handleUpdateOrCreate(data) {
        console.log("da bam")
  

            let res = await fetch(`http://www.cinemasystem.somee.com/api/Accounts`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',
                
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(result => {

                    if (result) {
                        if (result?.statusCode == 201) {

                            featchProfile();
                        }

                    } else {
                        alert("Update UnSuccessfullly")
                    }
                    return res

                })
                .catch((error) => {
                    throw ('Invalid Token')
                })
            return DataBody


        }
    
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    let id2 = parseJwt(localStorage.getItem('token'))
    let prop = 'Id'
    let proprole = 'role'
    async function featchProfile(values) {
        try {
            const requestURL = `http://www.cinemasystem.somee.com/api/Account/${id2[prop]}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setProfileList(responseJSON.data)
            console.log("123", data)
            formik.setValues(responseJSON.data)
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
   
    return (
        <section className=" ml-0 xl:ml-64 mb-0 pt-10  ">

            <div className=" ml-8 ">
lname
                <h2 className="font-bold text-2xl mb-2 "> Profile</h2>
                <div className='max-w-5xl hidden my-5 mx-auto'>
                    <TextField className='w-96 my-5' defaultValue={data.avatar} id="outlined-basic" label="Full Name" variant="outlined" />
                </div>
                {/* <div className='max-w-5xl hidden my-5 mx-auto'>
                    <TextField className='w-96 my-5'  onChange={formik.handleChange} 
                      id="outlined-basic" label="Full Name" variant="outlined"  value={formik.values.fullName}  />
                          <p className="text-red-700">{formik.errors.fullName}</p>
                </div> */}
                <div className='max-w-5xl my-5 mx-auto'>
                {formik.errors.fullName
                ? (<div className="text-red-600 mb-2 font-bold">{formik.errors.fullName}</div>
                )
                : null}
              <TextField error={formik.errors.fullName ? "error" : null} onChange={formik.handleChange}
                onBlur={formik.handleBlur} value={formik.values.fullName}
                id="fullName" className='w-96 my-5' label="Full Name" variant="outlined" />
                    
                </div>
                <div className='max-w-5xl my-5 mx-auto'>
               
              {formik.errors.email
                ? (<div className="text-red-600 mb-2 font-bold">{formik.errors.email}</div>
                )
                : null}
              <TextField error={formik.errors.email ? "error" : null} onChange={formik.handleChange}
                onBlur={formik.handleBlur} value={formik.values.email}
                id="email" className='w-96 my-5' label="Email" variant="outlined" />
                </div>
                {/* <div className='max-w-5xl hidden my-5 mx-auto'>
                    <TextField className='w-96 my-5' autoComplete='off' defaultValue={profileList.password} id="outlined-basic" label="Password" variant="outlined" />
                </div> */}
                <div className='max-w-5xl my-5 mx-auto'>
                  {formik.errors.phone
                ? (<div className="text-red-600 mb-2 font-bold">{formik.errors.phone}</div>
                )
                : null}
              <TextField error={formik.errors.phone ? "error" : null} onChange={formik.handleChange}
                onBlur={formik.handleBlur} value={formik.values.phone}
                id="phone" className='w-96 my-5' label="Phone" variant="outlined" />
                </div>
                
                <div className='max-w-5xl my-5 mx-auto'>
                  {formik.errors.gender
                ? (<div className="text-red-600 mb-2 font-bold">{formik.errors.gender}</div>
                )
                : null}
              <TextField error={formik.errors.gender ? "error" : null} onChange={formik.handleChange}
                onBlur={formik.handleBlur} value={formik.values.gender}
                id="gender" className='w-96 my-5' label="gender" variant="outlined" />
                </div>
                {/* <div className='max-w-5xl my-5 mx-auto'>
                    <TextField className='w-96 my-5' onChange={e => setAddress(e.target.value)} defaultValue={profileList.address} id="outlined-basic" label="Address" variant="outlined" />
                </div> */}
                {/* <div className='max-w-5xl my-5 mx-auto'>
                    <Box className='w-96' sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={profileList.gender}
                                label="Gender"
                                onChange={e => setGender(e.target.value)}
                            >
                                <MenuItem value={true}>Male</MenuItem>
                                <MenuItem value={false}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div> */}

            </div>





        </section>
    );
}