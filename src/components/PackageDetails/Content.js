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

export default function Content() {
    const [search, setSearch] = useState("");
    const { state } = useLocation()
    const [Product, setProduct] = useState([]);
    const [dataDeliveryTrip, setDataDeliveryTrip] = useState([]);
    const [dataDeliveryMan, setDataDeliveryMan] = useState([]);
    const [dataPackageorder, setDataPackageorder] = useState([]);
    const [dataPackage, setDataPackage] = useState([]);
    const [dataStation, setDataStation] = useState([]);
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
        featchDeliveryManList();
        featchAccList();
        featchStationList();
        featchDeliveryTripList();
        featchOrderList();
        featchPackageOrderList();
        featchProductList();
        featchOrderDetailList();
        featchPackageList();

    }, [search]);
    async function featchDeliveryManList() {
        try {


            const requestURL = `http://www.subcriptionmilk.somee.com/api/DeliveryMen`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataDeliveryMan(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchAccList() {
        try {


            const requestURL = `http://www.subcriptionmilk.somee.com/api/Accounts`;

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
    async function featchStationList() {
        try {
            const requestURL = `http://www.subcriptionmilk.somee.com/api/Stations/Getallstations`;

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

    async function featchDeliveryTripList() {
        try {
            const requestURL = `http://www.subcriptionmilk.somee.com/api/DeliveryTrips/Getalldeliverytrip`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataDeliveryTrip(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchOrderList() {
        try {
            const requestURL = `http://www.subcriptionmilk.somee.com/api/Orders/Getallorder?search=`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataOrder(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchPackageOrderList() {
        try {
            const requestURL = `http://www.subcriptionmilk.somee.com/api/PackageOrders/getbyid?id=${state?.name}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataPackageorder(responseJSON.data)

         

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchPackageList() {
        try {
            const requestURL = `http://www.subcriptionmilk.somee.com/api/Packages/Getallpackages?search=`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataPackage(responseJSON.data)


        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchOrderDetailList() {
        try {
            const requestURL = `http://www.subcriptionmilk.somee.com/api/OrderDetails`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataOrderDetail(responseJSON.data)

        

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchProductList() {
        try {
            const requestURL = `http://www.subcriptionmilk.somee.com/api/Products/Getallproduct`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataProduct(responseJSON.data)


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
            dataOrderDetail.map(item => {
                if (item.orderId == data) {
                    return setProduct(item)
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
                <div className="col-span-2 grid sm:grid-rows-2 gap-5 ">
                    {dataPackageorder.map(item => {
                        return (
                            <Card className=" font-semibold py-4  pl-5" >
                                <Typography gutterBottom variant="h4" component="div">
                                    Information Order:
                                </Typography>
                                <div>Package Id: <i className='font-normal'>{item.id}</i></div>
                                <div>Package Name: {dataPackage.map(pack => {
                                    if (item.packageId == pack.id) {
                                        return <i className='font-normal'>{pack.title}</i>
                                    }
                                })}</div>
                                <div>Star Time: <i className='font-normal'>{item.startTime.slice(8, 10) + "/" + item.startTime.slice(5, 7) + "/" + item.startTime.slice(0, 4)}</i></div>
                                <div>End Time: <i className='font-normal'>{item.endTime.slice(8, 10) + "/" + item.endTime.slice(5, 7) + "/" + item.endTime.slice(0, 4)}</i></div>
                                <div>Email: <i className='font-normal'>{item.email}</i></div>
                                <div>Full Name: <i className='font-normal'>{item.fullName}</i></div>
                                <div>Station: {dataStation.map(station => {
                                    if (item.id == station.id) {
                                        return <i className='font-normal'>{station.title}</i>
                                    }
                                })}</div>
                                <div>Phone: <i className='font-normal'>{item.phone}</i></div>
                                <div>Payment: {dataPayment.map(payment => {
                                    if (item.paymentId == payment.id) {
                                        return <i className='font-normal'>{payment.title}</i>
                                    }
                                })}</div>
                                <div>Total: <i className='font-normal'>{item.total.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ"}</i></div>
                            </Card>
                        )
                    })}


                    <Card className="  px-4  pl-5" >
                        <Typography gutterBottom variant="h4" component="div">
                            Product In Order {typeof Product == "number" ? Product : Product.orderId} :
                        </Typography>
                        {Product.length == 0 ? "" : dataProduct.map(item => {
                            console.log("đasada", Product.productId, item.id)
                            if (item.id == Product.productId) {
                                return (
                                    <Card className='mx-auto' sx={{ maxWidth: 300 }}>
                                        <CardMedia
                                            sx={{ maxWidth: 300, maxHeight: 300 }}
                                            component="img"
                                            alt="green iguana"

                                            image={item.img}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.title}
                                            </Typography>

                                        </CardContent>

                                    </Card>
                                )

                            }
                        })}
                    </Card>



                </div>
                <div className='h-screen   overflow-y-scroll'>
                    <Card className='py-4  px-5' >

                        <Typography gutterBottom variant="h4" component="div">
                            Order :
                        </Typography>
                        {filterListOrder.map(item => {

                            return (<div onClick={() => handleClickOrder(item.id)}>
                                <Card key={item.id} className=" cursor-pointer mb-5 text-white" sx={{ height: 150 }} style={item.status == "Pending" ? { backgroundColor: "yellow" } : item.status == "Finish" ? { backgroundColor: "Green" } : item.status == "Cancel" ? { backgroundColor: "red" } : { backgroundColor: "grey" }}>
                                    <CardContent className='text-black ' >
                                        <Typography gutterBottom variant="h5" component="div">
                                            Order Id: {item.id}
                                        </Typography>
                                        <Typography variant="body2" color="">
                                            Day: {item.day != null ? item.day.slice(8, 10) + "/" + item.day.slice(5, 7) + "/" + item.day.slice(0, 4) : "Don't Start"}
                                        </Typography>
                                        <Typography variant="body2" color="">
                                            Slot: {item.slotId != null ? dataSlot.map(slot => { if (slot.id == item.slotId) { return slot.name } }) : "Don't Start"}
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