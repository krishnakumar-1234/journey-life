import React from "react";
import Slider from "./components/Slider";
import GalleryPage from "./Gallery/page";
// import Copy from "./copy/page"
function page() {
  
  return (
    <div>
      <Slider />
      {/* <Copy /> */}
      <GalleryPage />
    </div>
  );
}

export default page;
