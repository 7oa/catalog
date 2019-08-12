import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../components/Spinner";
import NavPanel from "../components/NavPanel";
import CatalogSlider from "../components/CatalogSlider";
import { DataCarousel } from "../components/fetch";
import { GenresContext } from "../components/GetGenres";

const Carousel = ({ genre, currentСategory }) => {
  return (
    <DataCarousel genre={genre.id} category={currentСategory}>
      {(error, data) => {
        return (
          <CatalogSlider
            error={error}
            data={data}
            genreTitle={genre.title}
            genreId={genre.id}
            category={currentСategory}
          />
        );
      }}
    </DataCarousel>
  );
};

function Catalog() {
  const ctx = useContext(GenresContext);
  const { genres, currentСategory } = ctx;

  let data = genres.map(genre => (
    <Carousel genre={genre} currentСategory={currentСategory} key={genre.id} />
  ));

  const [state, setState] = React.useState({
    items: data.slice(0, 3),
    hasMore: true
  });

  const loadItems = React.useCallback(p => {
    setState(() => ({
      items: data.slice(0, p * 2 + 2),
      hasMore: p * 2 < data.length
    }));
  }, []);

  return (
    <React.Fragment>
      <NavPanel view="menu" />
      <main>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadItems}
          hasMore={state.hasMore}
          loader={<Spinner key="0" />}
        >
          {state.items}
        </InfiniteScroll>
      </main>
    </React.Fragment>
  );
}

export default Catalog;
