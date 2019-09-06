import React, { useState, useEffect, useCallback, useRef } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Spinner from "./components/Spinner";
import ScrollToTop from "./components/ScrollToTop";
import Catalog from "./pages/Catalog";
import CatalogList from "./pages/CatalogList";
import CatalogDetail from "./pages/CatalogDetail";
import { fetch } from "./components/fetch";
import GetGenres from "./components/GetGenres";
import QTAPI from "./components/QTAPI";
import ErrorBoundary from "./components/ErrorBoundary";

export const AppContext = React.createContext();

function App() {
  const modalDetailRef = useRef(null),
    modalListRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [modalDetail, setModalDetail] = useState({
    show: false,
    detailId: null
  });

  const [modalList, setModalList] = useState({
    show: false,
    category: null,
    genre: null
  });

  const showModalDetail = id => {
    setModalDetail({
      show: true,
      detailId: id
    });
  };

  const showModalList = (category, genre, genreTitle) => {
    setModalList({
      show: true,
      category,
      genre,
      genreTitle
    });
  };

  const closeModalDetail = useCallback(() => {
    setModalDetail({
      show: false
    });
  }, []);

  const closeModalList = useCallback(() => {
    setModalList({
      show: false
    });
  }, []);

  const routes = categories.map(item => {
    return (
      <Route
        key={item.id}
        exact
        path={`/${item.code}`}
        render={() => (
          <GetGenres category={item.code} spinner={true}>
            <Catalog />
          </GetGenres>
        )}
      />
    );
  });

  useEffect(() => {
    fetch({ url: "/categories" }).then(data => {
      if (data.status === "OK") {
        const categories = data.payload.filter(
          category => !["other", "books", "music"].includes(category.code)
        );
        setCategories(categories);
      }
    });
  }, []);

  useEffect(() => {
    if (modalDetailRef.current) {
      modalDetailRef.current.classList.toggle("open");
    }
  }, [modalDetail.show]);

  useEffect(() => {
    if (modalListRef.current) {
      modalListRef.current.classList.toggle("open");
    }
  }, [modalList.show]);

  useEffect(() => {
    if (modalDetail.show || modalList.show)
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [modalDetail.show, modalList.show]);

  if (categories && categories.length < 1) return <Spinner />;

  return (
    <ErrorBoundary>
      <QTAPI>
        <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
          <ScrollToTop>
            <AppContext.Provider
              value={{ categories, showModalDetail, showModalList }}
            >
              <div className={`${modalDetail.show ? "fixed " : ""}app`}>
                <div className="content">
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/movies" />}
                  />
                  {routes}
                  {/* <Route
                    path="/:category/genre-:genre"
                    component={CatalogList}
                  /> */}
                </div>
                {modalList.show && (
                  <div className="modal" ref={modalListRef}>
                    <CatalogList
                      category={modalList.category}
                      genre={modalList.genre}
                      genreTitle={modalList.genreTitle}
                      close={closeModalList}
                    />
                  </div>
                )}
                {modalDetail.show && (
                  <div className="modal" ref={modalDetailRef}>
                    <CatalogDetail
                      id={modalDetail.detailId}
                      close={closeModalDetail}
                    />
                  </div>
                )}
              </div>
            </AppContext.Provider>
          </ScrollToTop>
        </BrowserRouter>
      </QTAPI>
    </ErrorBoundary>
  );
}

export default App;
