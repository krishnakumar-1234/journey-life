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

function Page({ params }) {
  const router = useRouter(); // Initialize useRouter
  const [learningWeb, setLearningWeb] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("LearningWeb");
    if (!savedData) {
      // If LearningWeb does not exist in local storage, redirect to home page
      router.push("/");
      return;
    }

    setLearningWeb(JSON.parse(savedData));
  }, [router]); // Add router to dependencies

  const handleLogout = () => {
    localStorage.removeItem("LearningWeb");
    toast.info("Logged out!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setLearningWeb(null);
  };

  const profileBoxes = [
    {
      icon: faChartPie,
      title: "Dashboard",
      description: "View your dashboard.",
      link: "/dashboard",
    },
    {
      icon: faUser,
      title: "Profile",
      description: "View and edit your profile.",
      link: "/profile",
    },
    {
      icon: faCog,
      title: "Settings",
      description: "Manage your account settings.",
      link: "/settings",
    },
    {
      icon: faSignOutAlt,
      title: "Logout",
      description: "Sign out from your account.",
      action: handleLogout,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="mb-8 flex items-center">
        {learningWeb && (
          <img
            src={learningWeb.ProfilePic || "/user.avif"}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div className="ml-4">
          <div className="font-bold text-3xl">@{params.userprofile}</div>
          <div className="mt-1 text-sm italic">Welcome to your profile.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl  text-center">
        {profileBoxes.map((box, index) => (
          <div key={index}>
            {box.link ? (
              <Link href={box.link}>
                <button>
                  <div className="w-[250px] h-[150px] flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md transition duration-300 hover:bg-gray-700 cursor-pointer">
                    <FontAwesomeIcon
                      icon={box.icon}
                      className="text-4xl text-white mb-2"
                    />
                    <div className="text-white font-medium">{box.title}</div>
                    <div className="text-gray-400 text-sm text-center mt-1">
                      {box.description}
                    </div>
                  </div>
                </button>
              </Link>
            ) : (
              <div className="w-full flex items-center justify-center">
                <button
                  className="w-[250px] h-[150px] flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md transition duration-300 hover:bg-gray-700 cursor-pointer"
                  onClick={box.action}
                >
                  <FontAwesomeIcon
                    icon={box.icon}
                    className="text-4xl text-white mb-2"
                  />
                  <div className="text-white font-medium">{box.title}</div>
                  <div className="text-gray-400 text-sm text-center mt-1">
                    {box.description}
                  </div>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        {learningWeb ? (
          <Link href="/">
            <button className="px-4 py-2 text-sm font-medium text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300">
              Go Back to Home
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="px-4 py-2 text-sm font-medium text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300">
              Login
            </button>
          </Link>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Page;
