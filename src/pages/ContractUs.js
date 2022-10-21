import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';
import Form from 'components/landing/Form';
import Header from 'components/ContractUs/Header';
import Question from 'components/ContractUs/Question';



export default function ContractUs() {
    return (
        <>
            <div className="absolute mb-20 bg-black w-full z-20">
                <DefaultNavbar />
            </div>
            <div className="pt-12"  >
            <Header  />
            </div>
            <main className='my-10  grid grid-cols-1 lg:grid-cols-2'>
            <div>
                <Question />
            </div>
            <div className='border-l-2'>
            <Form />
            </div>

            </main>
            <DefaultFooter className="mt-20"/>
        </>
    );
}
