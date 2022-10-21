import Title from 'components/landing/Title';

import Form from 'components/landing/Form';

export default function ContactSection() {
    return (
        <section className="pb-20 relative block bg-white">
            <div className="container max-w-7xl mx-auto px-4 lg:pt-24">
                <Title heading="Reasons To Choose FarmlyFresh Today">
                    Among hundreds of reasons, here are a few
                </Title>

                <div className="grid mx-auto justify-items-center grid-cols-1 md:grid-cols-2  2xl:grid-cols-4 ">               
                    <div>
                        <h2 className='font-bold text-4xl mb-2'>1.</h2>
                        <h3 className='font-bold text-xl mb-2'>Fresh Produce</h3>
                        <p className='text-gray-400 w-8/12'>All our products reach your home within hours of being prepared at no extra cost.</p>
                    </div>
                    <div>
                        <h2 className='font-bold text-4xl mb-2'>2.</h2>
                        <h3 className='font-bold text-xl mb-2'>No Additives No Preservatives</h3>
                        <p className='text-gray-400 w-8/12'>We deliver milk as it is extracted. We do not add any kind of preservatives and our milk does not go through processing at all.</p>
                    </div>
                    <div>
                        <h2 className='font-bold text-4xl mb-2'>3.</h2>
                        <h3 className='font-bold text-xl mb-2'>Hygienically Packed</h3>
                        <p className='text-gray-400 w-8/12'>At every stage of our process right from milk extraction to its delivery, we follow strict hygiene.</p>
                    </div>
                    <div>
                        <h2 className='font-bold text-4xl mb-2'>4.</h2>
                        <h3 className='font-bold text-xl mb-2'>Home Delivered</h3>
                        <p className='text-gray-400 w-8/12'>We follow the strict, Farm-to-Table method in our operations. We deliver all our products at your doorstep.</p>
                    </div>
                </div>

                <Form />
            </div>
        </section>
    );
}
