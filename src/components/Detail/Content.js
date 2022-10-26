import React from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
export default function Content() {
    return (
        <div>
            {/* <CustomCard
        style={{ paddingTop: 150, minHeight: '100vh' }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
    > */}
            <div className="grid grid-cols-12">
                <div className="col-span-5 col-start-3">
                    <div className="grid grid-cols-3 mt-20 " style={{ marginTop: '25%' }}>
                        <img className="col-span-1" src="https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/e/d/ed-_poster_payoff_hckc_5_1_.jpg" style={{ width: '100%', height: 300 }} alt="123" />
                        <div className="mt-2 mx-4 " >
                            <div className=" flex flex-row my-5">
                                <div className="w-2/3">
                                    <span className=" text-lg">Ngày chiếu :</span>


                                </div>
                                <div className="text-center col-span-2">
                                    <p className="text-black mr-5 mt-1 ">24/10/2022
                                    </p>
                                </div>
                            </div>
                            <div className=" flex flex-row my-4">
                                <div className="w-1/4">
                                    <span className=" text-lg">Title:</span>


                                </div>
                                <div className="text-center col-span-2">
                                    <p className="text-black mx-4 mt-1  ">HẠ CÁNH KHẨN CẤP
                                    </p>
                                </div>
                            </div>
                            <div className=" flex flex-row my-5">
                                <div className="w-1/3">
                                    <span className=" text-lg">Director :</span>


                                </div>
                                <div className="text-center text-gray-200 col-span-2">
                                    <p className="text-black mt-1  ">HHan Jae-rim
                                    </p>
                                </div>
                            </div>
                            <div className=" flex flex-row my-5">
                                <div className="w-1/3">
                                    <span className=" text-lg">actor :</span>


                                </div>
                                <div className="text-center col-span-2">
                                    <p className="text-black mt-1  "> Song Kang-ho
                                    </p>
                                </div>
                            </div>
                            <div className=" flex flex-row my-5">
                                <div className="w-1/3">
                                    <span className=" text-lg">language:</span>


                                </div>
                                <div className="text-center col-span-2">
                                    <p className="text-black mt-1 "> Korea - Vietsub
                                    </p>
                                </div>
                            </div>


                        </div>
                        <div className="col-span-3 mt-2 " >
                            <h3 class="font-bold mt-4" > Nội dung phim </h3>
                            <p> Hạ Cánh Khẩn Cấp quy tụ dàn diễn viên đình đám bậc nhất xứ Hàn, bao gồm Song Kang-ho, Lee Byung-hun, Jeon Do-yeon, Kim Nam-Gil và Yim Si-wan, Park Hae-Joon. Bộ phim xoay quanh chuyến bay mang số hiệu KI501 của hãng hàng không Sky Korea, khởi hành từ sân bay quốc tế Incheon tới Honolulu, Hawaii. Không lâu sau khi máy bay cất cánh, một hành khách bắt đầu có những biểu hiện lạ và tử vong trước sự bàng hoàng của mọi người. Một virus lạ với tốc độ lây lan chóng mặt đã xâm nhập lên máy bay, tất cả chìm trong hỗn loạn và sợ hãi. Trong tình huống ngàn cân treo sợi tóc, một tuyên bố đề nghị hạ cánh khẩn cấp được đưa ra. Trên độ cao 8,534 mét, số phận của hơn 150 con người bao gồm cả các hành khách và phi hành đoàn sẽ ra sao</p>
                        </div>
                        
                    </div>
                   
                </div>

               
            </div>



            {/* </CustomCard> */}

        </div>





    )
}
