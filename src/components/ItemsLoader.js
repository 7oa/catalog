import React from "react";
import ContentLoader from "react-content-loader";

const LoaderItem = () => {
  return (
    <ContentLoader
      height={249}
      width={125}
      speed={3}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="4" ry="4" width="160" height="200" />
      <rect x="0" y="215" rx="4" ry="4" width="120" height="16" />
      <rect x="0" y="233" rx="4" ry="4" width="100" height="16" />
    </ContentLoader>
  );
};

const ItemsLoader = ({ count }) => {
  return (
    <div className="container">
      <div className="catalog-category">
        <div className="catalog-category__list">
          {[...Array(count)].map((_, i) => (
            <div className="catalog-item" key={i}>
              <div className="catalog-item__wrapper">
                <LoaderItem key={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsLoader;
