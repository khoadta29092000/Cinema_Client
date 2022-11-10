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
import { NavLink , useHistory} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import service from 'pages/Service';

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
    let history = useHistory();
    let location = useLocation();
    const [Total, setTotal] = useState(0);
    const [totalGhe, setTotalGhe] = useState(0);
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
    const [SeatList, setSeatList] = useState([]);
    const [dataSeat, setDataSeat] = useState([]);

    if( localStorage.getItem(`token`) == undefined ){
        history.push("/login")
        
    }else{
        function parseJwt(token) {
            if (!token) { return; }
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
        let id2 = parseJwt(localStorage.getItem('token'))
        let prop = 'Id'
        let proprole = 'role'
        console.log(id2,id2[proprole], proprole )
        if(id2[proprole] != 3 ){
            history.push("/")  
        }
    }

    console.log("daa", location.state)
    const [ServiceArray, setServiceArray] = useState([]);

    const IncNum = (data) => {

        console.log(ServiceArray)
        if (data.id == 1) {
            setBapPhoMai(BapPhoMai + 1);
            setTotalBapPhoMai(data.price * (BapPhoMai + 1));
            setTotal(totalGhe + (data.price * (BapPhoMai + 1)) + TotalBap + TotalCocaCola + TotalNuocSuoi)
            setServiceArray(oldArray => [...oldArray, data]);
        }
        if (data.id == 2) {
            setBap(Bap + 1);
            setTotalBap(data.price * (Bap + 1));
            setTotal(totalGhe + TotalBapPhoMai + (data.price * (Bap + 1)) + TotalCocaCola + TotalNuocSuoi)
            setServiceArray(oldArray => [...oldArray, data]);
        }
        if (data.id == 3) {
            setCocaCola(CocaCola + 1);
            setTotalCocaCola(data.price * (CocaCola + 1));
            setTotal(totalGhe + TotalBapPhoMai + TotalBap + (data.price * (CocaCola + 1)) + TotalNuocSuoi)
            setServiceArray(oldArray => [...oldArray, data]);
        }
        if (data.id == 4) {
            setNuocSuoi(NuocSuoi + 1);
            setTotalNuocSuoi(data.price * (NuocSuoi + 1));
            setTotal(totalGhe + TotalBapPhoMai + TotalBap + TotalCocaCola + (data.price * (NuocSuoi + 1)))
            setServiceArray(oldArray => [...oldArray, data]);
        }

    };
    const DecNum = (data) => {
        if (data.id == 1) {
            if (BapPhoMai > 1) {
                setBapPhoMai(BapPhoMai - 1);
                setTotalBapPhoMai(data.price * (BapPhoMai - 1));
                setTotal(totalGhe + data.price * (BapPhoMai - 1) + TotalBap + TotalCocaCola + TotalNuocSuoi)
            } else {
                setBapPhoMai(0);
                setTotalBapPhoMai(0);
                setTotal(totalGhe + 0 + TotalBap + TotalCocaCola + TotalNuocSuoi)
                setServiceArray(current =>
                    current.filter(employee => {
                        // 👇️ remove object that has id equal to 2
                        return employee.id !== data.id;
                    }),
                );
            }

        }
        if (data.id == 2) {
            if (Bap > 1) {
                setBap(Bap - 1);
                setTotalBap(data.price * (Bap - 1));
                setTotal(totalGhe + TotalBapPhoMai + (data.price * (Bap - 1)) + TotalCocaCola + TotalNuocSuoi)
            } else {
                setBap(0);
                setTotalBap(0);
                setTotal(totalGhe + TotalBapPhoMai + 0 + TotalCocaCola + TotalNuocSuoi)
                setServiceArray(current =>
                    current.filter(employee => {
                        // 👇️ remove object that has id equal to 2
                        return employee.id !== data.id;
                    }),
                );
            }
        }
        if (data.id == 3) {
            if (CocaCola > 1) {
                setCocaCola(CocaCola - 1);
                setTotalCocaCola(data.price * (CocaCola - 1));
                setTotal(totalGhe + TotalBapPhoMai + TotalBap + (data.price * (CocaCola - 1)) + TotalNuocSuoi)
            } else {
                setCocaCola(0);
                setTotalCocaCola(0);
                setTotal(totalGhe + TotalBapPhoMai + TotalBap + 0 + TotalNuocSuoi)
                setServiceArray(current =>
                    current.filter(employee => {
                        // 👇️ remove object that has id equal to 2
                        return employee.id !== data.id;
                    }),
                );
            }
        }
        if (data.id == 4) {
            if (NuocSuoi > 1) {
                setNuocSuoi(NuocSuoi - 1);
                setTotalNuocSuoi(data.price * (NuocSuoi - 1));
                setTotal(totalGhe + TotalBapPhoMai + TotalBap + TotalCocaCola + (data.price * (NuocSuoi - 1)))
            } else {
                setNuocSuoi(0);
                setTotalNuocSuoi(0);
                setTotal(totalGhe + TotalBapPhoMai + TotalBap + TotalCocaCola + 0)
                setServiceArray(current =>
                    current.filter(employee => {
                        // 👇️ remove object that has id equal to 2
                        return employee.id !== data.id;
                    }),
                );
            }
        }
    };
    function createData(data) {
        let Total = <p>{data.id == 1 ? TotalBapPhoMai.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ"
            : data.id == 2 ? TotalBap.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ"
                : data.id == 3 ? TotalCocaCola.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ"
                    : TotalNuocSuoi.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ"} </p>;
        let Quantity = (
            <div className="flex gap-2 text-center items-center ml-5">
                <button className='h-5 w-5' onClick={() => DecNum(data)}>
                    <RemoveIcon />
                </button>
                <input className='  w-10 h-8 border-2 text-center -mt-1' value={data.id == 1 ? BapPhoMai : data.id == 2 ? Bap : data.id == 3 ? CocaCola : NuocSuoi} />
                <button disabled={(data.id == 1 ? BapPhoMai : data.id == 2 ? Bap : data.id == 3 ? CocaCola : NuocSuoi) == data.quantityInCinema} className='h-5 w-5' onClick={() => IncNum(data)}>
                    <AddIcon />
                </button></div>
        )
        let Price = data.price.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ";
        let Image = (
            <div className='flex'>

                <img
                    src={data.image}
                    loading="lazy"
                    className='h-28 w-28'
                />
                <div>
                    <p className='text-lg font-medium pl-4'>{data.title}</p>

                </div>

            </div>
        )

        return { Image, Quantity, Price, Total };
    }
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

        } if (location.state.totalGhe != undefined) {
            setTotalGhe(totalGhe)
        }
        featchCategoryList();
        featchCinemaList();
        featchRoomList();
        featchSeatList();
    }, []);
    const sortData = dataCate.sort(function(a, b) {
        return a.id - b.id;
    });
    const rows1 = sortData.map((data, index) => {
        return (createData(data))
    })
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

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchCategoryList() {
        try {


            const requestURL = `http://cinemasystem.somee.com/api/ServiceInCinema/AllServiceInCinema?CinemaId=${location.state.scheduling.cinemaId}`;

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
    const ids = ServiceArray.map(o => o.id)
    const filtered = ServiceArray.filter(({ id }, index) => !ids.includes(id, index + 1))

    console.log("location", filtered, ServiceArray)
    return (
        <section className="relative pt-32 mb-32 h-screen py-16 w-full ">
            <div className="max-w-7xl mx-auto p-10 text-center items-center " >
                <div className='h-500 grid grid-cols-3 mb-32  gap-4'>
                    <div className='col-span-2'>

                        <Paper className='' sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableHead >
                                <div className='pt-2 pl-4 block font-semibold text-xl'>
                                    Chọn thức ăn
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
                                            .slice(0, 4)
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
                                return (item.name)
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
                        <div className='font-medium border-b-2 ml-2 mr-4 border-gray-300 px-2  my-2 flex'> Chọn ghế: {SeatList.map(item => { if (item.Status == true) { return (item.title + " ") } })} </div>
                        <div className='font-medium text-2xl  ml-2 mr-4  px-2  my-2 flex'> Total: <p className='ml-2 text-blue-600'>{Total.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ"} </p> </div>
                        <div className='w-full float-right'>
                            <NavLink to={{
                                pathname: "/Room",
                                state: {
                                    name: location.state.name,
                                    scheduling: location.state.scheduling,
                                    total: Total,
                                    Bap: Bap,
                                    BapPhoMai: BapPhoMai,
                                    CocaCola: CocaCola,
                                    NuocSuoi: NuocSuoi,
                                    TotalBap: TotalBap,
                                    TotalBapPhoMai: TotalBapPhoMai,
                                    TotalCocaCola: TotalCocaCola,
                                    TotalNuocSuoi: TotalNuocSuoi,
                                    ServiceArray: filtered,
                                    DataSeat: dataSeat
                                }
                            }} >
                                <button className='h-12 w-24 bg-blue-600 mt-10 mx-auto float-right  mr-10'>Continue</button>
                            </NavLink>

                        </div>

                    </div>
                </div>

            </div>

        </section>
    );
}
