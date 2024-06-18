"use client"; // Add this directive at the top if using Next.js

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CopyToClipboard() {
  const [textToCopy] = useState("This is the text to be copied!");

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Text copied to clipboard!");
    }).catch(err => {
      toast.error("Failed to copy text.");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-4 text-gray-700">{textToCopy}</p>
        <button 
          onClick={handleCopy} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Copy to Clipboard
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CopyToClipboard;
