"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
// import { useSession, signIn, signOut } from "next-auth/react";
function page() {
  const [LearningWeb, setLearningWeb] = useState({
    name: "",
    email: "",
    password: "",
    ProfilePic: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLearningWeb((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setLearningWeb((prevData) => ({ ...prevData, [id]: files[0].name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("LearningWeb", JSON.stringify(LearningWeb));
    toast("  saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Simple i can access in any where in the my next js directory
  //   const [LearningWeb, setLearningWeb] = useState(null);
  useEffect(() => {
    const savedData = localStorage.getItem("LearningWeb");
    if (savedData) {
      setLearningWeb(JSON.parse(savedData));
    }
  }, []);

  if (!LearningWeb) {
    return (
      <>
        <div className="w[100%] h-[100vh] flex justify-center items-center">
          <p>Loading....</p>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="flex mx-auto justify-center items-center p-10 width100in700widthofDievice text-white">
        <p className="text-center text-2xl ">
          Welcome to your Dashboard make your own profile
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="container mb-20 mx-auto gap-5 w-[95%] flex flex-col justify-center items-center dashboardformcontainer"
      >
        <div className="width100in700widthofDievice">
          <label htmlFor="name">
            <p className="pl-2 text-1xl text-white pb-2">Name</p>
            <input
              required
              className="w-[750px] text-white mx-auto justify-between py-2  pl-2 text-white-700 border border-gray-200 rounded-lg sm:flex sm:px-5 bg-gray-50 bg-gray-800 border-gray-700 width100in700widthofDievice"
              type="text"
              id="name"
              placeholder="Enter Name"
              value={LearningWeb.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="width100in700widthofDievice">
          <label htmlFor="email">
            <p className="pl-2 text-1xl text-white pb-2">Email</p>
            <input
              required
              className="w-[750px] mx-auto text-white justify-between py-2 pl-2 text-white-700 border border-gray-200 rounded-lg sm:flex sm:px-5 bg-gray-50 bg-gray-800 border-gray-700 width100in700widthofDievice"
              type="text"
              id="email"
              placeholder="Enter Email"
              value={LearningWeb.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="width100in700widthofDievice">
          <label htmlFor="password">
            <p className="pl-2 text-1xl text-white pb-2">password</p>
            <input
              required
              className="w-[750px] mx-auto text-white justify-between py-2 pl-2 text-white-700 border border-gray-200 rounded-lg sm:flex sm:px-5 bg-gray-50 bg-gray-800 border-gray-700 width100in700widthofDievice"
              type="password"
              id="password"
              placeholder="Enter password"
              value={LearningWeb.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="width100in700widthofDievice">
          <label htmlFor="ProfilePic">
            <p className="pl-2 text-1xl text-white pb-2">Profile pic</p>
            <input
              required
              className="w-[750px] mx-auto text-white justify-between py-2 pl-2 text-white-700 border border-gray-200 rounded-lg sm:flex sm:px-5 bg-gray-50 bg-gray-800 border-gray-700 width100in700widthofDievice"
              type="text"
              id="ProfilePic"
              placeholder="Enter ProfilePic id"
              value={LearningWeb.ProfilePic}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="width100in700widthofDievice">
          <button
            type="submit"
            className="w-[750px] text-white h-[45px] bg-blue-950 rounded-lg width100in700widthofDievice"
          >
            Save!
          </button>
        </div>
      </form>
    </>
  );
}

export default page;
