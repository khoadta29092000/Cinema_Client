import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';

import Content from 'components/Room/Content';



export default function Room() {

    return (
        <>
            <div className="absolute mb-20 bg-black w-full z-20">
                <DefaultNavbar />
            </div>
            <main className=''>

             <Content />
            </main>
            <DefaultFooter className="mt-20"/>
        </>
    );
}
