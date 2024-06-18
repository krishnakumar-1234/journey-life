"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const slides = [
    {
      src: "/photo-1476820865390-c52aeebb9891.avif",
      alt: "Carousel Image 1",
    },
    {
      src: "/240_F_630366533_BVQZc4yhAOnJwwdEreMah5m3C5JzOkKE.jpg",
      alt: "Carousel Image 2",
    },
    {
      src: "/matt-foxx-IUY_3DvM__w-unsplash.jpeg",
      alt: "Carousel Image 3",
    },
    {
      src: "/maxime-horlaville-CSWllKT9wPw-unsplash.jpeg",
      alt: "Carousel Image 4",
    },
    {
      src: "/nico-smit-QnkzvFCxKrA-unsplash.jpeg",
      alt: "Carousel Image 5",
    },
  ];

  useEffect(() => {
    startAutoSlide();

    return () => {
      clearInterval(slideInterval.current);
    };
  }, []);

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // Set auto slide duration to 4000ms (4 seconds)
  };

  const goToSlide = (index) => {
    clearInterval(slideInterval.current);
    setCurrentSlide(index);
    startAutoSlide();
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <main className="p-5">
      <div id="animation-carousel" className="relative w-full" data-carousel="static">
        <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                currentSlide === index
                  ? "translate-x-0"
                  : currentSlide < index
                  ? "translate-x-full"
                  : "-translate-x-full"
              }`}
              style={{
                transform: `translateX(${(index - currentSlide) * 100}%)`,
              }}
              data-carousel-item={currentSlide === index ? "active" : ""}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                layout="fill"
                objectFit="cover"
                className="absolute block w-full h-full"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </main>
  );
}

export default Slider;
