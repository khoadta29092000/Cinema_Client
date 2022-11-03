
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
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import style from './Checkout.module.css'
import { Dataset } from '@mui/icons-material';
import { data } from 'autoprefixer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
  const [SeatList, setSeatList] = useState(location.state.DataSeat.map(obj => { return ({ ...obj, Status: "Empty" }) }));
  const [Total, setTotal] = useState(0);
  const [status, setStatus] = useState(false);
  const [TotalGhe, setTotalGhe] = useState(0);
  const [dataCate, setDataCate] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [dataCinema, setDataCinema] = useState([]);
  const [dataSeat, setDataSeat] = useState([]);
  const [dataTicked, setDataTicked] = useState([]);
  const [filtered, setFiltered] = useState(location.state.ServiceArray);
  const [ArraySeat, SetArraySeat] = useState([]);
  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState(false);
  const IncNum = () => {
    setCount(count + 1);
  };
  const DecNum = () => {
    if (count > 0) setCount(count - 1);
    else {
      setCount(0);
      alert("min limit reached");
    }
  };
  function createData(data) {
    let Total = data.id;
    let Quantity = (
      <div className="flex gap-2 text-center items-center ml-5">
        <button className='h-5 w-5' onClick={DecNum}>
          <RemoveIcon />
        </button>
        <input className=' -ml-10 w-10 h-8 border-2 text-center -mt-1' value={count} />
        <button className='h-5 w-5' onClick={IncNum}>
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
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }

    setAlert(false);
};
  useEffect(() => {
    setTotal(location.state.total)
    featchCategoryList();
    featchCinemaList();
    featchRoomList();
    featchSeatList();
    featchTickedList();

    const arratTMP = [...SeatList];
    let index;
    dataTicked.map(item => {
      index = arratTMP.findIndex(id => id.id == item.seatId)
      if (index >= 0) {
        arratTMP[index].Status = "Checked";
        setSeatList(arratTMP)
      }
    }
    )
    console.log(' 12 list: ', dataTicked, SeatList)
  }, [count]);
  useEffect(() => {


    const arratTMP = [...SeatList];
    let index;
    dataTicked.map(item => {
      index = arratTMP.findIndex(id => id.id == item.seatId)
      if (index >= 0) {
        arratTMP[index].Status = "Checked";
        setSeatList(arratTMP)
      }
    }
    )
    console.log(' 12 list: ', dataTicked, SeatList)
  },);

  console.log(2)
  window.onload = function () {

    setCount(1)
  }

  const rows1 = dataCate.map((data, index) => {
    return (createData(data))
  })
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
  async function featchTickedList() {
    try {
      const requestURL = `http://cinemasystem.somee.com/api/Ticked?SchedulingId=${location.state.scheduling.id}`;

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
      console.log('Fail to fetch 12 list: ', error)
    }
  }
  console.log("location", location.state)
  function ChooseSeat(data) {
    const arratTMP = [...SeatList];
    const index = arratTMP.findIndex(id => id.id == data.id);
    if (arratTMP[index].Status == "Empty") {
      setTotalGhe(TotalGhe + 80)
      setTotal(Total + 80)

    } if (arratTMP[index].Status == "Choose") {
      setTotalGhe(Total - 80)
      setTotal(Total - 80)

    }
    arratTMP[index].Status = arratTMP[index].Status == "Empty" ? "Choose" : arratTMP[index].Status == "Choose" ? "Empty" : "Checked"
    console.log("ner", arratTMP, index)
    setSeatList(arratTMP)

  }





  const ChooseDeleteSeat = (data) => {
    SetArraySeat(current =>
      current.filter(employee => {
        // 👇️ remove object that has id equal to 2
        return employee.id !== data.id;
      }),
    );
  }

  const ids = ArraySeat.map(o => o.id)
  const filteredSeat = ArraySeat.filter(({ id }, index) => !ids.includes(id, index + 1))

  const checkSeat = SeatList.filter(item => {
    return item.Status === "Choose"
  })

  console.log("ner2", ArraySeat, filteredSeat, SeatList, dataTicked, checkSeat.length)


  return (
    <section className="relative pt-32 py-16 h-screen w-full ">
      <Snackbar open={alert} autoHideDuration={4000} onClose={handleCloseAlert} className="">
        <Alert onClose={handleCloseAlert} severity="error" >
          You not choose Seat
        </Alert>
      </Snackbar>
      <div className="max-w-7xl mx-auto p-10 text-center items-center " >
        <div className='h-500 grid  grid-cols-3 gap-4'>
          <div className='col-span-2'>
            <div className="col-span-3">
              <div className="col-span-2  my-auto">
                <div className="mt-2">

                  <h1 className="text-red-600 font-black text-3xl mr-2">
                    {/* <Timer /> */}
                  </h1>
                </div>
              </div>

              <div className="flex flex-col   items-center   mt-5">

                <div className={`${style['trapezoid']} text-center `}>
                  <h3 className="mt-3 text-black"> màn hình</h3>
                </div>
                <div>

                  <div className='flex gap-2 my-5'>
                    {console.log("ner3", SeatList)}
                    {SeatList.map(item => {

                      if (item.roomId == location.state.scheduling.roomId && item.title.charAt(0) == "A") {
                        return (

                          <button key={item.id} id={item.id} onClick={() => ChooseSeat(item)}
                            style={{

                              backgroundColor: item.Status === "Choose" ? "green" : item.Status === "Empty" ? "gray" : "red"
                            }} className='w-8 h-8 ' > {item.title}</button>

                        )

                      }
                    })}
                  </div>
                  <div className='flex gap-2 my-5'>

                    {SeatList.map(item => {

                      if (item.roomId == location.state.scheduling.roomId && item.title.charAt(0) == "B") {
                        return (

                          <button key={item.id} id={item.id} onClick={() => ChooseSeat(item)}
                            style={{

                              backgroundColor: item.Status === "Choose" ? "green" : item.Status === "Empty" ? "gray" : "red"
                            }} className='w-8 h-8 ' > {item.title}</button>

                        )

                      }
                    })}
                  </div>
                  <div className='flex gap-2 my-5'>

                    {SeatList.map(item => {

                      if (item.roomId == location.state.scheduling.roomId && item.title.charAt(0) == "C") {
                        return (

                          <button key={item.id} id={item.id} onClick={() => ChooseSeat(item)}
                            style={{

                              backgroundColor: item.Status === "Choose" ? "green" : item.Status === "Empty" ? "gray" : "red"
                            }} className='w-8 h-8 ' > {item.title}</button>

                        )

                      }
                    })}
                  </div>
                  <div className='flex gap-2 my-5'>

                    {SeatList.map(item => {

                      if (item.roomId == location.state.scheduling.roomId && item.title.charAt(0) == "D") {
                        return (

                          <button key={item.id} id={item.id} onClick={() => ChooseSeat(item)}
                            style={{

                              backgroundColor: item.Status === "Choose" ? "green" : item.Status === "Empty" ? "gray" : "red"
                            }} className='w-8 h-8 ' > {item.title}</button>

                        )

                      }
                    })}
                  </div>
                  <div className='flex gap-2 my-5'>

                    {SeatList.map(item => {

                      if (item.roomId == location.state.scheduling.roomId && item.title.charAt(0) == "E") {
                        return (

                          <button key={item.id} id={item.id} onClick={() => ChooseSeat(item)}
                            style={{

                              backgroundColor: item.Status === "Choose" ? "green" : item.Status === "Empty" ? "gray" : "red"
                            }} className='w-8 h-8 ' > {item.title}</button>

                        )

                      }
                    })}
                  </div>
                  <div className='flex gap-2 my-5'>

                    {SeatList.map(item => {

                      if (item.roomId == location.state.scheduling.roomId && item.title.charAt(0) == "F") {
                        return (

                          <button key={item.id} id={item.id} onClick={() => ChooseSeat(item)}
                            style={{

                              backgroundColor: item.Status === "Choose" ? "green" : item.Status === "Empty" ? "gray" : "red"
                            }} className='w-8 h-8 ' > {item.title}</button>

                        )

                      }
                    })}
                  </div>
                  <div className='flex gap-2 my-5'>

                    {SeatList.map(item => {

                      if (item.roomId == location.state.scheduling.roomId && item.title.charAt(0) == "H") {
                        return (

                          <button key={item.id} id={item.id} onClick={() => ChooseSeat(item)}
                            style={{

                              backgroundColor: item.Status === "Choose" ? "green" : item.Status === "Empty" ? "gray" : "red"
                            }} className='w-8 h-8 ' > {item.title}</button>

                        )

                      }
                    })}
                  </div>
                  <div className='flex gap-2 my-5'>

                    {SeatList.map(item => {

                      if (item.roomId == location.state.scheduling.roomId && item.title.charAt(0) == "G") {
                        return (

                          <button key={item.id} id={item.id} onClick={() => ChooseSeat(item)}
                            style={{

                              backgroundColor: item.Status === "Choose" ? "green" : item.Status === "Empty" ? "gray" : "red"
                            }} className='w-8 h-8 ' > {item.title}</button>

                        )

                      }
                    })}
                  </div>

                </div>
              </div>
              <div className="mt-5 flex justify-center">
                <table className=" divide-y divide-gray-200 w-2/3">
                  <thead className="bg-gray-50 p-5">
                    <tr>
                      <th><button className='h-4 w-4 bg-gray-500'></button>Ghế chưa đặt</th>
                      <th><button className='h-4 w-4 bg-green-500'></button>Ghế đang  đặt</th>
                      <th><button className='h-4 w-4 bg-red-500'></button>Ghế đã đặt</th>
                      <th><button className='h-4 w-4 bg-blue-500'></button>Ghế đã đặt</th>

                    </tr>
                  </thead>

                </table>

              </div>

            </div>
          </div>
          <div className='col-span-1 text-left  bg-gray-200'>
            <img src={location.state.name.image} className="w-full h-64 object-cover p-5" />
            <h2 className='font-medium ml-2 mb-2'>{location.state.name.title}</h2>
            <div>
              <button className='text-white ml-2 mr-2 w-8 h-8 bg-blue-600'>C{location.state.name.rated}</button>
              Phim giành cho đổ tuổi từ {location.state.name.rated} trở lên
            </div>
            <div className='font-medium border-b-2 ml-2 mr-4 border-gray-300 px-2 my-2 flex'> Rạp:  <p className=' ml-2 font-normal'> {dataCinema.map(item => {
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
                <Fragment> {item.title}({item.id == 1 ? location.state.BapPhoMai : item.id == 2 ? location.state.Bap : item.id == 3 ? location.state.CocaCola : location.state.NuocSuoi}) </Fragment>
              )
            })}   </div>
            <div className='font-medium border-b-2 ml-2 mr-4 border-gray-300 px-2  my-2 flex'> Chọn ghế: {SeatList.map(item => { if (item.Status == "Choose") { return (item.title) + " " } })} </div>
            <div className='font-medium text-2xl  ml-2 mr-4  px-2  my-2 flex'> Total: <p className='ml-2 text-blue-600'>{Total.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ"}  </p> </div>
            <div className=' mb-10 pb-10 float-right'>
              {checkSeat.length != 0 ?
                <NavLink to={{
                  pathname: "/CheckOut",
                  state: {
                    name: location.state.name,
                    scheduling: location.state.scheduling,
                    total: Total,
                    totalGhe: TotalGhe,
                    Bap: location.state.Bap,
                    BapPhoMai: location.state.BapPhoMai,
                    CocaCola: location.state.CocaCola,
                    NuocSuoi: location.state.NuocSuoi,
                    TotalBap: location.state.TotalBap,
                    TotalBapPhoMai: location.state.TotalBapPhoMai,
                    TotalCocaCola: location.state.TotalCocaCola,
                    TotalNuocSuoi: location.state.TotalNuocSuoi,
                    ServiceArray: filtered,
                    SeatList: SeatList,
                  }
                }} className="" >
                  <button className='h-12 w-24 bg-blue-600 mt-10 mx-auto float-right  mr-10'>Continue</button>
                </NavLink>
                :

                <button onClick={() => setAlert(true)} className='h-12 w-24 bg-blue-600 mt-10 mx-auto float-right  mr-10'>Continue</button>

              }


            </div>
            <div className='ml-10'>
              <NavLink to={{
                pathname: "/Service",
                state: {

                  name: location.state.name,
                  scheduling: location.state.scheduling,
                  total: (Total - TotalGhe),
                  totalGhe: 0,
                  Bap: location.state.Bap,
                  BapPhoMai: location.state.BapPhoMai,
                  CocaCola: location.state.CocaCola,
                  NuocSuoi: location.state.NuocSuoi,
                  TotalBap: location.state.TotalBap,
                  TotalBapPhoMai: location.state.TotalBapPhoMai,
                  TotalCocaCola: location.state.TotalCocaCola,
                  TotalNuocSuoi: location.state.TotalNuocSuoi,
                  ServiceArray: filtered,
                  SeatList: [],
                }
              }} className="" >
                <button className='h-12 w-24 bg-blue-600 mt-10 mx-auto float-left  ml-10'>Back</button>
              </NavLink>

            </div>

          </div>
        </div>

      </div>

    </section >
  );
}
