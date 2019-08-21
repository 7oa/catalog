import React, { useState, useEffect, useCallback, useRef } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Spinner from "./components/Spinner";
import ScrollToTop from "./components/ScrollToTop";
import Catalog from "./pages/Catalog";
import CatalogList from "./pages/CatalogList";
import CatalogDetail from "./pages/CatalogDetail";
import { fetch } from "./components/fetch";
import GetGenres from "./components/GetGenres";

export const AppContext = React.createContext();

function App() {
  const modalRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState({
    show: false,
    detailId: undefined
  });

  const showModal = id => {
    document.body.style.overflow = "hidden";
    setModal({
      show: true,
      detailId: id
    });
  };

  const closeModal = useCallback(() => {
    document.body.style.overflow = "unset";
    setModal({
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
        setCategories(data.payload);
      }
    });
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.toggle("open");
    }
  }, [modal.show]);

  if (categories && categories.length < 1) return <Spinner />;

  return (
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
      <ScrollToTop>
        <AppContext.Provider value={{ categories, showModal }}>
          <div className={`${modal.show ? "fixed " : ""}app`}>
            <div className="content">
              <Route
                exact
                path="/"
                render={() => (
                  <GetGenres>
                    <Catalog />
                  </GetGenres>
                )}
              />
              {routes}
              <Route path="/:category/genre-:genre" component={CatalogList} />
            </div>
            {modal.show && (
              <div className="modal" ref={modalRef}>
                <CatalogDetail id={modal.detailId} close={closeModal} />
              </div>
            )}
          </div>
        </AppContext.Provider>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
