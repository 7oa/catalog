import React, { useState, useRef, useEffect } from "react";
//import FilesList from "../components/FilesList";
//import WatchList from "../components/WatchList";
import { useFetch } from "../components/fetch";

import "../css/catalog-detail.scss";

function CatalogItem(props) {
  const [fullDescription, setFullDescription] = useState(false);
  const [openMoreImages, setOpenMoreImages] = useState(false);
  const [copyrightShow, setCopyrightShow] = useState(false);
  const itemId = props.id;
  const [error, catalogItem] = useFetch("/item?id=" + itemId);

  const copyrightRef = useRef(null);

  function handleClickOutside(e) {
    if (copyrightRef.current && !copyrightRef.current.contains(e.target)) {
      setCopyrightShow(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (catalogItem == null) return null;

  if (error) return null;

  const description = catalogItem.fields.reduce((result, item) => {
    return { ...result, [item.name]: item.value };
  }, []);

  let descriptionSmall;

  if (description.description && description.description.length > 500)
    descriptionSmall = description.description.substr(0, 500) + "...";

  const moreImages = catalogItem.screenshots;

  const lightboxImg = moreImages.map((img, index) => {
    return (
      <div
        className="lightbox__screenshot"
        key={index}
        onClick={e => e.stopPropagation()}
      >
        <img src={img.full} alt={index} />
      </div>
    );
  });

  const catalogItemGenres = catalogItem.genres;

  const generes = catalogItemGenres.map((genre, i) => (
    <span key={genre.title}>
      {genre.title}
      {i !== catalogItemGenres.length - 1 ? ", " : ""}
    </span>
  ));

  return (
    <div className="catalog-detail">
      {openMoreImages && (
        <React.Fragment>
          <div className="lightbox__overlay" />
          <div className="lightbox" onClick={() => setOpenMoreImages(false)}>
            <button
              className="lightbox__close"
              onClick={() => setOpenMoreImages(false)}
            />
            <div className="lightbox__wrapper">
              <div className="lightbox__screenshots">{lightboxImg}</div>
            </div>
          </div>
        </React.Fragment>
      )}
      <div className="container catalog-detail__container">
        <div className="catalog-detail__header">
          <button className="catalog-detail__btn-back" onClick={props.close} />
          <h1 className="catalog-detail__title">
            <span className="catalog-detail__title-ru">
              {description.title}
            </span>
            {description.original_name && description.title.length <= 70 && (
              <React.Fragment>
                <span className="catalog-detail__title-sep">/</span>
                <span className="catalog-detail__title-original">
                  {description.original_name}
                </span>
              </React.Fragment>
            )}
          </h1>
        </div>
        <div className="catalog-detail__content">
          <div className="catalog-detail__col1">
            <div className="catalog-detail__poster">
              <img
                src={catalogItem.poster_url}
                alt={description.original_name}
                onError={e => {
                  e.target.onerror = null;
                  e.target.style = "display:none";
                }}
              />
            </div>
            {moreImages.length > 0 && (
              <div className="catalog-detail__frames-link">
                <button onClick={() => setOpenMoreImages(true)}>
                  Скриншоты
                </button>
              </div>
            )}
          </div>
          <div className="catalog-detail__col2">
            <div>
              <div className="catalog-detail__info-table">
                {description.file_size && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Размер:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {description.file_size}
                    </div>
                  </div>
                )}
                {description.language && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Перевод:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {description.language}
                    </div>
                  </div>
                )}
                {description.video && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Качество:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {description.video}
                    </div>
                  </div>
                )}

                {description.duration && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Время:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {description.duration}
                    </div>
                  </div>
                )}
                {description.release_year && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">Год:</div>
                    <div className="catalog-detail__info-table-val">
                      {description.release_year}
                    </div>
                  </div>
                )}
                {description.countries && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Страна:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {description.countries}
                    </div>
                  </div>
                )}
                {description.countries && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Жанр:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {generes}
                    </div>
                  </div>
                )}
                {description.cast && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Состав:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {description.cast}
                    </div>
                  </div>
                )}
                {(description.imdb_rating || description.kp_rating) && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Рейтинг:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {description.imdb_rating &&
                        `IMDB: ${description.imdb_rating}; `}
                      {description.kp_rating &&
                        `Kinopoisk: ${description.kp_rating}`}
                    </div>
                  </div>
                )}

                {description.director && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Режиссер:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {description.director}
                    </div>
                  </div>
                )}

                {description.developers && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Разработчики:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {description.developers}
                    </div>
                  </div>
                )}
                {description.platform && (
                  <div className="catalog-detail__info-table-row">
                    <div className="catalog-detail__info-table-label">
                      Платформа:
                    </div>
                    <div className="catalog-detail__info-table-val">
                      {description.platform}
                    </div>
                  </div>
                )}
              </div>
              {description.description && (
                <React.Fragment>
                  <div className="catalog-detail__description-title">
                    Описание:
                  </div>
                  {descriptionSmall ? (
                    <div className="catalog-detail__description">
                      <div className="catalog-detail__description-text">
                        {fullDescription
                          ? description.description
                          : descriptionSmall}
                      </div>
                      {!fullDescription && (
                        <button
                          className="catalog-detail__read-more"
                          onClick={e => {
                            setFullDescription(true);
                            e.stopPropagation();
                          }}
                        >
                          Читать больше..
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="catalog-detail__description">
                      <div className="catalog-detail__description-text">
                        {description.description}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
          {/* <div className="catalog-detail__col3">
            <WatchList />
          </div> */}
        </div>
      </div>
      <div className="buttons-line">
        {catalogItem.category === "movies" ? (
          <React.Fragment>
            <button className="buttons-line__btn-blue">Скачать</button>
            <button className="buttons-line__btn-gray">Смотреть</button>
          </React.Fragment>
        ) : catalogItem.category === "serials" ? (
          <button className="buttons-line__btn-blue">Подписаться</button>
        ) : (
          <button className="buttons-line__btn-blue">Скачать</button>
        )}
        <div className="copyright">
          <button
            className={`copyright__link ${copyrightShow ? "selected" : ""}`}
            onClick={() => setCopyrightShow(true)}
          >
            Правообладателям
          </button>
          {copyrightShow && (
            <div className="copyright__info" ref={copyrightRef}>
              <button
                className="copyright__info-close"
                onClick={() => setCopyrightShow(false)}
              />
              <div className="copyright__info-title">
                MegiaGet не является источником данного контента
              </div>
              <div className="copyright__info-text">
                Оригинальный торрент-файл вы можете найти по адресу{" "}
                <a href={catalogItem.original_torrent}>
                  {catalogItem.original_torrent}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogItem;
