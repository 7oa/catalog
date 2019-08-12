import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Spinner from "./components/Spinner";
import Catalog from "./pages/Catalog";
import Downloads from "./pages/Downloads";
import Player from "./pages/Player";
import CatalogList from "./pages/CatalogList";
import CatalogDetail from "./pages/CatalogDetail";
import { fetch } from "./components/fetch";
import GetGenres from "./components/GetGenres";

export const AppContext = React.createContext();

function App() {
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
          <GetGenres category={item.code}>
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

  if (categories && categories.length < 1) return <Spinner />;

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ categories, showModal }}>
        <div className={modal.show ? "app fixed" : "app"}>
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
            <Route path="/downloads" component={Downloads} />
            <Route path="/player" component={Player} />
            {routes}
            <Route path="/:category/genre-:genre" component={CatalogList} />
          </div>
          {modal.show && (
            <div className="modal">
              <CatalogDetail id={modal.detailId} close={closeModal} />
            </div>
          )}
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
