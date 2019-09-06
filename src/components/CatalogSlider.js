import React from "react";
import Slider from "../components/Slider";
import CatalogItem from "../components/CatalogItem";
import "../css/catalog-slider.scss";

const CatalogSlider = props => {
  const { error, data, genreTitle, genreId, category, pageSize } = props;

  const items = data.map(item => {
    return <CatalogItem item={item} slider={true} key={item.id} />;
  });

  if (error) return "Error";

  return (
    <Slider
      genreTitle={genreTitle}
      genreId={genreId}
      category={category}
      pageSize={pageSize}
    >
      {items}
    </Slider>
  );
};

export default CatalogSlider;
