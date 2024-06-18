"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
function Header() {
  const [LearningWeb, setLearningWeb] = useState(null);
  useEffect(() => {
    const savedData = localStorage.getItem("LearningWeb");
    if (savedData) {
      setLearningWeb(JSON.parse(savedData));
    }
  }, []);
  return (
    <header className="w-full h-[60px] bg-gray-800 flex items-center p-4 justify-between">
      <div>
        <Link href="/">
          <Image
            width={45}
            height={45}
            className="rounded-full"
            src="/logo.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex items-center  gap-6">
        <Link href="#">Coding</Link>
        <Link href="#">Study</Link>
        {!LearningWeb && (
          <Link href="/login">
            <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 ">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Login Now
              </span>
            </button>
          </Link>
        )}
        {LearningWeb && <Link href="/login">Dashboard</Link>}
        {LearningWeb && (
          <Link href={LearningWeb.name}>
            <button
              className="flex items-center rounded-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              type="button"
            >
              <img
                src={LearningWeb.ProfilePic}
                alt={LearningWeb.ProfilePic}
                className="w-7 h-7 rounded-full mr-2 object-cover"
              />
              <span className="text-gray-900 dark:text-white">You</span>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
