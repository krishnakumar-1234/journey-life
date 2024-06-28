"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const [LearningWeb, setLearningWeb] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("LearningWeb");
    if (savedData) {
      setLearningWeb(JSON.parse(savedData));
    }
  }, []);

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
    setLearningWeb(null); // Clear the LearningWeb state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        closeDropdown();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <header className="w-full h-[60px] bg-gray-800 flex items-center p-4 justify-between">
        <div>
          <Link href="/">
            <img
              width={45}
              height={45}
              className="rounded-full"
              src="https://static.vecteezy.com/system/resources/previews/005/076/592/non_2x/hacker-mascot-for-sports-and-esports-logo-free-vector.jpg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6">
            <Link href="#">Coding</Link>
            <Link href="#">Study</Link>
            {LearningWeb && <Link href="/TodosApp">Todos</Link>}
            {LearningWeb && <Link href="/login">Dashboard</Link>}
            {LearningWeb && <Link href="/Gallery">Gallery</Link>}
          </div>
          {!LearningWeb && (
            <Link href="/login">
              <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Login Now
                </span>
              </button>
            </Link>
          )}
          {LearningWeb && (
            <div className="relative dropdown-container">
              <button
                onClick={toggleDropdown}
                className="flex items-center rounded-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                type="button"
              >
                <img
                  src={LearningWeb.ProfilePic || "/user.avif"}
                  alt="Profile Pic"
                  className="w-7 h-7 rounded-full mr-2 object-cover"
                />
                <span className="text-gray-900 dark:text-white">You</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 dark:bg-gray-800">
                  <Link href="#" className="w-[100%]">
                    <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                      Coding
                    </button>
                  </Link>
                  <Link href="#" className="w-[100%]">
                    <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                      Study
                    </button>
                  </Link>
                  <Link href="/login" className="w-[100%]">
                    <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                      Dashboard
                    </button>
                  </Link>
                  <Link href="/TodosApp" className="w-[100%]">
                    <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                      TodosApp
                    </button>
                  </Link>
                  <Link href="/Gallery" className="w-[100%]">
                    <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                      Gallery
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                  <Link href={LearningWeb.name} className="w-[100%]">
                    <button
                      onClick={toggleDropdown}
                      className="flex w-full items-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      type="button"
                    >
                      <img
                        src={LearningWeb.ProfilePic || "/user.avif"}
                        alt="Profile Pic"
                        className="w-7 h-7 rounded-full mr-2 object-cover"
                      />
                      <span className="text-gray-900 dark:text-white">You</span>
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <ToastContainer />
    </>
  );
}

export default Header;
