import React, { useState, useMemo, useEffect } from "react";
import NavPanel from "../components/NavPanel";
import CatalogCategory from "../components/CatalogCategory";
import Pagination from "../components/Pagination";
import GetGenres from "../components/GetGenres";
import { DataCatalog } from "../components/fetch";

function CatalogList(props) {
  const [page, setPage] = useState(0);
  const { category, genre } = props.match.params;

  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.offsetWidth
  );

  const pageSize = parseInt((windowWidth - 20) / 155) * 10;

  useEffect(() => {
    setWindowWidth(document.documentElement.offsetWidth);
  }, []);

  const header = useMemo(
    () => (
      <GetGenres category={category}>
        <NavPanel view="link" {...props} />
      </GetGenres>
    ),
    [category]
  );

  const handlePage = page => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page);
  };

  return (
    <React.Fragment>
      {header}
      <main>
        <DataCatalog
          category={category}
          genre={genre}
          page={page}
          pageSize={pageSize}
        >
          {(error, data, pagination) => {
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
      </main>
    </React.Fragment>
  );
}

export default CatalogList;
