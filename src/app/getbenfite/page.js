"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUser,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  const [LearningWeb, setLearningWeb] = useState(null);
  useEffect(() => {
    const savedData = localStorage.getItem("LearningWeb");
    if (savedData) {
      setLearningWeb(JSON.parse(savedData));
    }
  }, []);
  return (
    <>
      <section className="p-4 w-full  h-[80vh]">
        <div className="grid max-full px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            {LearningWeb && (
              <h1 className="max-w-2xl mb-4 text-white heainggiftpage">
                Your Welcome {LearningWeb.name} You got a Gift.
              </h1>
            )}
            {!LearningWeb && (
              <h1 className="max-w-2xl mb-4 text-white heainggiftpage">
                what You will going to get some additional features
              </h1>
            )}
            {!LearningWeb && (
              <p className="max-w-2xl mb-6 font-light text-gray-500  text-gray-400 linehight">
                Scroll the page to see whatever you wil get. When you will login
                then feature are open for you free! Thanks for visiting.
              </p>
            )}
            {LearningWeb && (
              <p className="max-w-2xl mb-6 font-light text-gray-500  text-gray-400 linehight">
                Now {LearningWeb.name} You can user all Feature. for the
                personal uses or anythings else whatever you like. But this Site
                made for Life Journey Tracking Hope you like it.
              </p>
            )}
            {LearningWeb && (
              <a
                href={LearningWeb.name}
                className="inline-flex items-center gap-2 justify-center px-5 py-3 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Your Profile
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            )}
            {!LearningWeb && (
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Get started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            )}
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            {LearningWeb && (
              <img className="rounded-lg" src="https://img.freepik.com/free-photo/open-gifts-box-present-with-balloon-confetti-holiday-surprise-celebration-greeting-3d-rendering-illustration_56104-2065.jpg" alt="mockup" />
            )}
            {!LearningWeb && (
              <img className="rounded-lg" src="/shot02.gif" alt="mockup" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
