import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';

import Content from 'components/Service/Content';
import ScrollTop from 'components/ScrollTop';



export default function Service() {

    return (
        <>
            {window.scrollTo(0, 0)}
            <div className="absolute mb-20 bg-black w-full z-20">
                <DefaultNavbar />
            </div>
            <main className=''>

                <Content />
            </main>
            <DefaultFooter className="mt-20" />
        </>
    );
}
