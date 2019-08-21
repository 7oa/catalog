import React, { useState, useEffect, useRef } from "react";
import "../css/slider.scss";

function Slider(props) {
  const [position, setPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.offsetWidth
  );
  const [carouselWidth, setCarouselWidth] = useState(0);
  const slidesList = props.children;
  const slidesCount = parseInt((carouselWidth + 30) / 155);
  const slideWidth = 155; //parseInt((windowWidth - 20) / slidesCount);
  const maxPosition =
    -slideWidth * (slidesList.length - slidesCount) +
    (carouselWidth - slideWidth * slidesCount) +
    30;
  const sliderRef = useRef(null);
  const slides = slidesList.map((item, index) => {
    return (
      <li key={index} style={{ width: slideWidth }}>
        {item}
      </li>
    );
  });

  const slidesLoad = () => {
    sliderRef.current.childNodes.forEach((el, i) => {
      //убрать ховер у слайдеров, отображающихся не полностью
      el.querySelector(".catalog-slider-item__img").classList.add("hide-hover");
      if (
        i >= Math.ceil(-position / 155) &&
        i < Math.ceil(-position / 155) + slidesCount
      ) {
        sliderRef.current.childNodes[i]
          .querySelector(".catalog-slider-item__img")
          .classList.remove("hide-hover");
      }

      //lazy load
      if (el.offsetLeft <= -position + slideWidth * slidesCount) {
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
    setCarouselWidth(sliderRef.current.clientWidth);
  }, [windowWidth]);

  useEffect(() => {
    slidesLoad();
  }, [position, windowWidth, carouselWidth]);

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
    <div className="carousel">
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
