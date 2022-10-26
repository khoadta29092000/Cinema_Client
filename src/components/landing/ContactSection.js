import Title from 'components/landing/Title';
import "./HomeApp.css";
import Form from 'components/landing/Form';
import React from "react";
import backGround from "../../../src/assets/img/backgroundlogin.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

import { Autoplay } from "swiper";

export default function ContactSection() {
    return (
      
        <div
        id="homeApp"
        style={{
          background: `url(${backGround}) center / cover`,
          padding: "120px 0",
        }}
      >
        <div className="container xl:max-w-7xl ">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="text-white px-4 py-5 lg:py-20 text-center lg:text-left">
              <p className="text-3xl font-bold tracking-wider">
                Ứng dụng tiện lợi dành cho
              </p>
              <p className="text-3xl font-bold tracking-wider">
                người yêu điện ảnh
              </p>
              <p className="text-base">
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và
                đổi quà hấp dẫn.
              </p>
              <a
                href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
                target="_blank"
                className="inline-block px-7 py-5 mt-4 text-white text-lg font-semibold rounded text-coolGray-100 uppercase hover:text-white bg-red-500 hover:bg-red-600 transition duration-200"
              >
                App miễn phí - Tải về ngay!
              </a>
              <p className="mt-3">
                TIX có hai phiên bản{" "}
                <a
                  href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
                  target="_blank"
                  className="text-white underline hover:underline hover:text-red-400"
                >
                  IOS
                </a>{" "}
                &{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                  target="_blank"
                  className="text-white underline hover:underline hover:text-red-400"
                >
                  Android
                </a>
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="./images/img-mobile.png"
                  alt="imgMobile"
                  className="w-72 lg:w-52"
                />
                <div className="mobile">
                  <Swiper
                    className="mySwiper"
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                  >
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
