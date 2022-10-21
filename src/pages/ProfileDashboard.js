import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import H3 from '@material-tailwind/react/Heading3';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
import ProfilePicture from 'assets/img/team-2-800x800.jpg';
import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';
import Header from 'components/profile/Header';

import DefaultNavbarAdmin from 'components/DefaultNavbarAdmin';
import Content from 'components/ProfileDashboard/Content';
import DefaultNavbarProfile from 'components/DefaultNavbarProfile';

export default function ProfileDashboard() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Header />
                <section className="relative py-16 ">
                    <div className="container max-w-7xl px-4 mx-auto">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-64">
                            <div className=' grid  grid-cols-3'>
                                <div className="  absolute w-64  z-20 ">
                                    <DefaultNavbarProfile />
                                </div>
                                <main className="ml-0 mb-0  h-screen ">
                                
                                    <div className=' z-10 mb-20 '>
                                        <Content />
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <DefaultFooter />
        </>

    );
}
