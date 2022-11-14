import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { useEffect, useState } from "react";
import * as React from 'react';
import { Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import service from 'pages/Service';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { padding } from '@mui/system';
const columns = [
    { id: 'Image', label: "Combo", minWidth: 300 },
    {
        id: 'Quantity',
        label: 'Quantity',
        minWidth: 150,
        align: "center"
    },
    {
        id: 'Price',
        label: 'Price',
        minWidth: 100,
    },
    {
        id: 'Total',
        label: 'Total',
        minWidth: 100,
    },

];

export default function Content() {
    let location = useLocation();
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    let id2 = parseJwt(localStorage.getItem('token'))
    let prop = 'Id'
    let proprole = 'role'
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [coupon, setCoupon] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [Total, setTotal] = useState(0);
    const [Rap, setRap] = useState("");
    const [Cinema, setCinema] = useState(0);
    const [BapPhoMai, setBapPhoMai] = useState(0);
    const [Bap, setBap] = useState(0);
    const [CocaCola, setCocaCola] = useState(0);
    const [NuocSuoi, setNuocSuoi] = useState(0);
    const [TotalBapPhoMai, setTotalBapPhoMai] = useState(0);
    const [TotalBap, setTotalBap] = useState(0);
    const [TotalCocaCola, setTotalCocaCola] = useState(0);
    const [TotalNuocSuoi, setTotalNuocSuoi] = useState(0);
    const [dataCate, setDataCate] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);
    const [dataCinema, setDataCinema] = useState([]);
    const [count, setCount] = useState(0);
    const [SeatList, setDataSeat] = useState([]);
    const [ServiceArray, setServiceArray] = useState([]);
    const ids = ServiceArray.map(o => o.id)
    const filtered = ServiceArray.filter(({ id }, index) => !ids.includes(id, index + 1))
    if (localStorage.getItem(`token`) == undefined) {
        history.push("/login")

    } else {
        function parseJwt(token) {
            if (!token) { return; }
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
        let id2 = parseJwt(localStorage.getItem('token'))
        let prop = 'Id'
        let proprole = 'role'
        console.log(id2, id2[proprole], proprole)
        if (id2[proprole] != 3) {
            history.push("/")
        }
    }
    let PaymentList = [{ id: 1, name: "MoMo" }, { id: 2, name: "Thanh toán trực tiếp" }]
    const [payment, setPayment] = React.useState(1);

    console.log("daa", location.state)
    const [profileList, setProfileList] = useState("");
    const newSeatList = location.state.SeatList.filter(item => {
        return item.Status == "Choose"
    }
    )
    let serviceInBillObject;
    let tickedObject;
    if (location.state.ServiceArray) {
        serviceInBillObject = location.state.ServiceArray.map((item, index) => ({
            serviceId: item.id,
            quantity: item.id == 1 ? location.state.BapPhoMai : item.id == 2 ? location.state.Bap : item.id == 3 ? location.state.CocaCola : location.state.NuocSuoi
        }))
    }
    if (location.state.SeatList) {
        tickedObject = newSeatList.map((item, index) => ({
            seatId: item.id,
            accountId: id2[prop]
        }))
    }
    const body = {
        accountId: null,
        schedulingId: location.state.scheduling.id,
        paymentId: payment,
        couponId: coupon == "" ? null : coupon,
        serviceInBillObject: serviceInBillObject,
        tickedObject: tickedObject,
    };
    useEffect(() => {
        if (location.state.Bap != undefined) {
            setBap(location.state.Bap);
            setBapPhoMai(location.state.BapPhoMai);
            setNuocSuoi(location.state.NuocSuoi);
            setCocaCola(location.state.CocaCola);
            setTotalBap(location.state.TotalBap);
            setTotalBapPhoMai(location.state.TotalBapPhoMai);
            setTotalNuocSuoi(location.state.TotalNuocSuoi);
            setTotalCocaCola(location.state.TotalNuocSuoi);
            setTotal(location.state.total);
            setServiceArray(location.state.ServiceArray)
            setDataSeat(location.state.SeatList)
        }
        featchCategoryList();
        featchCinemaList();
        featchRoomList();
        featchProfile();
    }, []);
    let bo

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

            setFullname(responseJSON.data.fullName)
            setEmail(responseJSON.data.email)
            setPhone(responseJSON.data.phone)
            console.log("ko", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchCategoryList() {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Service`;

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
    async function featchCinemaList() {
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

            setDataCinema(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchRoomList() {
        try {
            const requestURL = `http://www.cinemasystem.somee.com/api/Room`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataRoom(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function hanleClickPayment() {


        const res = await fetch(`http://cinemasystem2.somee.com/api/Bill`, {
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

                        handleSendMail();
 

                    }
                    if (result?.statusCode == 409) {
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


    }


    async function handleSendMail() {
        const filterCinema = dataCinema.filter(item => {
            if (item.id == location.state.scheduling.cinemaId)
                return (item.name);
        });
        const filterRoom = dataRoom.filter(item => {
            if (item.id == location.state.scheduling.roomId)
                return (item.title)
        });
        const filterTicked = SeatList.filter(item => { if (item.Status == "Choose") { return (item.title) } });
        const filterTickedTitle = filterTicked.map(x => x.title).toString();
        const filterServiceTitle = filtered.map(item => (item.title) + "("+ (item.id == 1 ? BapPhoMai : item.id == 2 ? Bap : item.id == 3 ? CocaCola : NuocSuoi)+")").toString();
        const bodySendMail = {
            to: email,
            subject: "Order Ticked Successfully",
            film: location.state.name.title,
            time: location.state.name.time,
            cinema: filterCinema[0].name,
            room: filterRoom[0].title,
            date: location.state.scheduling.date == undefined ? "" : location.state.scheduling.date.slice(8, 10) + "/" + location.state.scheduling.date.slice(5, 7) + "/" + location.state.scheduling.date.slice(0, 4),
            startTime: location.state.scheduling.startTime == undefined ? "" : location.state.scheduling.startTime.slice(0, 5),
            image: location.state.name.image,
            service: filterServiceTitle,
            ticked: filterTickedTitle,
           
        }
        console.log("location11",bodySendMail)
        const res = await fetch(`http://cinemasystem2.somee.com/api/Bill/SendMail`, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(bodySendMail)
        }).then(res => res.json())
            .then(result => {

                if (result) {
                    if (result?.statusCode == 200) {


                        history.push("/Succesfully")

                    }
                    if (result?.statusCode == 409) {
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


    }

    const handleChange = (event) => {
        setPayment(event.target.value);
    };
    console.log("location11", filtered, ServiceArray, Rap, Cinema)
    return (
        <section className="relative pt-32 mb-32 h-screen py-16 w-full ">
            <div className="max-w-7xl mx-auto p-10 text-center items-center " >
                <div className=' grid grid-cols-3   gap-4'>
                    <div className='col-span-2  '>
                        <Paper className='text-center '>
                            <div className='font-semibold text-left text-4xl ml-2 mt-2'>Payment Information</div>
                            <div className='pt-10'>
                                {error != "" ? <div className='text-red-600 mb-4 text-2xl'>{error}</div> : null}
                                <Box className='' sx={{ minWidth: 384 }}>
                                    <FormControl className='' sx={{ minWidth: 384 }}>
                                        <InputLabel id="demo-simple-select-label">Payment</InputLabel>
                                        <Select
                                            className='w-96 text-center  '
                                            labelId="demo-simple-select-label"
                                            id="payment"
                                            defaultValue={payment}
                                            label="Payment"
                                            onChange={e => setPayment(e.target.value)}
                                        >
                                            {PaymentList.map((cate, index) => {
                                                return (

                                                    <MenuItem key={index} value={cate.id}>{cate.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl >
                                </Box>
                            </div>
                            <div className='max-w-5xl pt-10 mx-auto'>
                                <TextField className='w-96 my-5' onChange={e => setFullname(e.target.value)} disabled value={fullname} id="outlined-basic" label="Full Name" variant="outlined" />
                            </div>
                            <div className='max-w-5xl pt-10 mx-auto'>
                                <TextField className='w-96 my-5' onChange={e => setEmail(e.target.value)} disabled value={email} autoComplete='off' id="outlined-basic" label="Email" variant="outlined" />
                            </div>
                            <div className='max-w-5xl pt-10 mx-auto'>
                                <TextField className='w-96 my-5' onChange={e => setPhone(e.target.value)} disabled value={phone} id="outlined-basic" label="Phone" variant="outlined" />
                            </div>
                            <div className='pt-10 ' style={{ padding: " 40px 0  166px 0" }}  >
                                <TextField className='w-96' id="outlined-basic" label="Coupon" onChange={e => setCoupon(e.target.value)} />
                            </div>
                        </Paper>
                    </div>
                    <div className='col-span-1 text-left  bg-gray-200'>
                        <img src={location.state.name.image} className="w-full h-64 object-cover p-5" />
                        <h2 className='font-medium ml-2 mb-2'>{location.state.name.title}</h2>
                        <div>
                            <button className='text-white ml-2 mr-2 w-8 h-8 bg-blue-600'>C{location.state.name.rated}</button>
                            Phim giành cho đổ tuổi từ {location.state.name.rated} trở lên
                        </div>
                        <div className='font-medium border-b-2 ml-2 mr-4 border-gray-200 px-2 my-2 flex'> Rạp:  <p className=' ml-2 font-normal'> {dataCinema.map(item => {
                            if (item.id == location.state.scheduling.cinemaId)
                                return (item.name);
                        })} | {dataRoom.map(item => {
                            if (item.id == location.state.scheduling.roomId)
                                return (item.title)
                        })} </p> </div>
                        <div className='font-medium border-b-2 ml-2 mr-4 border-gray-300 px-2  my-2 flex'> Suất chiếu:  <p className=' ml-2 mr-2 font-normal'> {location.state.scheduling.startTime == undefined ? "" : location.state.scheduling.startTime.slice(0, 5)}
                        </p>  | Date: <p className=' ml-2 mr-2 font-normal'> {location.state.scheduling.date == undefined ? "" : location.state.scheduling.date.slice(8, 10) + "/" + location.state.scheduling.date.slice(5, 7) + "/" + location.state.scheduling.date.slice(0, 4)}
                            </p> </div>
                        <div className='font-medium border-b-2 ml-2 mr-4 border-gray-300 px-2  my-2 flex'> Chọn Combo: {filtered.map(item => {
                            return (
                                <Fragment>  {item.title}({item.id == 1 ? BapPhoMai : item.id == 2 ? Bap : item.id == 3 ? CocaCola : NuocSuoi}) </Fragment>
                            )
                        })}   </div>
                        <div className='font-medium border-b-2 ml-2 mr-4 border-gray-300 px-2  my-2 flex'> Chọn ghế: {SeatList.map(item => { if (item.Status == "Choose") { return (item.title + " ") } })} </div>
                        <div className='font-medium text-2xl  ml-2 mr-4  px-2  my-2 flex'> Total: <p className='ml-2 text-blue-600'>{Total.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ"} </p> </div>
                        <div className='w-full float-right'>
                            <div className='  float-right'>

                                <button onClick={() => hanleClickPayment()} className='h-12 text-white w-24 bg-blue-600 mt-10 mx-auto float-right  mr-10'>Payment</button>

                            </div>
                            <div className='ml-10'>
                                <NavLink to={{
                                    pathname: "/Service",
                                    state: {
                                        name: location.state.name,
                                        scheduling: location.state.scheduling,
                                        total: (location.state.total - location.state.totalGhe),
                                        totalGhe: 0,
                                        Bap: location.state.Bap,
                                        BapPhoMai: location.state.BapPhoMai,
                                        CocaCola: location.state.CocaCola,
                                        NuocSuoi: location.state.NuocSuoi,
                                        TotalBap: location.state.TotalBap,
                                        TotalBapPhoMai: location.state.TotalBapPhoMai,
                                        TotalCocaCola: location.state.TotalCocaCola,
                                        TotalNuocSuoi: location.state.TotalNuocSuoi,
                                        ServiceArray: location.state.ServiceArray,

                                    }
                                }} className="" >
                                    <button className='h-12 w-24 bg-blue-600 mt-10 mx-auto float-left text-white  ml-10'>Back</button>
                                </NavLink>

                            </div>


                        </div>

                    </div>
                </div>

            </div>

        </section>
    );
}
