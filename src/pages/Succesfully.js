import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';

import Content from 'components/Succesfully/Content';




export default function Succesfully() {

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
