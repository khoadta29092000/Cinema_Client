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
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HttpsIcon from '@mui/icons-material/Https';
import PasswordIcon from '@mui/icons-material/Password';
import HistoryIcon from '@mui/icons-material/History';
export default function Content() {
    const [dataProducts, setDataProduct] = useState([]);




    useEffect(() => {
        //featchProductList();

    }, []);
    async function featchProductList() {
        try {
            setDataProduct();
            return
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    return (
        <section className=" ml-64 flex mb-0 pt-10  ">
            <div className=" ml-8 w-screen h-screen  ">
                <h2 className="font-bold text-2xl mb-2 "> Dashboard</h2>
                <div className='grid mr-5 h-32 grid-cols-3  gap-4'>

                    <Card className="" >
                        <Link to="/ProfileDashboard/profile">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <AccountBoxIcon />
                            </button>
                        </Link>
                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                                Profile
                            </Typography>

                        </CardContent>
                    </Card>

                    <Card className="" >
                        <Link to="/ProfileDashboard/ChangePassword">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <PasswordIcon />
                            </button>
                        </Link>
                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                               Change Password
                            </Typography>

                        </CardContent>
                    </Card>

                    <Card className="" >
                        <Link to="/ProfileDashboard/History">
                            <button className="text-white bg-blue-600 rounded-lg mt-5 ml-5  h-12 w-12">
                                <HistoryIcon />
                            </button>
                        </Link>
                        <CardContent className="mt-0">
                            <Typography gutterBottom variant="h8" className='font-bold text-sm' component="div">
                               History
                            </Typography>

                        </CardContent>
                    </Card>

                </div>
            </div>



        </section>
    );
}
