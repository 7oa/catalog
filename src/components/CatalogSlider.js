import React, { useContext } from "react";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

import { DownloadIcon, PlayIcon } from "./Icons";
import "../css/catalog-slider.scss";

const CatalogSlider = props => {
  const { showModal } = useContext(AppContext);

  const { error, data, genreTitle, genreId, category } = props;

  if (error) return "Error";

  const items = data.map(item => {
    let description = item.description;
    if (description && description.length > 100)
      description = description.substr(0, 100) + "...";

    return (
      <div className="catalog-slider-item" key={item.id}>
        <div
          className="catalog-slider-item__wrapper"
          onClick={() => showModal(item.id)}
        >
          <div className="catalog-slider-item__img">
            <img
              data-src={item.poster_url}
              alt={item.title}
              onError={e => {
                e.target.onerror = null;
                e.target.style = "display:none";
              }}
            />
            <div className="catalog-slider-item__info">
              <div className="catalog-slider-item__info-rate">
                IMDb 8.3 | КП 8.1
              </div>
              <div className="catalog-slider-item__info-buttons">
                <div>
                  <button className="catalog-slider-item__btn-round">
                    <DownloadIcon />
                  </button>
                  <button className="catalog-slider-item__btn-round play">
                    <PlayIcon />
                  </button>
                </div>
                <button className="catalog-slider-item__btn-gray">
                  Подписаться
                </button>
              </div>
            </div>
          </div>
          <div className="catalog-slider-item__title">{item.title}</div>
          <div className="catalog-slider-item__subtitle">2018</div>
        </div>
      </div>
    );
  });

  return (
    <section className="catalog-slider">
      <div className="container">
        <div className="catalog-slider__header">
          <div className="catalog-slider__title">{genreTitle}</div>
          {data.length >= 1 && (
            <Link
              className="catalog-slider__see-all"
              to={`/${category}/genre-${genreId}`}
            >
              Смотреть все
            </Link>
          )}
        </div>
        <div className="catalog-slider__slider">
          {data.length >= 1 ? (
            <Slider>{items}</Slider>
          ) : (
            <div style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}>
              Нет данных
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogSlider;
