import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


export default function MilkQuestion() {
    const [openHidden, setOpenHidden] = useState(false);
    const [openHidden1, setOpenHidden1] = useState(false);
    const [openHidden2, setOpenHidden2] = useState(false);
    const [openHidden3, setOpenHidden3] = useState(false);
    const [openHidden4, setOpenHidden4] = useState(false);
    return (
        <div className="flex flex-wrap justify-center ">
            <div className="w-full lg:w-8/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                    <div className="flex-auto p-5 lg:p-10">
                        <div className=" w-full text-left mb-5 text-2xl font-serif">
                           Milk
                        </div>
                        <div className='border-b-2 border-t-2 cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden(!openHidden)}>
                                <i className='text-base font-bold'>What is the delivery charge for online orders?</i>
                                 {openHidden == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} 
                            </div>
                            <p className={ openHidden == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>All our orders are delivered FREE of cost. We do not charge any delivery charges for any of our orders whatsoever.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden1(!openHidden1)}>
                                <i className='text-base font-bold'>How do we know that the product is Fresh and Pure?</i>
                                 {openHidden1 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} 
                            </div>
                            <p className={ openHidden1 == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>There are various parameters for checking the quality of milk on different levels. Our milk goes through strict quality checks on high tech machines on a regular basis. It is uploaded regularly on our site so that you know what you consume. To make you understand better-detailed guide to it is present in the blog section or click here.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden2(!openHidden2)}>
                                <i className='text-base font-bold'>Is the Milk Pasteurised?</i>
                                 {openHidden2 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} 
                            </div>
                            <p className={ openHidden2 == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>FarmlyFresh milk is raw, unpasteurized milk. We don’t process the milk – thus providing purest and freshest form of milk to our patrons.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden3(!openHidden3)}>
                                <i className='text-base font-bold'>Can I buy products directly form FarmlyFresh outlet?</i>
                                 {openHidden3 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} 
                            </div>
                            <p className={ openHidden3 == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>No, we don’t sell products from any outlets whatsoever. We only have one office where we do our operations.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden4(!openHidden4)}>
                                <i className='text-base font-bold'>What varieties of milk do you supply?</i>
                                 {openHidden4 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} 
                            </div>
                            <p className={ openHidden4 == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>We only deal with whole milk that is raw and unprocessed. We do not have other variants such as full cream, toned, double toned and so on.</p>
                            <p className={ openHidden4 == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>We deliver the way the milk is extracted.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
