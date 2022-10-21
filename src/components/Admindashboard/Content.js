import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import ManIcon from '@mui/icons-material/Man';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';


export default function Content() {
    const [dataDeliveryTrip, setDataDeliveryTrip] = useState([]);
    const [dataDeliveryMan, setDataDeliveryMan] = useState([]);
    const [dataPackageorder, setDataPackageorder] = useState([]);
    const [dataPackage, setDataPackage] = useState([]);
    const [dataStation, setDataStation] = useState([]);
    const [dataAcc, setDataAcc] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const [dataOrderDetail, setDataOrderDetail] = useState([]);
    const [dataProducts, setDataProduct] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);

    var data = [
        { id: 1, title: "Today", price: "30.000.000", count: "10" },
        { id: 2, title: "This Month", price: "160.000.000", count: "152" },
        { id: 3, title: "This Year", price: "2.000.000.000", count: "1501" },
        { id: 4, title: "All Time", price: "4.231.151.000", count: "4102" },
    ];
    var Products = [
        { id: 1, title: "Category", price: "30.000.000", count: "5", icon: "CategoryIcon" },
        { id: 2, title: "Product", price: "160.000.000", count: "13", icon: "ShoppingCartIcon" },
        { id: 3, title: "Package", price: "2.000.000.000", count: "8", icon: "AllInboxIcon" },
        { id: 4, title: "Areas", price: "4.231.151.000", count: "32", icon: "GroupIcon" },
    ];
    var Members = [
        { id: 1, title: "User", price: "30.000.000", count: "1410" },
        { id: 2, title: "Delivery Boi", price: "160.000.000", count: "46" },
    ];

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
        featchCategoryList();
    }, []);
    var today = new Date();
    var date = (today.getDate().length < 2 ? '0' + today.getDate() : today.getDate()) + ' - '
        + ((today.getMonth() + 1).length < 2 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1)) + ' - '
        + today.getFullYear();
    var InDay = today.getFullYear() + '-' +
        ((today.getMonth() + 1).length < 2 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1))
        + '-' + (today.getDate().length < 2 ? '0' + today.getDate() : today.getDate());
    async function featchCategoryList() {
        try {


            const requestURL = `http://www.subcriptionmilk.somee.com/api/Categories/Getallcategories?search=`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataCategory(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
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
            const requestURL = `http://www.subcriptionmilk.somee.com/api/Orders/Getallorder?search=${InDay}`;

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
            const requestURL = `http://www.subcriptionmilk.somee.com/api/PackageOrders/Getallpackageorder`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataPackageorder(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchPackageList() {
        try {
            const requestURL = `http://www.subcriptionmilk.somee.com/api/Packages/Getallpackages`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataPackage(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

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

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    const filterListCus = dataAcc.filter(data => {
        if (data?.isAdmin == false) {
            return data
        }
    })


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

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    useEffect(() => {
        //featchProductList();

    }, []);
    async function featchProductList() {
        try {
            setDataProduct(data);
            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    return (
        <section className=" ml-0 xl:ml-64 mb-0 pt-10  ">
            <div className="mt-16 ml-8 ">
                <h2 className="font-bold text-2xl mb-2 "> Orders</h2>

                <div className='grid mr-5 grid-cols-1  sm:grid-cols-2  gap-4'>
                    <Card className="" >
                        <Link to="/OrderInDay">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <CalendarMonthIcon />
                            </button>
                        </Link>


                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                                Ticked In Day
                            </Typography>
                            <Typography gutterBottom variant="h16" className=' font-semibold text-xl' component="div">
                                {dataOrder.length}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="" >
                        <Link to="/PackageOrderManagement">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <CalendarMonthIcon />
                            </button>
                        </Link>


                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                                All Bill
                            </Typography>
                            <Typography gutterBottom variant="h16" className=' font-semibold text-xl' component="div">
                                {dataPackageorder.length}
                            </Typography>
                        </CardContent>

                    </Card>

                </div>

            </div>
            <div className="mt-5 ml-8 ">
                <h2 className="font-bold text-2xl mb-2 "> Management</h2>
                <div className='grid mr-5 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 2xl:grid-cols-4 gap-4'>

                    <Card className="" >
                        <Link to="/CategoriesManagement">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <CategoryIcon />
                            </button>
                        </Link>

                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                                Film
                            </Typography>
                            <Typography gutterBottom variant="h16" className=' font-semibold text-xl' component="div">
                                {dataCategory.length}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="" >
                        <Link to="/ProductsManagement">

                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <ShoppingCartIcon />
                            </button>
                        </Link>

                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                                Service
                            </Typography>
                            <Typography gutterBottom variant="h16" className=' font-semibold text-xl' component="div">
                                {dataProducts.length}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="" >
                        <Link to="/PackageManagement">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <AllInboxIcon />
                            </button>
                        </Link>

                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                                Cinema
                            </Typography>
                            <Typography gutterBottom variant="h16" className=' font-semibold text-xl' component="div">
                                {dataPackage.length}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="" >
                        <Link to="/AreasManagement">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <LocationOnIcon />
                            </button>
                        </Link>

                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                                Coupon
                            </Typography>
                            <Typography gutterBottom variant="h16" className=' font-semibold text-xl' component="div">
                                {dataStation.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-5 ml-8 ">
                <h2 className="font-bold text-2xl mb-2 "> User</h2>
                <div className='grid mr-5 grid-cols-1  sm:grid-cols-3  gap-4'>
                    <Card className="" >
                        <Link to="/UsersManagement">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <GroupIcon />
                            </button>

                        </Link>

                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                                Users
                            </Typography>
                            <Typography gutterBottom variant="h16" className=' font-semibold text-xl' component="div">
                                {filterListCus.length}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="" >
                        <Link to="/DeliveryBoyManagement">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <ManIcon />
                            </button>
                        </Link>


                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                                Empoylee
                            </Typography>
                            <Typography gutterBottom variant="h16" className=' font-semibold text-xl' component="div">
                                {dataDeliveryMan.length}
                            </Typography>
                        </CardContent>

                    </Card>
                    <Card className="" >
                        <Link to="/DeliveryBoyManagement">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <ManIcon />
                            </button>
                        </Link>


                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                                Admin
                            </Typography>
                            <Typography gutterBottom variant="h16" className=' font-semibold text-xl' component="div">
                                {dataDeliveryMan.length}
                            </Typography>
                        </CardContent>

                    </Card>
                </div>
            </div>

        </section>
    );
}
