import React from "react";
import { useFetch } from "./fetch";
import Spinner from "../components/Spinner";

export const GenresContext = React.createContext();

function GetGenres(props) {
  const currentСategory = props.category || "movies";
  const [error, genresList] = useFetch("/genres?category=" + currentСategory);

  if (genresList == null) return props.spinner ? <Spinner /> : null;
  if (error) return "Error";

  const genres = genresList.filter(genre => ![188, 190].includes(genre.id));

  return (
    <GenresContext.Provider value={{ genres, currentСategory }}>
      {props.children}
    </GenresContext.Provider>
  );
}

export default GetGenres;
