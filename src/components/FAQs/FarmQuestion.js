import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


export default function FarmQuestion() {
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
                            Farm
                        </div>
                        <div className='border-b-2 border-t-2 cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden(!openHidden)}>
                                <i className='   font-bold'>Who operates Farm?</i>
                                {openHidden == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />}
                            </div>
                            <p className={openHidden == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>It is the farmers themselves who through a complex chain of supply deliver produce from their own farms directly to the consumers.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden1(!openHidden1)}>
                                <i className='   font-bold'>How can I be sure that all your claims are true?</i>
                                {openHidden1 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />}
                            </div>
                            <p className={openHidden1 == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>FarmlyFresh is a company incorporated under____ of the Company Law Act of the Central Government. It is also an FSSAI ( Food Safety and Standard Authority of India) certified company. We encourage not only our customers but also those who are curious to learn about our process to come visit our farm and see it first-hand our operation and our farm. In addition to that, we have a highly responsive Support Centre where all your queries are answered immediately.</p>
                            <p className={openHidden1 == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>Also, Consumers are free to get the samples checked at any lab.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden2(!openHidden2)}>
                                <i className='   font-bold'>Where are your farms located?</i>
                                {openHidden2 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />}
                            </div>
                            <p className={openHidden2 == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>Our farms are located in the Biên Hoà locality just about 1 kilometres from TP.Hồ Chí Minh.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden3(!openHidden3)}>
                                <i className='   font-bold'>How long will the delivery of milk products take?</i>
                                {openHidden3 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />}
                            </div>
                            <p className={openHidden3 == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>If ordered by 6 PM, you will receive the order the same day. For orders placed after 6 PM they will be delivered the next day.</p>
                        </div>
                        <div className='border-b-2  cursor-pointer w-full py-4'>
                            <div onClick={() => setOpenHidden4(!openHidden4)}>
                                <i className='   font-bold'>What payment methods do you accept?</i>
                                {openHidden4 == false ? <ArrowDropDownIcon className="" /> : <ArrowDropUpIcon className="" />}
                            </div>
                            <p className={openHidden4 == false ? "text-gray-500 text-sm mt-2 hidden" : "text-gray-500 text-sm mt-2"}>We accept all modes of payment – Cash, Bank transfer, Online payment using CC/DC/Netbanking as well as Paytm or other wallets. We also accept payments MoMo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
