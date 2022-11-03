import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';
import Header from 'components/Profile/Header';
import Content from 'components/History/Content';
import DefaultNavbarProfile from 'components/DefaultNavbarProfile';

export default function History() {
    return (
        <>
              <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Header />
                <section className="relative py-16 bg-gray-100">
                    <div className="container max-w-7xl px-4 mx-auto">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-64">
                            <div className=' grid  grid-cols-3'>
                                <div className="  absolute w-64  z-20 ">
                                    <DefaultNavbarProfile />
                                </div>
                                <main className="ml-0 mb-0 h-screen col-span-2   ">
                                
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
