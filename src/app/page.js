import React from "react";
import Slider from "./components/Slider";
// import GalleryPage from "./Gallery/page";
import Getbenfite from "./getbenfite/page";
import About from "./components/about";
// import Copy from "./copy/page"
function page() {
  return (
    <div>
      <Slider />
      {/* <Copy /> */}
      <Getbenfite />
      <About />
    </div>
  );
}

export default page;
