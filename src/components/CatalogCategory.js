import React, { useContext } from "react";
import { useFetch } from "../components/fetch";
import { AppContext } from "../App";

import { DownloadIcon, PlayIcon } from "./Icons";
import "../css/catalog-category.scss";

function CatalogCategory(props) {
  const { showModal } = useContext(AppContext);
  const [error, catalogItem] = useFetch(
    `/items?category=${props.category}&genre=${props.genre}`
  );
    
  if (error || catalogItem == null) return null;

  const items = catalogItem.map(item => {
    let description = item.description;
    if (description && description.length > 150)
      description = description.substr(0, 150) + "...";

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
                <button className="catalog-item__btn-gray">Подписаться</button>
              </div>
            </div>
          </div>
          <div className="catalog-item__title">{item.title}</div>
          <div className="catalog-item__subtitle">2018</div>
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
