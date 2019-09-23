import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo
} from "react";
import FilesList from "../components/FilesList";
//import WatchList from "../components/WatchList";
import { useFetch } from "../components/fetch";
import { QTContext } from "../components/QTAPI";
import Spinner from "../components/Spinner";

import "../css/catalog-detail.scss";

function CatalogItem(props) {
  const [loading, setLoading] = useState(true);
  const [fullDescription, setFullDescription] = useState(true);
  const [openMoreImages, setOpenMoreImages] = useState(false);
  const [copyrightShow, setCopyrightShow] = useState(false);
  const [selectedTorrents, setSelectedTorrents] = useState([]);
  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.offsetWidth
  );
  //const [wideScreen, setWideScreen] = useState(false);
  const itemId = props.id;
  const [error, catalogItem] = useFetch("/item?id=" + itemId);

  const copyrightRef = useRef(null);
  const descriptionWrapperRef = useRef(null);
  const descriptionContentRef = useRef(null);
  const filesRef = useRef(null);
  const infoRef = useRef(null);

  const wideScreen = useMemo(() => windowWidth > 1200, [windowWidth]);

  const handleClickOutside = e => {
    if (copyrightRef.current && !copyrightRef.current.contains(e.target)) {
      setCopyrightShow(false);
    }
  };

  const handleResize = () => {
    setWindowWidth(document.documentElement.offsetWidth);
  };

  const addTorrents = files => setSelectedTorrents(files);

  useEffect(() => {
    if (wideScreen) setFullDescription(true);
    if (
      !wideScreen &&
      descriptionContentRef.current != null &&
      descriptionWrapperRef.current != null
    ) {
      if (
        descriptionWrapperRef.current.offsetHeight <
        descriptionContentRef.current.offsetHeight
      )
        setFullDescription(false);
    }
  }, [catalogItem, wideScreen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (catalogItem != null) setTimeout(() => setLoading(false), 200);
    else setLoading(true);
  }, [catalogItem]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (openMoreImages)
      document.querySelector(".modal").style.overflow = "hidden";
    else document.querySelector(".modal").style.overflow = "";
  }, [openMoreImages]);

  const mGetApi = useContext(QTContext);

  const handleClick = useCallback(
    play => {
      catalogItem.checked = selectedTorrents;
      mGetApi.loadCatalogTorrent(JSON.stringify(catalogItem), play);
    },
    [mGetApi, catalogItem, selectedTorrents]
  );

  if (catalogItem == null) return <Spinner />;

  if (error) return null;

  const description = catalogItem.fields.reduce((result, item) => {
    return { ...result, [item.name]: item.value };
  }, []);

  const moreImages = catalogItem.screenshots;

  let screenshotMaxWidth = "45%";
  let screenshotMaxHeight = "45vh";
  let screenshots = [];

  if (moreImages.length > 6) screenshots = moreImages.slice(0, 6);
  else screenshots = moreImages;

  switch (screenshots.length) {
    default:
    case 1:
    case 2:
      screenshotMaxHeight = "90vh";
      break;
    case 3:
    case 4:
      screenshotMaxWidth = "45%";
      screenshotMaxHeight = "45vh";
      break;
    case 5:
    case 6:
      screenshotMaxWidth = "30%";
      screenshotMaxHeight = "45vh";
      break;
  }

  const lightboxImg = screenshots.map((img, index) => {
    return (
      <img
        style={{ maxWidth: screenshotMaxWidth, maxHeight: screenshotMaxHeight }}
        className="lightbox__screenshot"
        key={index}
        onClick={e => e.stopPropagation()}
        src={img.full}
        alt={index}
      />
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
    <div className={`catalog-detail${loading ? " loading" : ""}`}>
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
          <div className="catalog-detail__col2" ref={descriptionWrapperRef}>
            <div
              className="catalog-detail__info-wrapper"
              ref={descriptionContentRef}
            >
              <div className="catalog-detail__info" ref={infoRef}>
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

                  {fullDescription && (
                    <React.Fragment>
                      {description.release_year && (
                        <div className="catalog-detail__info-table-row">
                          <div className="catalog-detail__info-table-label">
                            Год:
                          </div>
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
                    </React.Fragment>
                  )}
                </div>
                {fullDescription && description.description && (
                  <React.Fragment>
                    <div className="catalog-detail__description-title">
                      Описание:
                    </div>

                    <div className="catalog-detail__description">
                      <div className="catalog-detail__description-text">
                        {description.description}
                      </div>
                    </div>
                  </React.Fragment>
                )}
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
              {catalogItem.content && catalogItem.content.length > 0 && (
                <div className="catalog-detail__files" ref={filesRef}>
                  <FilesList
                    data={catalogItem.content}
                    addTorrents={addTorrents}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="buttons-line">
        {catalogItem.category === "movies" ? (
          <React.Fragment>
            <button
              className="buttons-line__btn-blue"
              onClick={() => handleClick(false)}
            >
              Скачать
            </button>
            <button
              className="buttons-line__btn-gray"
              onClick={() => handleClick(true)}
            >
              Смотреть
            </button>
          </React.Fragment>
        ) : catalogItem.category === "serials" ? (
          <button className="buttons-line__btn-blue">Подписаться</button>
        ) : (
          <button
            className="buttons-line__btn-blue"
            onClick={() => handleClick(false)}
          >
            Скачать
          </button>
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
