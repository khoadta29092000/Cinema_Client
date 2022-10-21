import { Link } from 'react-router-dom';

function handleClick(event) {
    event.preventDefault();
}

export default function Header() {
    return (
        <div className="relative pt-16 pb-12 h-[500px] flex content-center items-center justify-center ">
            <div className="bg-profile-background bg-cover bg-center absolute top-0 w-full h-full" />
            <div className="container max-w-8xl relative mx-auto">
                <div className="items-center  flex flex-wrap">
                    <div className="w-full  px-4 ml-auto mr-auto text-center">
                    <h2 className=" lg:text-8xl text-4xl font-bold text-white">FAQs</h2>
                        <div className='text-center mt-5   w-full ' onClick={handleClick}>
                            <i><Link className='text-white  hover:text-gray-300' color="white" to="/">
                                Home /
                            </Link></i>
                            <i className='text-white ml-2' color="white">FAQs</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
