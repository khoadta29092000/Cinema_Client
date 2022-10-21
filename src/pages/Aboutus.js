import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';
import Header from 'components/AboutUs/Header';
import Content from 'components/AboutUs/Content';


export default function Aboutus() {
    return (
        <>
            <div className="absolute mb-20 bg-black w-full z-20">
                <DefaultNavbar />
            </div>
            <main className='pt-20'>
                <Header />
                <Content />
            </main>
            <DefaultFooter className="mt-20"/>
        </>
    );
}
