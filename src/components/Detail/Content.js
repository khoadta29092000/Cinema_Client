import React from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
export default function Content() {
  return (
    <div style={{ backgroundImage: `url(https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/e/d/ed-_poster_payoff_hckc_5_1_.jpg)`, backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
    <CustomCard
        style={{ paddingTop: 150, minHeight: '100vh' }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
    >
        <div className="grid grid-cols-12">
            <div className="col-span-5 col-start-3">
                <div className="grid grid-cols-3">
                    <img className="col-span-1" src="https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/e/d/ed-_poster_payoff_hckc_5_1_.jpg" style={{ width: '100%', height: 300 }} alt="123" />
                    <div className="col-span-3 ml-2 " >
                        <p className="text-2xl text-blue-500">Ngày chiếu:</p>
                        <p className="text-2xl leading-9 text-blue-500">Title : HẠ CÁNH KHẨN CẤP</p>
                        <p className="text-2xl leading-9 text-blue-500">Director:Han Jae-rim</p>
                        <p className="text-2xl leading-9 text-blue-500">actor: Song Kang-ho, Lee Byung-hun, Jeon Do-yeon, Kim Nam-Gil và Yim Si-wan, Park Hae-Joon.</p>
                        <p className="text-2xl leading-9 text-blue-500">language: Korea - Vietsub</p>
                     

                        {/* <p>{filmDetail.moTa}</p> */}
                    </div>
                </div>

            </div>

            {/* <div className="col-span-4">
                <h1 style={{ marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                    <span className="text-white">

                        {filmDetail.danhGia * 10}%
                    </span>
                    <div className="slice">
                        <div className="bar"></div>
                        <div className="fill"></div>

                    </div>

                </div>
                <br />

            </div> */}
        </div>

        

    </CustomCard>

</div>
  )
}
