import React, { useContext } from "react";
import { AppContext } from "../App";

import { DownloadIcon, PlayIcon } from "./Icons";
import "../css/catalog-category.scss";

function CatalogCategory({ data }) {
  const { showModal } = useContext(AppContext);
  const items = data.map(item => {
    return (
      <div
        className="catalog-item"
        key={item.id}
        onClick={() => showModal(item.id)}
      >
        <div className="catalog-item__wrapper">
          <div className="catalog-item__img">
            <img
              src={item.poster_url}
              alt={item.title}
              onError={e => {
                e.target.onerror = null;
                e.target.style = "display:none";
              }}
            />
            <div className="catalog-item__info">
              <div className="catalog-item__info-rate">IMDb 8.3 | КП 8.1</div>
              <div className="catalog-item__info-buttons">
                <div>
                  <button className="catalog-item__btn-round">
                    <DownloadIcon />
                  </button>
                  <button className="catalog-item__btn-round play">
                    <PlayIcon />
                  </button>
                </div>
                {/* <button className="catalog-item__btn-gray">Подписаться</button> */}
              </div>
            </div>
          </div>
          <div className="catalog-item__title">{item.title}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="catalog-category">
        <div className="catalog-category__list">{items}</div>
      </div>
    </div>
  );
}

export default CatalogCategory;
