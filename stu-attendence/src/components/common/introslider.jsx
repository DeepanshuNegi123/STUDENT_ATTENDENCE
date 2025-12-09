import React, { use } from "react";
import { Swiper, SwiperSlide , useSwiper } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaPenFancy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Slidebutton = ({text , css  })=>{

const swiper = useSwiper();

return (

<div className=" flex flex-row  p-2  items-center justify-center ">
    <button className={css} 
    onClick={() => swiper.slideNext()}>{text}</button>

</div>

)
}

const Skipbutton = ({text , css , onClick})=>{

return (

<div className=" flex flex-row  p-2  items-center justify-center">
    <button className={css} 
    onClick={onClick}>{text}</button>
</div>

)


}


export default function Introslides(){

  const navigate = useNavigate();
return (

<div className="h-screen w-screen overflow-hidden">

  <Swiper
    modules={[Autoplay, Pagination]}
    pagination={{ clickable: true , dynamicBullets: true  }}

    // loop={true}
    // autoplay={{ delay: 3000  }}
    // onReachEnd={()=>{

    //   setTimeout(()=>{
    //      navigate('/login');
    //   }, 1500)
     
    // }}


    className="h-full w-full">

<SwiperSlide>
 <div className="relative flex flex-col items-center justify-center text-black bg-white font-bold h-screen px-4">

  {/* Title Row */}
  <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-4 items-center justify-center">
    
    <h1
      className="text-center text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
      style={{
        WebkitTextStroke: "1px black",
        textStroke: "1px black",
      }}
    >
      Welcome to
    </h1>

    <h1 className="bg-black p-2 sm:p-3 rounded-md text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
      Mark It
    </h1>

    <FaPenFancy className="text-black" size={45} />
  </div>

  {/* Paragraph */}
  <p className="text-[#333] font-[cursive] text-xl sm:text-2xl md:text-3xl mt-4 text-center">
    a Student Attendance System
  </p>

  {/* Buttons */}
  <div className="fixed bottom-10 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 items-center">

    <Slidebutton text="Next" css="bg-black text-white font-bold px-6 py-2 rounded-md text-2xl sm:text-3xl" />
    <Skipbutton  onClick={()=>{navigate('/login')}} text="Skip..." css="text-black font-bold p-1 text-lg sm:text-2xl" />

  </div>

</div>

</SwiperSlide>

    <SwiperSlide>
      <div className="h-screen flex items-center justify-center bg-green-500 text-white text-4xl font-bold">
        Learn About Our Features
      </div>
    </SwiperSlide>


    <SwiperSlide>
      <div className="h-screen flex items-center justify-center bg-black text-white text-4xl font-bold">
        Get Started!
      </div>

  <div className="fixed bottom-10 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 items-center">
    <Skipbutton  onClick={()=>{navigate('/login')}} text="Skip..." css="text-white font-bold p-1 text-lg sm:text-2xl" />

  </div>

    </SwiperSlide>



  </Swiper>
</div>
)



}