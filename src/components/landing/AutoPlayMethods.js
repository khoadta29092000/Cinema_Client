import React, { Component } from "react";
import Slider from "react-slick";
import LeadText from '@material-tailwind/react/LeadText';
import "./Slider.css"

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 4000,
        
    };
    return (
      <div className="max-w-full ">
        <Slider  {...settings} className="">
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
            <div className="bg-slide1-background bg-cover bg-center absolute top-0 w-full h-full" />
            <div className="container max-w-8xl relative mx-auto">
                <div className="items-center mt-48 flex flex-wrap">
                   
                </div>
            </div>
        </div>
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
            <div className="bg-slide2-background bg-cover bg-center absolute top-0 w-full h-full" />
            <div className="container max-w-8xl relative mx-auto">
                <div className="items-center flex mt-48 flex-wrap">
                   
                </div>
            </div>
        </div> 
        {/* <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
            <div className="bg-slide3-background bg-cover bg-center absolute top-0 w-full h-full" />
            <div className="container max-w-8xl relative mx-auto">
                <div className="items-center flex mt-48 flex-wrap">
                    <div className="w-full 2xl:mr-32 lg:w-6/12 px-4 ml-auto mr-auto text-right">
                        <h2 className="uppercase text-2xl lg:text-5xl font-bold text-white">Traditionally</h2>
                        <h2 className="uppercase text-2xl lg:text-5xl  mt-3  font-bold text-white">prepared</h2>
                        <h2 className="uppercase text-2xl lg:text-5xl  mt-3  font-bold text-white">paneer</h2>
                        <div className="text-gray-200 2xl:text-right uppercase">
                            <LeadText color="gray-200" >
                              Freshly made only upon Pre-order
                            </LeadText>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        </Slider>
      </div>
    );
  }
}