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

export default function Content() {
    const [id, setId] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState(false);
    const [address, setAddress] = useState("");
    const [stationId, setStationId] = useState("");
    const [avatar, setAvartar] = useState("");
    const [dataStation, setDataStation] = useState([]);
    const [profileList, setProfileList] = useState([]);
    const [NumError, setNum] = useState(false)
    const [phoneErrorr, setDesErr] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [message, setMess] = useState(false)
    const validName = new RegExp(/^.{4,3000}$/);
    const validPhone = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
    const validNum = new RegExp("^[0-9]*$");
    let body;


    body = {
        id: profileList.id,
        email: profileList.email,
        password: password,
        fullname: fullname,
        phone: phone,
        gender: gender,
        address: address,
        stationId: null,
        avatar: profileList.avatar,
        isAdmin: true,
    };


    useEffect(() => {
        featchStationList();
        featchProfile();
    }, []);
    async function handleUpdateOrCreate() {
        console.log("da bam")
        if (!validName.test(fullname) || !validName.test(address)) {
            setNameError(true)
            setDesErr(false)
            setNum(false)
        } else if (!validPhone.test(phone)) {
            setNameError(false)
            setDesErr(true)
            setNum(false)
        } else if (!validNum.test(id)) {
            setNameError(false)
            setDesErr(false)
            setNum(true)
        }
        else {
            setNum(false)
            setNameError(false)
            setDesErr(false)

            const res = await fetch(`http://www.cinemasystem.somee.com/api/Accounts`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(body)
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
            return body


        }
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
    async function featchProfile() {
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
            console.log("aa aaaaaaaaaaaaaaa", profileList)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchStationList() {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Stations/Getallstations`;

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
    return (
        <section className=" ml-0 xl:ml-64 mb-0 pt-10  ">

            <div className=" ml-8 ">

                <h2 className="font-bold text-2xl mb-2 "> Profile</h2>
                <div className='max-w-5xl hidden my-5 mx-auto'>
                    <TextField className='w-96 my-5' defaultValue={profileList.avatar} id="outlined-basic" label="Full Name" variant="outlined" />
                </div>
                <div className='max-w-5xl hidden my-5 mx-auto'>
                    <TextField className='w-96 my-5' onChange={e => setId(e.target.value)} defaultValue={profileList.id} id="outlined-basic" label="Full Name" variant="outlined" />
                </div>
                <div className='max-w-5xl my-5 mx-auto'>
                    <TextField className='w-96 my-5' onChange={e => setFullname(e.target.value)} defaultValue={profileList.fullname} id="outlined-basic" label="Full Name" variant="outlined" />
                </div>
                <div className='max-w-5xl my-5 mx-auto'>
                    <TextField className='w-96 my-5' onChange={e => setEmail(e.target.value)} disabled defaultValue={profileList.email} autoComplete='off' id="outlined-basic" label="Email" variant="outlined" />
                </div>
                <div className='max-w-5xl hidden my-5 mx-auto'>
                    <TextField className='w-96 my-5' autoComplete='off' defaultValue={profileList.password} id="outlined-basic" label="Password" variant="outlined" />
                </div>
                <div className='max-w-5xl my-5 mx-auto'>
                    <TextField className='w-96 my-5' onChange={e => setPhone(e.target.value)} defaultValue={profileList.phone} id="outlined-basic" label="Phone" variant="outlined" />
                </div>
                <div className='max-w-5xl my-5 mx-auto'>
                    <TextField className='w-96 my-5' onChange={e => setAddress(e.target.value)} defaultValue={profileList.address} id="outlined-basic" label="Address" variant="outlined" />
                </div>
                <div className='max-w-5xl my-5 mx-auto'>
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
                </div>

            </div>





        </section>
    );
}
