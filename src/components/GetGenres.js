import React from "react";
import { useFetch } from "./fetch";
import Spinner from "../components/Spinner";

export const GenresContext = React.createContext();

function GetGenres(props) {
  const currentСategory = props.category || "movies";
  const [error, genres] = useFetch("/genres?category=" + currentСategory);

  if (genres == null) return <Spinner />;
  if (error) return "Error";

  return <GenresContext.Provider value={{genres,currentСategory}}>{props.children}</GenresContext.Provider>;
}

export default GetGenres;
