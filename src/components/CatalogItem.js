import React, { useContext, useState, useCallback } from "react";
import { AppContext } from "../App";
import { QTContext } from "../components/QTAPI";
import "../css/catalog-item.scss";

import {
  DownloadIcon,
  PlayIcon,
  SubscribeIcon,
  SubscribeActiveIcon
} from "./Icons";

const CatalogItem = ({ item, slider = false }) => {
  const { showModalDetail } = useContext(AppContext);
  const mGetApi = useContext(QTContext);
  const [subscribe, setSubscribe] = useState(false);
  const canSubscribe = false;

  const handleSubscribe = e => {
    setSubscribe(!subscribe);
    e.stopPropagation();
  };

  const handleClick = useCallback(
    (e, play) => {
      mGetApi.loadCatalogTorrent(JSON.stringify(item), play);
      e.stopPropagation();
    },
    [mGetApi, item]
  );

  const showDetail = () => showModalDetail(item.id);

  return (
    <div className="catalog-item" key={item.id}>
      <div
        className={`${
          slider ? "catalog-item__wrapper_slider " : ""
        }catalog-item__wrapper `}
        onClick={showDetail}
      >
        <div className="catalog-item__img">
          {slider ? (
            <img
              data-src={item.poster_url}
              alt={item.title}
              onError={e => {
                e.target.onerror = null;
                e.target.style = "display:none";
              }}
            />
          ) : (
            <img
              src={item.poster_url}
              alt={item.title}
              onError={e => {
                e.target.onerror = null;
                e.target.style = "display:none";
              }}
            />
          )}
          <div className="catalog-item__info">
            <div className="catalog-item__info-top">
              <div>
                {canSubscribe && (
                  <button
                    className={`${
                      subscribe ? "active " : ""
                    }catalog-item__subscribe`}
                    onClick={handleSubscribe}
                  >
                    {subscribe ? <SubscribeActiveIcon /> : <SubscribeIcon />}
                  </button>
                )}
              </div>
              {/* <div className="catalog-item__info-rate">
                <div>IMDb 8.3</div>
                <div>КП 8.1</div>
              </div> */}
            </div>
            <div className="catalog-item__info-bottom">
              <div className="catalog-item__year">
                {item.year > 0 && item.year}
              </div>
              <div className="catalog-item__size">{item.file_size}</div>
            </div>
            {item.category === "movies" ? (
              <React.Fragment>
                <button
                  className="catalog-item__btn-round play"
                  onClick={e => handleClick(e, true)}
                >
                  <PlayIcon />
                </button>
                <button
                  className="catalog-item__btn-round download"
                  onClick={e => handleClick(e, false)}
                >
                  <DownloadIcon />
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button
                  className="catalog-item__btn-round download one"
                  onClick={e => handleClick(e, false)}
                >
                  <DownloadIcon />
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="catalog-item__title">{item.title}</div>
      </div>
    </div>
  );
};

export default CatalogItem;
