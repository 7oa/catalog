import React from "react";
import NavPanel from "../components/NavPanel";
import CatalogCategory from "../components/CatalogCategory";
import GetGenres from "../components/GetGenres";

function CatalogList(props) {
  return (
    <React.Fragment>
      <GetGenres category={props.match.params.category}><NavPanel view="link" {...props} /></GetGenres>
      <main>
        <CatalogCategory {...props.match.params} />
      </main>
    </React.Fragment>
  );
}

export default CatalogList;
