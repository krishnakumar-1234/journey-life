"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
function page({ params }) {
  const [LearningWeb, setLearningWeb] = useState(null);
  useEffect(() => {
    const savedData = localStorage.getItem("LearningWeb");
    if (savedData) {
      setLearningWeb(JSON.parse(savedData));
    }
  }, []);
  return (
    <div>
      <div></div>
      {LearningWeb && (
        <img
          src={LearningWeb.ProfilePic}
          alt={LearningWeb.ProfilePic}
          className="w-[200px] h-[200px] rounded-lg mr-2 object-cover"
        />
      )}
      <div className="font-bold text-1lg text-white">@{params.userprofile}</div>
    </div>
  );
}

export default page;
