import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
function Footer() {
  return (
    <div className="footer w-[100%] mx-auto  bg-gray-900 mt-10 text-white flex justify-between items-center p-3 flex-wrap gap-2">
      <div className="flex justify-center flex-col gap-2">
        <p>© 2024 Personal Journey. All Rights Reserved.</p>
        <p>Don’t forget to Flollow me Personal Journey. Made by krishna ❤️</p>
      </div>
      <div>
        <Link
          href=""
          className="flex items-center justify-center gap-2"
        >
          <button className="w-[150px] relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4">
            <span className="w-[150px] flex items-center justify-center gap-2 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <Image
                width={30}
                height={30}
                src="/github.svg"
                className="invert"
                alt="image"
              />
              Gihtub
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
