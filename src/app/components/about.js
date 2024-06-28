import React from "react";

function about() {
  return (
    <>
      <div className="w-[100%] text-white flex flex-col items-center justify-center gap-4 p-4">
        <p className="text-3xl font-bold">About This page</p>
        <iframe
          className="rounded-lg width100in700widthofDievice"
          width="806"
          height="453"
          src="https://www.youtube.com/embed/niEHpndFnvw"
          title="5 Things I Wish I Knew When I Started Programming (Honest Truth)"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

export default about;
