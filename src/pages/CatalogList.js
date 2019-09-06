import React, { useState, useEffect } from "react";
import CatalogCategory from "../components/CatalogCategory";
import Pagination from "../components/Pagination";
import { DataCatalog } from "../components/fetch";
import "../css/catalog-category.scss";

function CatalogList(props) {
  const [page, setPage] = useState(0);
  const { category, genre, genreTitle, close } = props;

  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.offsetWidth
  );

  const pageSize = parseInt((windowWidth - 20) / 165) * 3;

  useEffect(() => {
    setWindowWidth(document.documentElement.offsetWidth);
  }, []);

  const handlePage = page => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    document
      .querySelector(".catalog-category")
      .scrollTo({ top: 0, behavior: "smooth" });
    setPage(page);
  };

  return (
    <React.Fragment>
      <div className="nav-panel">
        <div className="container">
          <div className="nav-panel__subline">
            <div className="link-back">
              <button className="link-back__btn-back" onClick={close} />
              <div className="link-back__title">{genreTitle}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="catalog-category">
        <DataCatalog
          category={category}
          genre={genre}
          page={page}
          pageSize={pageSize}
        >
          {(error, data, pagination) => {
            if (data.length < 1)
              return (
                <div
                  style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
                >
                  Нет данных
                </div>
              );
            return (
              <>
                <CatalogCategory data={data} />
                <div className="pagination container">
                  {pagination && pagination.page_count > 1 && (
                    <Pagination
                      page={pagination.page}
                      pageCount={pagination.page_count}
                      handlePage={handlePage}
                    />
                  )}
                </div>
              </>
            );
          }}
        </DataCatalog>
      </div>
    </React.Fragment>
  );
}

export default CatalogList;
