import React from "react";
import CatalogItem from "../components/CatalogItem";

function CatalogCategory({ data }) {
  const items = data.map(item => {
    return <CatalogItem item={item} key={item.id} />;
  });

  return (
    <div className="container">
      <div className="catalog-category__list">{items}</div>
    </div>
  );
}

export default CatalogCategory;
