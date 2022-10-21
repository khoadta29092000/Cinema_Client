import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function TeamSection() {
    return (
        <section className="pt-20  ">
            <div className="text-center bg-gray-100 justify-items-center w-full mb-5 px-4">
                <h2 className='font-bold text-5xl mb-5 pt-2'>Our Process</h2>
                <p className='text-gray-500 text-sm mb-5'> It might look like a complex process. But we assure you that what comes to your doorstep, goes through these four stages. Nothing more nothing less </p>
                <img src="https://www.farmlyfresh.com/wp-content/uploads/2020/05/process.png" className="block mx-auto pb-10" />
            </div>
            <div className="container max-w-7xl mx-auto ">
                <div className="text-center   justify-items-center w-full mb-5 px-4">
                    <h2 className='font-bold text-5xl mb-5 pt-2'>Good of Milk</h2>
                    <p className='text-gray-500 text-sm mb-5'>The following are a few reasons why milk should be an important diet of your daily life</p>
                    <div className="  grid  grid-cols-1 lg:grid-cols-3 gap-2  ">
                        <div className=' w-full lg:w-6/12  ml-auto'>
                            <div className="text-right ">
                                <h2 className='font-bold text-xl mb-2 pt-2'>Packed with Nutrients</h2>
                                <p className='text-gray-500 text-sm mb-5'> Milk is an excellent source of vitamins and minerals, including “nutrients of concern,” it’s a known fact. </p>
                            </div>
                            <div className="text-right  ml-auto">
                                <h2 className='font-bold text-xl mb-2 pt-2'>Healthy Bones</h2>
                                <p className='text-gray-500 text-sm mb-5'>Milk have all of those nutrients that are essential for maintaining strong, healthy bones even mind too. </p>
                            </div>
                            <div className="text-right  ml-auto">
                                <h2 className='font-bold text-xl mb-2 pt-2'>Good For Heart</h2>
                                <p className='text-gray-500 text-sm mb-5'> Milk is a source of potassium, which can help the blood vessels dilate and reduce blood pressure. </p>
                            </div>

                        </div>
                        <div>
                            <img src="https://www.farmlyfresh.com/wp-content/uploads/2017/06/milk-buy.png" />
                        </div>
                        <div className="text-left w-full  lg:w-6/12 mr-auto">
                            <div>
                                <h2 className='font-bold text-xl mb-5 pt-2'>Protein Rich</h2>
                                <p className='text-gray-500 text-sm mb-5'>There are two main types of protein found in milk — casein and whey protein. Both are considered high-quality proteins.</p>
                            </div>
                            <div>
                                <h2 className='font-bold text-xl mb-5 pt-2'>Healthy Babies</h2>
                                <p className='text-gray-500 text-sm mb-5'>Milk can aid muscle growth. Cow’s milk is a rich source of high quality protein, containing all essential amino acids.</p>
                            </div>
                            <div>
                                <h2 className='font-bold text-xl mb-5 pt-2'>Reduces Stress</h2>
                                <p className='text-gray-500 text-sm mb-5'>Adequate vitamin D levels support the production of serotonin, a hormone people associate with mood, appetite, and sleep.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-2  grid-cols-1 text-left bg-gray-100 justify-items-center w-full pt-20   px-4'>
                <div>
                    <img src="https://www.farmlyfresh.com/wp-content/uploads/2020/04/farm-cow-n.png" />
                </div>
                <div className=''>
                    <h2 className='font-bold text-5xl mb-5 pt-2'>Our Journey so Far</h2>
                    <p className='text-gray-500 w-8/12 text-sm mb-5'>We would like to thank you for showering us with so much love and keeping faith in us. The below figure is a reward to our commitment to purity and our passion to deliver quality products and keep our customers happy.</p>
                    <div className='grid  grid-cols-1 sm:grid-cols-3'>
                        <div>
                            <h2 className='font-bold text-xl mb-1 pt-2'>3360</h2>
                            <h2 className='font-bold text-xl mb-1 '>HAPPY CUSTOMERS</h2>
                            <p className='text-gray-500 text-sm mb-5'>In and around Guwahati</p>
                        </div>
                        <div>
                            <h2 className='font-bold text-xl mb-1 pt-2'>106000</h2>
                            <h2 className='font-bold text-xl mb-1 '>LITRES OF MILK SOLD</h2>
                            <p className='text-gray-500 text-sm mb-5'>From FarmlyFresh farms</p>
                        </div>
                        <div>
                            <h2 className='font-bold text-xl mb-1 pt-2'>86421</h2>
                            <h2 className='font-bold text-xl mb-1'>KILOMETRE TRAVELLED</h2>
                            <p className='text-gray-500 text-sm mb-5'>By our products</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
