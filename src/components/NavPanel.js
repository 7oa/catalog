import React, { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import "../css/nav-panel.scss";
import { AppContext } from "../App";
import { GenresContext } from "../components/GetGenres";

const NavPanel = ({ view, ...props }) => {
  let currentGenre = { title: "" };
  let menu = "";
  if (view === "link") {
    const { genres } = useContext(GenresContext);
    currentGenre = genres.find(
      genre => parseInt(genre.id) === parseInt(props.match.params.genre)
    );
  }
  if (view === "menu") {
    const { categories } = useContext(AppContext);

    menu = useMemo(() => {
      return categories.map(category => {
        return (
          <NavLink
            to={`/${category.code}`}
            key={category.id}
            className="submenu__link"
            activeClassName="selected"
          >
            {category.title}
          </NavLink>
        );
      });
    }, [categories]);
  }

  return (
    <div className="nav-panel">
      <div className="container">
        <div className="nav-panel__subline">
          {view === "menu" && <nav className="submenu">{menu}</nav>}
          {view === "link" && (
            <div className="link-back">
              <button
                className="link-back__btn-back"
                onClick={() => props.history.goBack()}
              />
              <div className="link-back__title">{currentGenre.title}</div>
            </div>
          )}
          {/* <div className="nav-panel__filters">
            <button className="sort-icon-Az">
              <span>A</span>
              <span>z</span>
            </button>
            <button className="filter-icon" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NavPanel;
