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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { data } from 'autoprefixer';
export default function Content() {
    const [dataStation, setDataStation] = useState([]);
    const [profileList, setProfileList] = useState();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    let DataBody;
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            fullName: "",
            phone: "",
            gender: "",
            address: "",
            cinemaId: "",
            avatar: "",
            date: "",
            roleId: "",
            active: true,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required(),
            fullName: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
            address: Yup.string().min(5, "Too Short!").max(4000, "Too Long!").required(),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
            date: Yup.date().max("2010/1/1", "Birth Date <= 2010"),
            gender: Yup.string().required(),
        }), onSubmit: values => {

            let DataBody

            DataBody = {
                id: values.id,
                email: values.email,
                password: values.password,
                fullName: values.fullName,
                phone: values.phone,
                gender: values.gender,
                address: values.address,
                cinemaId: values.cinemaId,
                avatar: values.avatar,
                date: values.date,
                roleId: values.roleId,
                active: values.active,
                isLogged: values.isLogged,
            }

            handleUpdateOrCreate(DataBody);
        },
    });
    useEffect(() => {
        featchProfile();
    }, []);
    let dataRole = [{ id: 1, name: "Admin" }, { id: 2, name: "Employee" }, { id: 3, name: "Customer" },]
    async function handleUpdateOrCreate(data) {



        let res = await fetch(`http://www.cinemasystem.somee.com/api/Account/${formik.values.id}`, {
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)

        }).then(res => res.json())
            .then(result => {

                if (result) {
                    if (result?.statusCode == 200) {

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
        return data



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
        <section className="  ml-64 flex mb-0 pt-10  ">

            <div className=" ml-8 ">

                <h2 className="font-bold text-2xl mb-2 "> Profile</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className='max-w-5xl  my-5 mx-auto'>
                        {formik.errors.email
                            ? (<div className="text-red-600 mb-2 font-bold">{formik.errors.email}</div>
                            )
                            : null}
                        <TextField error={formik.errors.email ? "error" : null} onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.email}
                            id="email" className='w-96 my-5' label="Email" variant="outlined" />
                    </div>

                    <div className='max-w-5xl  my-5 mx-auto'>
                        {formik.errors.fullName
                            ? (<div className="text-red-600 mb-2 w-full font-bold">{formik.errors.fullName}</div>
                            )
                            : null}
                        <TextField error={formik.errors.fullName ? "error" : null} onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.fullName}
                            id="fullName" className='w-96 my-5' label="Full Name" variant="outlined" />
                    </div>
                    <div className='max-w-5xl  my-5 mx-auto'>
                        {formik.errors.phone
                            ? (<div className="text-red-600 mb-2 font-bold">{formik.errors.phone}</div>
                            )
                            : null}
                        <TextField error={formik.errors.phone ? "error" : null} onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.phone}
                            id="phone" className='w-96 my-5' label="Phone" variant="outlined" />
                    </div>
                    <div className='max-w-5xl  my-5 mx-auto'>
                        {formik.errors.address
                            ? (<div className="text-red-600 mb-2 font-bold">{formik.errors.address}</div>
                            )
                            : null}
                        <TextField error={formik.errors.address ? "error" : null} onChange={formik.handleChange}
                            onBlur={formik.handleBlur} value={formik.values.address}
                            id="address" className='w-96 my-5' label="Address" variant="outlined" />
                    </div>
                    <div className='max-w-5xl my-5 mx-auto'>
                        {formik.errors.gender
                            ? (<div className="text-red-600 mb-2 font-bold">{formik.errors.gender}</div>
                            )
                            : null}
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select

                                    labelId="demo-simple-select-label"
                                    id="gender"
                                    defaultValue={formik.values.gender}
                                    label="Gender"
                                    onChange={e => formik.setFieldValue("gender", e.target.value)}
                                >
                                    <MenuItem value={true}>Male</MenuItem>
                                    <MenuItem value={false}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className='max-w-5xl my-5 mx-auto'>
                        {formik.errors.date ? (
                            <div className="text-red-600 w-32 flex mb-2 font-bold">{formik.errors.date}</div>

                        ) : null}

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker

                                className='w-96 my-5'
                                label="Birth Date"
                                inputFormat="MM/DD/YYYY"
                                id="date"
                                value={formik.values.date}
                                onChange={value => formik.setFieldValue("date", value)}
                                onBlur={formik.handleBlur}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <Button type='submit'>

                        Save
                    </Button>
                </form>
            </div>




        </section >
    );
}