import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../App";
import "../css/slider.scss";

function Slider(props) {
  const { showModalList } = useContext(AppContext);
  const [position, setPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.offsetWidth
  );
  const [carouselWidth, setCarouselWidth] = useState(0);
  const slideWidth = 165; //parseInt((windowWidth - 20) / slidesCount); //ширина элемента с отступом
  const slidesList = props.children; //список элементов
  const slidesCount = parseInt((carouselWidth + 20) / slideWidth); // кол-во прокручиваемых элементов
  const pageSize = props.pageSize; //макс кол-во элементов в слайдере

  let maxPosition =
    -slideWidth *
    (slidesList.length -
      slidesCount); /* +
    (carouselWidth - slideWidth * slidesCount) +
    30;*/

  if (pageSize <= slidesList.length) maxPosition -= slideWidth;

  const sliderRef = useRef(null);
  const slides = slidesList.map((item, index) => {
    return (
      <li key={index} style={{ width: slideWidth }}>
        {item}
      </li>
    );
  });

  const slidesLoad = () => {
    if (sliderRef.current != null) {
      sliderRef.current.childNodes.forEach((el, i) => {
        //убрать ховер у слайдеров, отображающихся не полностью
        if (el.querySelector(".catalog-item__img")) {
          el.querySelector(".catalog-item__img").classList.add("hide-hover");
          if (
            i >= Math.ceil(-position / slideWidth) &&
            i < Math.ceil(-position / slideWidth) + slidesCount
          ) {
            sliderRef.current.childNodes[i]
              .querySelector(".catalog-item__img")
              .classList.remove("hide-hover");
          }
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
    }
  };

  useEffect(() => {
    if (sliderRef.current != null)
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
    <section className="catalog-slider">
      <div className="container">
        <div className="catalog-slider__header">
          <div className="catalog-slider__title">{props.genreTitle}</div>
          {slidesList.length > slidesCount && (
            <button
              className="catalog-slider__see-all"
              onClick={() =>
                showModalList(props.category, props.genreId, props.genreTitle)
              }
            >
              Смотреть все
            </button>
          )}
        </div>
        <div className="catalog-slider__slider">
          {slidesList.length >= 1 ? (
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
                <ul
                  className="images"
                  style={{ marginLeft: position }}
                  ref={sliderRef}
                >
                  {slides}
                  {pageSize <= slidesList.length && (
                    <li className="see-all">
                      <button
                        onClick={() =>
                          showModalList(
                            props.category,
                            props.genreId,
                            props.genreTitle
                          )
                        }
                      >
                        Смотреть все
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}>
              Нет данных
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Slider;
