"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("userImages")) || [];
    setImages(savedImages);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = { id: Date.now(), url: reader.result };
        const updatedImages = [...images, newImage];
        setImages(updatedImages);
        localStorage.setItem("userImages", JSON.stringify(updatedImages));
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    localStorage.setItem("userImages", JSON.stringify(updatedImages));
    toast.success("Image deleted successfully!");
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex p-5 text-white">
        <p className="text-3xl">Your Gallery Upload image</p>
      </div>
      <div className="container mx-auto p-5">
        <div className="mb-5">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.url}
                alt="User Upload"
                className="w-full h-56 object-cover rounded-lg cursor-pointer"
                onClick={() => openModal(image)}
              />
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-2 right-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-full max-h-full flex justify-center items-center">
            <img
              src={selectedImage.url}
              alt="Selected"
              className="rounded-lg max-w-[90%] max-h-[90%]"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryPage;
