import Card from '@material-tailwind/react/Card';
import * as Yup from 'yup';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import Button from '@material-tailwind/react/Button';
import DefaultNavbar from 'components/DefaultNavbar';
import SimpleFooter from 'components/SimpleFooter';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import { default as React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import { InputLabel, Select } from '@material-ui/core';
import { FormControl, MenuItem } from '@mui/material';
export default function Register() {
    const [gender, setGender] = useState("");
    const [fullName, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPass] = useState("")
    const [phone, setPhone] = useState("")
    const [date,setDate]=useState("")
    // const [phoneErrorr, setPhoneErrorr] = useState(false)
    // const [nameError, setNameError] = useState(false)
    // const [emailError, setEmailError] = useState(false);
    // const [passwordError, setPasswordError] = useState(false)
    // const [confirmPassError, setConfirmPassError] = useState(false)
    // const [genderError,setGenderError]=useState(false)
    // const [dateError,setDateError]=useState(false)
    // const validName = new RegExp("(?=.{6,30}$)");
    // const validPass = new RegExp("(?=.{6,30}$)");
    // const validPhone = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
    // const validEmail = new RegExp("^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$");
  
    const history = useHistory();
    const [error, setError] = useState("")
    const [errorNameExit, setErrorNameExit] = useState("")
   
    const handleSubmit = async () => {

        // if (!validName.test(name)) {
        //     setNameError(true)
        //     setEmailError(false)
        //     setPasswordError(false)
        //     setConfirmPassError(false)
        //     setPhoneErrorr(false)
        //     setDateError(false)
        //     setGenderError(false)
        // }
        // else if (!validEmail.test(email)) {
        //     setNameError(false)
        //     setEmailError(true)
        //     setPasswordError(false)
        //     setConfirmPassError(false)
        //     setPhoneErrorr(false)
        //     setDateError(false)
        //     setGenderError(false)

        // }
        // else if (!validPass.test(password)) {
        //     setNameError(false)
        //     setEmailError(false)
        //     setPasswordError(true)
        //     setConfirmPassError(false)
        //     setPhoneErrorr(false)
        //     setDateError(false)
        //     setGenderError(false)
        // }
        // else if (confirmPass !== password) {
        //     setNameError(false)
        //     setEmailError(false)
        //     setPasswordError(false)
        //     setConfirmPassError(true)
        //     setPhoneErrorr(false)
        //     setDateError(false)
        //     setGenderError(false)
        // }else if (!validPhone.test(phone)) {
        //     setNameError(false)
        //     setEmailError(false)
        //     setPasswordError(false)
        //     setConfirmPassError(false)
        //     setPhoneErrorr(true)
        //     setDateError(false)
        //     setGenderError(false)
            
        // } else {
        //     setNameError(false)
        //     setEmailError(false)
        //     setPasswordError(false)
        //     setConfirmPassError(false)
        //     setPhoneErrorr(false)
        
            const body = {
                fullName: fullName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                date:date,
                gender:gender,
                phone:phone

            };
            let res = await fetch("http://cinemasystem2.somee.com/api/Account/Register", {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
                body: JSON.stringify(body)

            }).then(res => res.json())
                .then(result => {
                    if(result?.data?.resultCode == 200){
                      history.push("/login")
    
                    }else{
                        setError(result?.errors?.email)  
                        setErrorNameExit(result?.errors?.username) 
                    }
                })
                .catch((error) => {
                    throw ('Invalid Token')
                })
            return body
        }

    // }
    return (
        <Page>
            <DefaultNavbar />
            <Container>
                <Card>
                    <CardHeader color="lightBlue">
                        <H5 color="white" style={{ marginBottom: 0 }}>
                            Register
                        </H5>
                    </CardHeader>
                    {/* {error != "" && <div className='text-red-600 ml-11 px-8 text-xl'>{error} </div>}
                    {errorNameExit != "" && <div className='text-red-600 ml-11 px-8 text-xl'>{errorNameExit} </div>}
                    {nameError && <div className='text-red-600 ml-11 px-8 text-xl'>Username is not short more 6 character </div>}
                    {emailError && <div className='text-red-600 ml-11 px-8 text-xl'>Email must be valid</div>}
                    {passwordError && <div className='text-red-600 ml-11 px-8 text-xl'>Pass is not short more 6 character </div>}
                    {confirmPassError && <div className='text-red-600 ml-11 px-8 text-xl'>Repeat password must be same password </div>}
                    {phoneErrorr && <div className='text-red-600 ml-11 px-8 text-xl'>Phong must be valid </div>} */}
                    <CardBody>
                        <div className="mb-10 px-4">
                            <InputIcon
                                type="text"
                                color="lightBlue"
                                placeholder="Full Name"
                                iconName="account_circle"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-10 px-4">
                            <InputIcon
                                type="email"
                                color="lightBlue"
                                placeholder="Email Address"
                                iconName="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-10 px-4">
                            <InputIcon
                                type="password"
                                color="lightBlue"
                                placeholder="Password"
                                iconName="lock"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-10 px-4">
                            <InputIcon
                                type="password"
                                color="lightBlue"
                                placeholder="Repeat Password"
                                iconName="lock"
                                onChange={e => setConfirmPass(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <InputIcon
                                type="phone"
                                color="lightBlue"
                                placeholder="Phone"
                                iconName="phone"
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <InputIcon
                                type="date"
                                color="lightBlue"
                                placeholder="date"
                                iconName="date"
                                onChange={e => setDate(e.target.value)}
                            />
                        </div>
                        <div>
                        <Box>
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
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center">
                            <Button
                                color="lightBlue"
                                buttonType="link"
                                size="lg"
                                ripple="dark"
                                onClick={handleSubmit}

                            >
                                Register
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Container>
            <SimpleFooter />
        </Page>
    );
}
