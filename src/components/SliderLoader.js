import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";

const LoaderItem = () => {
  return (
    <ContentLoader
      height={294}
      width={147}
      speed={3}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="4" ry="4" width="160" height="220" />
      <rect x="0" y="235" rx="4" ry="4" width="120" height="16" />
      <rect x="0" y="253" rx="4" ry="4" width="100" height="16" />
      <rect x="0" y="278" rx="4" ry="4" width="50" height="14" />
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

  const handleResize = e => {
    setWindowWidth(document.documentElement.offsetWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const slidesCount = parseInt((windowWidth - 60) / 187);

  return (
    <section className="catalog-slider">
      <div className="container">
        <div className="catalog-slider__loader-title">
          <SlidersTitle />
        </div>

        <div className="catalog-slider__loader">
          {[...Array(slidesCount)].map((e, i) => (
            <LoaderItem key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SliderLoader;
