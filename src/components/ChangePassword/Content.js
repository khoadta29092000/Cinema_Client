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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { data } from 'autoprefixer';
import './changpass.css'
export default function Content() {
    const SignupSchema = Yup.object().shape({
        
        newPassword: Yup.string()
            .min(6, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Required'),

    });

    const [dataStation, setDataStation] = useState([]);
    const [profileList, setProfileList] = useState("");
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    let DataBody;
    const validName = new RegExp(/^.{6,30}$/);
    useEffect(() => {
        featchProfile();
    }, []);

    async function hanleChangePassword(data) {

           
            let res = await fetch(`http://cinemasystem2.somee.com/api/Account/ChangePassword?${id2[prop]}`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(data)

            }).then(res => res.json())
                .then(result => {

                    if (result) {
                        if (result?.statusCode == 200) {
                            setError("")

                        } if (result?.statusCode == 400) {
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
            const requestURL = `http://cinemasystem2.somee.com/api/Account/${id2[prop]}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setProfileList(responseJSON.data.password)

            console.log("123", responseJSON.data.password)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    let oldPasswordComponent;
    if (profileList != null) {
        oldPasswordComponent = <div className='max-w-5xl  my-5 mx-auto'>

            <TextField type="password" onChange={e => setOldPassword(e.target.value)}

                id="oldPassword" className='w-96 my-5' label="Old Password" variant="outlined" />
        </div>
    }

    return (
        <section className="  ml-64 flex mb-0 pt-10  ">

            <div className=" ml-8 ">

                <h2 className="font-bold text-2xl mb-2 "> Profile</h2>

                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        let body = {
                            oldPassword: oldPassword,
                            newPassword: values.newPassword,
                        }

                        hanleChangePassword(body)
                    }}
                >
                    {({ errors, isValid, touched, dirty }) => (

                        <Form>
                            {error != "" ? <div className='text-red-600'> {error} </div> : null}
                            {oldPasswordComponent}
                            <Field
                                className=" w-96 my-5"
                                name="newPassword"
                                type="password"
                                as={TextField}
                                variant="outlined"
                                color="primary"
                                label="New Password"
                                fullWidt
                                error={Boolean(errors.newPassword) && Boolean(touched.newPassword)}
                                helperText={Boolean(touched.newPassword) && errors.newPassword}
                            />
                            <div className='max-w-5xl  my-5 mx-auto'>
                                <Field
                                    className=" w-96 my-5"
                                    name="confirmPassword"
                                    type="password"
                                    as={TextField}
                                    variant="outlined"
                                    color="primary"
                                    label="Confirm Password"
                                    fullWidt
                                    error={Boolean(errors.confirmPassword) && Boolean(touched.confirmPassword)}
                                    helperText={Boolean(touched.confirmPassword) && errors.confirmPassword}
                                />
                            </div>

                            <Button type="submit">
                                Save
                            </Button>
                        </Form>
                    )
                    }
                </Formik >






            </div >




        </section >
    );
}