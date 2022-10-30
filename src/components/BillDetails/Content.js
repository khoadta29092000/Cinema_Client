import * as React from 'react';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Card } from "@mui/material";
import { Link } from 'react-router-dom';
import { style } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { data } from 'autoprefixer';
import { Dataset, NightShelter } from '@mui/icons-material';

export default function Content() {
    const [search, setSearch] = useState("");
    const { state } = useLocation()
    const [Product, setProduct] = useState([]);
    const [dataFilm, setFilm] = useState([]);
    const [dataScheduling, setScheduling] = useState([]);
    const [dataCoupon, setDataCoupon] = useState([]);
    const [dataBill, setDataBill] = useState([]);
    const [dataTicked, setDataTicked] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);
    const [dataCinema, setDataCinema] = useState([]);
    const [dataSeat, setDataSeat] = useState([]);
    const [dataAcc, setDataAcc] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const [dataOrderDetail, setDataOrderDetail] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const dataPayment = [{ id: 1, title: "MoMo" },
    { id: 2, title: "Bank" },
    { id: 3, title: "Visa" },
    { id: 4, title: "ViettelPay" }]
    const dataSlot = [
        { id: 1, name: "  Morning : 6:30 AM - 7:00 AM", location: "139-141 Nguyễn Gia Trí, P.25, Q.Bình Thạnh, TP. Hồ Chí Minh" },
        { id: 2, name: "Noon : 12:00 AM - 12:30 AM ", location: "161 Xa Lộ Hà Nội, P. Thảo Điền, Q.2, TP. Hồ Chí Minh" },
        { id: 3, name: "Afternoon : 5:30 AM - 6:00 AM ", location: "1311 Ông Cao Thắng, P.Tân Kì, Q.10, TP. Hồ Chí Minh" },

    ]


    useEffect(() => {
        featchBillList();
        featchAccList();
        featchFilmList();
        featchRoomList();
        featchCinemaList();
        featchSchedulingList();
        featchcouponList();
        featchTickedList();
        featchSeatList();
    }, [search]);
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
    async function featchAccList() {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Account`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataAcc(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchSchedulingList() {
        try {


            const requestURL = `http://www.cinemasystem.somee.com/api/Scheduling`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setScheduling(responseJSON.data)

            console.log("ngu12", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchFilmList() {
        try {
            const requestURL = `http://www.cinemasystem.somee.com/api/Film`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setFilm(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchcouponList() {
        try {
            const requestURL = `http://www.cinemasystem.somee.com/api/Coupon`;

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
    async function featchSeatList() {
        try {
            const requestURL = `http://www.cinemasystem.somee.com/api/Seat`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataSeat(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchBillList() {
        try {
            const requestURL = `http://www.cinemasystem.somee.com/api/Bill/${state?.name}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataBill(responseJSON.data)



        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchTickedList() {
        try {
            const requestURL = `http://www.cinemasystem.somee.com/api/Ticked?BillId=${state?.name}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataTicked(responseJSON.data)



        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    function DetailExists(productId) {
        return dataOrderDetail.some(function (el) {
            return el.orderId == productId;
        });
    }
    function handleClickOrder(data) {

        if (DetailExists(data) == true) {
            dataOrderDetail.map(dataBill => {
                if (dataBill.orderId == data) {
                    return setProduct(dataBill)
                }
            })
        } else {
            setProduct(data)
        }
    }
    console.log("product in order", Product)
    const filterListOrder = dataOrder.filter(data => {
        if (data?.pacakeOrderId == state?.name) {
            return data
        }
    })
    return (
        <section className=" ml-0 xl:ml-64  px-5 pt-10  ">
            <div className='grid mr-5 grid-cols-1  sm:grid-cols-3  gap-4'>
                <div className="col-span-1 grid sm:grid-rows-2   gap-5 ">

                    <Card className=" font-semibold py-4  pl-5" >
                        <Typography gutterBottom variant="h4" component="div">
                            Bill Detail:
                        </Typography>
                        <div>Bill Id: <i className='font-normal'>{dataBill.id}</i></div>
                        <div>Employee: {dataAcc.map(pack => {
                            if (dataBill.accountId == pack.id) {
                                return <i className='font-normal'>{pack.email}</i>
                            }
                        })}</div>
                        <div>Scheduling: {dataScheduling.map(pack => {
                            if (dataBill.schedulingId == pack.id) {
                                return <i className='font-normal'>{pack.startTime} - {pack.endTime} </i>
                            }
                        })}</div>
                        <div>Date: {dataScheduling.map(pack => {
                            if (dataBill.schedulingId == pack.id) {
                                return <i className='font-normal'>{pack.date} </i>
                            }
                        })}</div>
                        <div>Cinema: {dataScheduling.map(pack => {
                            if (dataBill.schedulingId == pack.id) {
                                return (
                                    dataCinema.map(item => {
                                        if (item.id == pack.cinemaId) {
                                            return <i className='font-normal'>{item.name} </i>
                                        }
                                    })
                                )
                            }
                        })}</div>
                        <div>Room: {dataScheduling.map(pack => {
                            if (dataBill.schedulingId == pack.id) {
                                return (
                                    dataRoom.map(item => {
                                        if (item.id == pack.roomId) {
                                            return <i className='font-normal'>{item.title} </i>
                                        }
                                    })
                                )
                            }
                        })}</div>
                        <div>Coupon: <i className='font-normal'>{dataBill.couponId}</i></div>
                        <div>Total: <i className='font-normal'>{dataBill.total}</i></div>

                    </Card>

                </div>
                <div className='h-screen   overflow-y-scroll'>
                    <Card className="  py-4  px-5" >
                        <Typography gutterBottom variant="h4" component="div">
                            Seat In Bill:
                        </Typography>
                        {dataTicked.map((item, index) => {
                            return (
                                <Card key={index} className=" cursor-pointer mb-5 text-white" sx={{ height: 150 }}        >
                                    <CardContent className='text-black ' >
                                        <Typography gutterBottom variant="h5" component="div">
                                            Seat: {dataSeat.map(item1 => {
                                                if (item1.id == item.seatId) {
                                                    return (item1.title)
                                                }
                                            })}
                                        </Typography>
                                        <Typography variant="body2" color="">
                                            Price: {item.price}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            )
                        })}
                    </Card>
                </div>
                <div className='h-screen   overflow-y-scroll'>
                    <Card className='py-4  px-5' >

                        <Typography gutterBottom variant="h4" component="div">
                            Service In Bill:
                        </Typography>
                        {dataTicked.map((item, index) => {
                            return (
                                <div >
                                    <Card key={item.id} className=" cursor-pointer mb-5 text-white" sx={{ height: 150 }} >
                                        <CardContent className='text-black ' >
                                            <Typography gutterBottom variant="h5" component="div">
                                                Order Id: {item.id}
                                            </Typography>
                                            <Typography variant="body2" color="">

                                            </Typography>
                                            <Typography variant="body2" color="">

                                            </Typography>
                                            <Typography variant="body2" color="">
                                                Status: {item.status}
                                            </Typography>
                                        </CardContent>

                                    </Card>
                                </div>

                            )
                        })}
                    </Card>

                </div>
            </div>

        </section>
    );
}