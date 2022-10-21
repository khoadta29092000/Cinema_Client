import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


export default function Question() {
    const [openHidden, setOpenHidden] = useState(false);
    const [openHidden1, setOpenHidden1] = useState(false);
    const [openHidden2, setOpenHidden2] = useState(false);
    const [openHidden3, setOpenHidden3] = useState(false);
    const [openHidden4, setOpenHidden4] = useState(false);
    return (
        <div className="flex flex-wrap justify-center mt-24">
            <div className="w-full lg:w-8/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                    <div className="flex-auto p-5 lg:p-10">
                        <div className="w-full text-center">
                            <H3 color="gray">FREQUENTLY ASKED QUESTIONS?</H3>
                            <Paragraph color="blueGray">
                                INFORMATION QUESTIONS
                            </Paragraph>
                        </div>
                        <div className='border-b-2 border-t-2 cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden(!openHidden)}>
                                <i className='text-lg font-bold'>Will I receive the same product that I see in the picture?</i>
                                 {openHidden == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} 
                            </div>
                            <p className={ openHidden == false ? "text-gray-500  mt-2 hidden" : "text-gray-500  mt-2"}>Yes. We only display our actual product along with our packaging. Hence, you get what you see on the site.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden1(!openHidden1)}>
                                <i className='text-lg font-bold'>Where can I view my sales receipt?</i>
                                 {openHidden1 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} 
                            </div>
                            <p className={ openHidden1 == false ? "text-gray-500  mt-2 hidden" : "text-gray-500  mt-2"}>After every payment, an invoice is sent to your e-mail ID. You can find your invoice in the registered email for each and every payment.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden2(!openHidden2)}>
                                <i className='text-lg font-bold'>How can I return an item?</i>
                                 {openHidden2 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} 
                            </div>
                            <p className={ openHidden2 == false ? "text-gray-500  mt-2 hidden" : "text-gray-500  mt-2"}>We only accept returns only if the wrong product is delivered or if the product which you receive is found the seal to be tempered or broken while the delivery executive is at your place. So, please check the seal and the product which accepting it from the delivery executive.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden3(!openHidden3)}>
                                <i className='text-lg font-bold'>Will you restock items indicated as “out of stock?"</i>
                                 {openHidden3 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} 
                            </div>
                            <p className={ openHidden3 == false ? "text-gray-500  mt-2 hidden" : "text-gray-500  mt-2"}>Almost all of our products are always available. However, in case any product goes out of stock we would restock it as soon as possible and most likely within 12 hours.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden4(!openHidden4)}>
                                <i className='text-lg font-bold'>Where can I ship my order?</i>
                                 {openHidden4 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />} 
                            </div>
                            <p className={ openHidden4 == false ? "text-gray-500  mt-2 hidden" : "text-gray-500  mt-2"}>Currently, our service areas are limited to certain parts of Guwahati. We would like to assure you that in a short period our service would cover the entire Guwahati.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
