import React from 'react'
import style from './Checkout.module.css'
export default function Content() {
  return (
    <div className=" min-h-screen mt-5" >
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <div className="col-span-2 text-center my-auto">
            <div className="mt-2">
              <h3>Thời gian giữ vé</h3>
              <h1 className="text-red-600 font-black text-3xl mr-2">
                {/* <Timer /> */}
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center mt-5">

            <div className="bg-black " style={{ width: '80%', height: 15 }}>

            </div>
            <div className={`${style['trapezoid']} text-center `}>
              <h3 className="mt-3 text-black"> màn hình</h3>
            </div>
            <div>


            </div>

          </div>
          <div className="mt-5 flex justify-center">
            <table class=" divide-y divide-gray-200 w-2/3">
              <thead class="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang  đặt</th>

                  <th>Ghế đã được đặt</th>
                  <th>Ghế mình mình đặt</th>
                  <th>Ghế khách đang đặt</th>
                </tr>
              </thead>

            </table>

          </div>

        </div>
        <div className="col-span-2">
          {/* tổng tiền */}


          <h3 className="text-3xl text-center mt-2">HẠ cánh Nơi Anh</h3>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-2/3">
              <span className="text-red-400 text-lg">Ngày giờ chiếu</span>


            </div>
            <div className="text-center col-span-1">
              <p className="text-green-800 text-lg">24/10/2022 - 19:00
              </p>
            </div>

          </div>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-3/5">
              <span className=" text-red-400 text-lg">Tên Rạp: CGV Nguyễn Hồng ĐÀo </span>


            </div>
            <div className="text-center col-span-1">
             
            </div>

          </div>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400 text-lg">Phòng : 1</span>


            </div>
            <div className="text-center col-span-1">
              {/* <p className="text-green-800 text-lg">{thongTinPhim?.tenRap}
                    </p> */}
            </div>

          </div>
          <hr />




          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400 text-lg">Chọn Ghế : A1, A2 </span>



            </div>
            <div className="text-right col-span-1">
              <span className="text-green-800 text-lg">

              </span>
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i>: Duydan  <br />

          </div>
          <hr />
          <div className="my-5">
            <i>Phone</i> 0374650379 <br />

          </div>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400 text-lg"> Chọn Combo</span>


            </div>
            <div className="text-right col-span-1">
              <span className="text-green-800 text-lg">0đ
              </span>
            </div>

          </div>
          <hr />
          <div className="my-5">
            <div>
              <label htmlFor="ma_giam_gia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mã giảm giá</label>
              <input type="text" id="ma_giam_gia" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mã giảm giá" required />
            </div>
            <br />
            <hr />
          </div>
          <div className="my-5 " >
            <p>Phương thức thanh toán</p> <br />
            <div class="radio-selection">


           
              <div class="radio__item flex pointẻ flex-start align-items-center" >
                <input class="radio__item--input" type="radio" name="howtopay" id="MOMO" value="MOMO"></input>
                <label class="radio__item--label label_MOMO flex justify-items-start items-center" for="MOMO">
                  <div class="pay__figure">
                    <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" className="rounded-full w-full" style={{ width: 50 }} alt="MOMO" />

                  </div>
                  <p class="pay__text text-center ">momo </p>
                </label>
              </div>
            </div>

          </div>
          <hr />
          <div className="mb-0 h-full flex flex-col items-center" style={{ marginBottom: 0 }}>
            <div className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer">
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
