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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';


const columns = [
    {
        id: 'OrderId',
        label: 'Order Id',
        minWidth: 100,
    },
    {
        id: 'Username',
        label: 'Username',
        minWidth: 150,
    },
    {
        id: 'PackageName',
        label: 'Package Name',
        minWidth: 150,
    },
    {
        id: 'Area',
        label: 'Area',
        minWidth: 150,
    },
    {
        id: 'Slot',
        label: 'Slot',
        minWidth: 150,
    },
    {
        id: 'Status',
        label: 'Status',
        minWidth: 150,
    },
    {
        id: 'CompletedAt',
        label: 'Completed At',
        minWidth: 150,
    },

];


export default function Content(props) {

    const { state } = useLocation()
    const [dataMan, setDataMan] = useState([]);
    const [dataStation, setDataStation] = useState([]);
    const [dataPackage, setDataPackage] = useState([]);
    const [data, setData] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const [dataPackageorder, setDataPackageorder] = useState([]);
    function createData(data) {
        console.log("đasadsadas", data.slotId)
        let OrderId = data.id;
        let Slot ;
        dataSlot.map(item => {
            if(item.id == data.slotId){
                return Slot = item.name
            }
        })
        let Username;
        dataPackageorder.map(item => {
            if (data.pacakeOrderId == item.id) {
                return Username = item.fullName
            }
        })
        let Status = data.status;

        let PackageName;
        dataPackageorder.map(item => {
            if (data.pacakeOrderId == item.id) {
                dataPackage.map(itemPack => {
                    if (itemPack.id == item.packageId) {
                        return PackageName = itemPack.title
                    }
                })
            }
        })
        let Area;
        dataPackageorder.map(item => {
            if (data.pacakeOrderId == item.id) {
                dataStation.map(station => {
                    if (station.id == item.stationId) {
                        return Area = station.title
                    }
                })
            }
        })
        let CompletedAt = data.day.slice(8, 10) + "/" + data.day.slice(5, 7) + "/" + data.day.slice(0, 4);;


        return { OrderId, Username, PackageName, Area, Slot, Status, CompletedAt };
    }const dataSlot = [
        { id: 1, name: "  Morning ", location: "139-141 Nguyễn Gia Trí, P.25, Q.Bình Thạnh, TP. Hồ Chí Minh" },
        { id: 2, name: "Noon ", location: "161 Xa Lộ Hà Nội, P. Thảo Điền, Q.2, TP. Hồ Chí Minh" },
        { id: 3, name: "Afternoon", location: "1311 Ông Cao Thắng, P.Tân Kì, Q.10, TP. Hồ Chí Minh" },
       
    ]
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    console.log("----------", page, rowsPerPage)
    const filterListOrder = [];
    data.map(item => {
        dataOrder.filter(order => {
            if (item.id == order.deliveryTripId ) {
                return filterListOrder.push(order)
            }
        })
    })
    console.log("list nme ena", filterListOrder)

    const rows1 = filterListOrder.map((data, index) => {
        return (createData(data))
    })
    useEffect(() => {
        featchStationList();
        featchDeliveryInMemberList();
        featchOrderList();
        featchPackageOrderList();
        featchPackageList();
        featchDeliveryMemById();
        setPage(0);
    }, [state]);
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
    async function featchOrderList() {
        try {
            const requestURL = `http://www.subcriptionmilk.somee.com/api/Orders/Getallorder`;

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
    async function featchDeliveryInMemberList() {
        try {


            const requestURL = `http://www.subcriptionmilk.somee.com/api/DeliveryTrips/Getalldeliverytrip?search=${state?.name}`;

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
    async function featchDeliveryMemById() {
        try {


            const requestURL = `http://www.subcriptionmilk.somee.com/api/DeliveryMen/getbyid?id=${state?.name}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;
            setDataMan(responseJSON.data)


        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    return (
        <section className=" ml-0 xl:ml-64  px-5 pt-10  ">


            <Paper className=' mb-10  block '  >
                

                {dataMan.map(item => {
                    return (<div className="flex flex-col h-auto mt-4 mx-auto justify-center text-center  items-center ">
                        <Avatar
                            className="mt-5"
                            style={{alignSelf: 'center'}} 
                            sx={{ width: 160, height: 160 }}
                            src={item.img}
                        /> 
                        <h2 className='font-bold  text-3xl my-3'>{item.fullName}</h2>
                        <p className='mb-5'>{item.phone}</p>
                    </div>)
                })}

                
            </Paper>
            

            <Paper className='5' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableHead >
                    <div className='pt-2 pl-4 block font-semibold text-xl'>
                       Trip For Delivery Man
                    </div>
                </TableHead>
               

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