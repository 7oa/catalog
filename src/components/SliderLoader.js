import React, { useState, useEffect, useRef } from "react";
import ContentLoader from "react-content-loader";

const LoaderItem = () => {
  return (
    <ContentLoader
      height={264}
      width={145}
      speed={3}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="4" ry="4" width="145" height="215" />
      <rect x="0" y="230" rx="4" ry="4" width="120" height="16" />
      <rect x="0" y="248" rx="4" ry="4" width="100" height="16" />
    </ContentLoader>
  );
};

const SlidersTitle = () => (
  <ContentLoader
    height={19}
    width={100}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="4" ry="4" width="100" height="19" />
  </ContentLoader>
);

const SliderLoader = () => {
  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.offsetWidth
  );
  const sliderRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const slidesCount = parseInt((carouselWidth + 20) / 165);

  const handleResize = e => {
    setWindowWidth(document.documentElement.offsetWidth);
  };

  useEffect(() => {
    setCarouselWidth(sliderRef.current.clientWidth);
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <section className="catalog-slider" ref={sliderRef}>
      <div className="container">
        <div className="catalog-slider__loader-title">
          <SlidersTitle />
        </div>

        <div className="catalog-slider__loader">
          {[...Array(slidesCount)].map((_, i) => (
            <LoaderItem key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SliderLoader;
