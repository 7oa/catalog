import React, { useState, useEffect, useRef } from "react";
import "../css/slider.scss";

function Slider(props) {
  const [position, setPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.offsetWidth
  );
  const slidesList = props.children;
  const slidesCount = parseInt((windowWidth - 60) / 187);
  const slideWidth = parseInt((windowWidth - 60) / slidesCount);
  const maxPosition = -slideWidth * (slidesList.length - slidesCount);
  const sliderRef = useRef(null);

  const slides = slidesList.map((item, index) => {
    return (
      <li key={index} style={{ width: slideWidth }}>
        {item}
      </li>
    );
  });

  const lazyLoad = () => {
    sliderRef.current.childNodes.forEach(el => {
      if (el.offsetLeft < -position + slideWidth * slidesCount) {
        const img = el.querySelector("img[data-src]");
        if (img != null) {
          img.setAttribute("src", img.getAttribute("data-src"));
          img.onload = function() {
            img.removeAttribute("data-src");
          };
        }
      }
    });
  };

  useEffect(() => {
    lazyLoad();
  }, [position, windowWidth]);

  const prevSlide = () => {
    let _position = position;
    _position += slideWidth * slidesCount;
    setPosition(Math.min(_position, 0));
  };

  const nextSlide = () => {
    let _position = position;
    _position -= slideWidth * slidesCount;
    setPosition(Math.max(_position, maxPosition));
  };

  const handleResize = () => {
    setWindowWidth(document.documentElement.offsetWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div id="carousel" className="carousel">
      {slidesList.length > slidesCount && (
        <React.Fragment>
          <button
            className={`arrow prev ${position === 0 ? "disabled" : ""}`}
            onClick={prevSlide}
          />
          <button
            className={`arrow next ${
              position === maxPosition ? "disabled" : ""
            }`}
            onClick={nextSlide}
          />
        </React.Fragment>
      )}
      <div className="gallery">
        <ul className="images" style={{ marginLeft: position }} ref={sliderRef}>
          {slides}
        </ul>
      </div>
    </div>
  );
}

export default Slider;
