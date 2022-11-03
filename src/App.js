    import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from 'pages/Landing';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Aboutus from 'pages/Aboutus';
import ServiceAreas from 'pages/ServiceAreas';
import CustomizedInputBase from 'components/TextComponen';  
import ContractUs from 'pages/ContractUs';
import FAQs from 'pages/FAQs';
import AdminDashboard from 'pages/AdminDashboard';
import UsersManagement from 'pages/UsersManagement';
import SeatsManagement from 'pages/SeatsManagement';
import RoomsManagement from 'pages/RoomsManagement';
import CinemaManagement from 'pages/CinemaManagement';
import TypeManagement from 'pages/TypeManagement';
import Bill from 'pages/Bill';
import ServicesManagement from 'pages/ServicesManagement';
import FilmsManagement from 'pages/FilmsManagement';
import "slick-carousel/slick/slick.css"; 
//import "slick-carousel/slick/slick-theme.css";


// Font Awesome Style Sheet
import '@fortawesome/fontawesome-free/css/all.min.css';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import Scheduling from 'pages/Scheduling';
import CouponManagement from 'pages/CouponManagement';
import ProfileDashboard from 'pages/ProfileDashboard';
import BillDetails from 'pages/BillDetails';
import detail from 'pages/Detail';
import Room from 'pages/Room';

import Test from 'components/Test';

import CinemaDetails from 'pages/CinemaDetails';

import CheckOut from 'pages/CheckOut';

import FilmComingSoon from 'pages/FilmComingSoon';
import FilmNowShowing from 'pages/FilmNowShowing';
import Service from 'pages/Service';
import SchedulingDetails from 'pages/SchedulingDetails';
import ChangePassword from 'pages/ChangePassword';
import History from 'pages/History';
import Succesfully from 'pages/Succesfully';






function App() {
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/Service" component={Service} />
            <Route exact path="/Test" component={Test} />
            <Route exact path="/AboutUs" component={Aboutus} />
            <Route exact path="/Room" component={Room} />
            <Route exact path="/CheckOut" component={CheckOut} />
            <Route exact path="/Succesfully" component={Succesfully} />
            <Route exact path="/detail" component={detail} />
            <Route exact path="/ServiceAreas" component={ServiceAreas} />
            <Route exact path="/ProfileDashboard/profile" component={Profile} />
            <Route exact path="/ProfileDashboard/ChangePassword" component={ChangePassword} />
            <Route exact path="/ProfileDashboard/History" component={History} />
            <Route exact path="/ProfileDashboard" component={ProfileDashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/ContractUs" component={ContractUs} />
            <Route exact path="/FAQs" component={FAQs} />
            <Route exact path="/Admindashboard" component={AdminDashboard} />
            <Route exact path="/AccountsManagement" component={UsersManagement} />
            <Route exact path="/TypeManagement" component={TypeManagement} />
            <Route exact path="/SeatsManagement" component={SeatsManagement} />
            <Route exact path="/RoomsManagement" component={RoomsManagement} />
            <Route exact path="/CinemaManagement" component={CinemaManagement} />
            <Route exact path="/Scheduling" component={Scheduling} />
            <Route exact path="/Scheduling/Details" component={SchedulingDetails} />
            <Route exact path="/Bill" component={Bill} />
            <Route exact path="/Bill/Details" component={BillDetails} />
            <Route exact path="/Cinema/Details" component={CinemaDetails} />
            <Route exact path="/ServicesManagement" component={ServicesManagement} />
            <Route exact path="/CouponManagement" component={CouponManagement} />
            <Route exact path="/FilmsManagement" component={FilmsManagement} />
            <Route exact path="/text" component={CustomizedInputBase} />
            <Route exact path="/FilmComingSoon" component={FilmComingSoon} />
            <Route exact path="/FilmNowShowing" component={FilmNowShowing} />
            <Redirect from="*" to="/" />
        </Switch>
    );
}

export default App;
