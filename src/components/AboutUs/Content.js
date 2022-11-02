
export default function Content() {
    return (
        <section className="relative py-16 bg-gray-100">
             <div className="text-center bg-gray-100 justify-items-center w-full mb-5 pb-20 px-4">
                <h2 className='font-bold text-5xl mb-5 pt-2'>Our Process</h2>
                <p className='text-gray-500 text-sm mb-5'> It might look like a complex process. But we assure you that what comes to your doorstep, goes through these four stages. Nothing more nothing less </p>
                <img src="https://www.farmlyfresh.com/wp-content/uploads/2020/05/process.png" className="block mx-auto pb-10" />
                <button className="p-4 px-12 bg-green-500 hover:bg-green-600 rounded-3xl">Shop Package</button>
            </div>
            <div className="text-center   bg-green-100 justify-items-center w-full  py-20 px-4">
                <div className='max-w-7xl  mx-auto'>
                    <h2 className='font-bold text-5xl mb-5 pt-2'>Who Are We?</h2>
                    <p className='text-gray-600 text-sm text-left mb-5'> We are a group of farmers who have taken an honest initiative to serve you fresh, chemical-free and preservative- free milk directly from our farm to your doorstep. We ensure that the milk do not contain any harmful substance which are widely present in our food products today. We are second generation cattle farmers from Khanapara. Since childhood we have experienced the hardships involved in maintaining the farm and obtaining the best quality milk from the cows. But our entire labour and toil is discredited by some of the petty vendors or middlemen through their practices which bring a bad repute to the farmers or the producers.</p>
                    <p className='text-gray-600 text-sm text-left mb-5'>Hence, we are using our knowledge and expertise in building complex supply chains to make possible that fresh and unadulterated milk reaches to the people on a daily basis. We aim to take these good quality food products to more and more households with the use of technology.               </p>
                    <button className="p-4 px-6 bg-black uppercase font-semibold text-white rounded-md">Book A farm visit</button>
                </div>
            </div>
            <div className="text-center  bg-white justify-items-center w-full mb-5 py-20 px-4">
                <div className='max-w-7xl  mx-auto'>
                    <h2 className='font-bold text-5xl mb-5 pt-2'>Our Mission and Vision</h2>
                    <hr className='max-w-xl border-green-500 my-5 mx-auto' />
                    <div className=' grid md:grid-cols-2 grid-cols-1'>
                        <div>
                            <h2 className='font-bold text-left text-base'>MISSION</h2>
                            <p className='text-gray-600 my-5 max-w-xl text-sm text-left mb-5'>Purity is our priority. The overall health benefits of milk can only be availed if it is pure and fresh. Keeping you healthy through healthy food habits is our mission.  For that, FarmlyFresh emphasizes on delivering unadulterated dairy products at your doorstep at affordable rates.</p>
                            <p className='text-gray-600 text-sm  max-w-xl  text-left mb-5'>We also aim to join hands with specially-abled unemployed youth of our society for the betterment of our services and in achieving our aim of giving back to society and fulfilling the role of a responsible citizen.</p>
                        </div>
                        <div>
                        <h2 className='font-bold text-left text-base'>VISION</h2>
                            <p className='text-gray-600  my-5  max-w-xl  text-sm text-left mb-5'> Availability of quality dairy products in big cities at affordable rates is definitely a blessing for the people living there.  At the same time, we should also not forget whether or not the producers or farmers get a fair price for their produce which they deserve. That can be done by arranging a proper market channel for the farmers and eliminating the profit mongering middlemen from the marketing chain as much as possible.</p>
                            <p className='text-gray-600 text-sm  max-w-xl  text-left mb-5'>Therefore, keeping this vision in mind, we would make every possible effort to ensure that we not only keep customers happy and satisfied but also the farmers.</p>
                        </div>

                    </div>
                </div>
            </div> 
        </section>
    );
}
