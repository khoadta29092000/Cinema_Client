import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { maxHeight } from '@mui/system';
import { useState, useEffect } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Content() {
    const [dataAreas, setDataAreas] = useState([]);
    const [dataLocation, setDataLocation] = useState([]);
    const [CinemaList, setCinemaList] = useState([]);
    const [openHidden, setOpenHidden] = useState(false);
    const [search, setSearch] = useState("");
    var data = [
        { id: 1, name: "Chung cư lô A", location: "139-141 Nguyễn Gia Trí, P.25, Q.Bình Thạnh, TP. Hồ Chí Minh" },
        { id: 2, name: "LandMark Park", location: "161 Xa Lộ Hà Nội, P. Thảo Điền, Q.2, TP. Hồ Chí Minh" },
        { id: 3, name: "Ocen City", location: "1311 Ông Cao Thắng, P.Tân Kì, Q.10, TP. Hồ Chí Minh" },
        { id: 4, name: "Ceberus", location: "15 Gò Xoài, P.An Đới, Q.Tân Phú, TP. Hồ Chí Minh" },
        { id: 5, name: "SBTC Entertainment", location: "415 Lê Văn Việt, P.Tân Thành, Q.9, TP. Thủ Đức" },]
    async function featchStationist() {
        try {


            const requestURL = `http://www.CinemaSystem.somee.com/api/Cinema?search=${search}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataAreas(responseJSON.data)
            setCinemaList(responseJSON.data.map(obj => { return ({ ...obj, Status: false }) }))
            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchLocationList() {
        try {


            const requestURL = `http://cinemasystem2.somee.com/api/Location`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const responseJSON = await response.json();

            const data = responseJSON;

            setDataLocation(responseJSON.data)

            console.log("aa fetch", responseJSON.data)

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    useEffect(() => {
        featchStationist();
        featchLocationList();
    }, [search]);

    function handleClickOpenHidden(data) {
        const arratTMP = [...CinemaList];
        const index = arratTMP.findIndex(id => id.id == data.id);
        arratTMP[index].Status = !arratTMP[index].Status
        console.log("ner", arratTMP, index)
        setDataAreas(arratTMP)
    }

    return (
        <section className="relative py-16 w-full ">
            <div className="max-w-7xl mx-auto p-10  ">
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: maxHeight }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Areas"
                        onChange={e => setSearch(e.target.value)}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>

                </Paper>
                {CinemaList.map((Area, index) => {
                    return (
                        <div className=' my-7  mx-auto cursor-pointer '>
                            <div className='border-2 pl-10 text-gray-600 py-5' onClick={() => handleClickOpenHidden(Area)}>
                                <i className='text-lg font-bold'>{Area.name}</i>
                                <i className='float-right mr-5'>  {Area.Status == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} </i>
                            </div>
                            <div className={Area.Status == false ? "hidden" : "pl-12 border-l-2 border-r-2 border-b-2 text-gray-500 py-10"} >
                                <p className={Area.Status == false ? "hidden" : ""}>
                                    <LocationOnIcon className='-mt-1 mr-2' />
                                    {Area.address} | Location: {dataLocation.map(item => {
                                                if(item.id == Area.locationId){
                                                    return( item.name)
                                                }
                                    })}
                                </p>
                                <div className={Area.Status == false ? "hidden mt-5" : "mt-5"}>
                                    <AccessTimeIcon className='-mt-1 mr-2' />
                                    Time : 7:30 AM - 11:00 PM
                                </div>

                            </div>

                        </div>
                    )
                })}
            </div>

        </section>
    );
}
