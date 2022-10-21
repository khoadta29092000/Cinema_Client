import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';
import Header from 'components/FAQs/Header';
import MilkQuestion from 'components/FAQs/MilkQuestion';
import FarmQuestion from 'components/FAQs/FarmQuestion';

export default function FAQs() {
    return (
        <>
            <div className="absolute mb-20 bg-black w-full z-20">
                <DefaultNavbar />
            </div>
            <div className="pt-12"  >
                <Header />
            </div>
            <main className='my-10  grid grid-cols-1 lg:grid-cols-2'>
                <div>
                  <MilkQuestion />
                </div>
                <div className='border-l-2'>
                 <FarmQuestion />
                </div>

            </main>
            <DefaultFooter className="mt-20" />
        </>
    );
}
