"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const Carosel = () => {
  return (
    <div className="mt-2">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {[
          "slider1.jpg",
          "slider2.jpg",
          "slider3.jpg",
          "slider4.jpg",
          "slider5.jpg",
        ].map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[20vh] sm:h-[40vh] md:h-[60vh]">
              <Image
                src={`/assets/${img}`}
                alt={`Slide ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carosel;
