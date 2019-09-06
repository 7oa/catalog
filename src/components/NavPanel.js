import React, { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import "../css/nav-panel.scss";
import { AppContext } from "../App";

const NavPanel = () => {
  const { categories } = useContext(AppContext);

  const menu = useMemo(() => {
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

  return (
    <div className="nav-panel">
      <div className="container">
        <div className="nav-panel__subline">
          <nav className="submenu">{menu}</nav>
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
