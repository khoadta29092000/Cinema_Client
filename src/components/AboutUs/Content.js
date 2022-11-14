
import { Link } from 'react-router-dom';

function handleClick(event) {
    event.preventDefault();
}
export default function Content() {
    return (
        <section className="relative py-16 bg-gray-100">
             {/* <div className="text-center bg-gray-100 justify-items-center w-full mb-5 pb-20 px-4">
                <h2 className='font-bold text-5xl mb-5 pt-2'>Our Process</h2>
                <p className='text-gray-500 text-sm mb-5'> It might look like a complex process. But we assure you that what comes to your doorstep, goes through these four stages. Nothing more nothing less </p>
                <img src="https://www.farmlyfresh.com/wp-content/uploads/2020/05/process.png" className="block mx-auto pb-10" />
                <button className="p-4 px-12 bg-green-500 hover:bg-green-600 rounded-3xl">Shop Package</button>
            </div> */}
            <div className="text-center  justify-items-center w-full  py-20 px-4">
                <div className='max-w-7xl  mx-auto'>
                    <h2 className='font-bold text-5xl mb-5 pt-2'>Who Are We?</h2>
                    <p className='text-gray-600 text-2xl text-left mb-5'> we are the ones who set up theaters to bring movies to everyone in the fastest and best way..</p>
                    <p className='text-gray-600 text-2xl text-left mb-5'>Therefore, we are using our knowledge and expertise in building cinemas and movie screening websites to help people access hot movies in the fastest way.              </p>
                    <button  className="p-4 px-6 bg-black uppercase font-semibold text-white rounded-md"><Link className='text-white  hover:text-gray-300' color="white" to="/"> Book a movie appointment </Link></button>
                </div>
            </div>
          
        </section>
    );
}
