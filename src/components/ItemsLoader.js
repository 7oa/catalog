import React from "react";
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

const ItemsLoader = ({ count }) => {
  return (
    <div className="container">
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
  );
};

export default ItemsLoader;
