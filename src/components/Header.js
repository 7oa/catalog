import React from "react";
import { NavLink } from "react-router-dom";
import "../css/header.scss";

const Header = () => (
  <header className="header">
    <div className="container header__container">
      <nav className="big-menu">
        <NavLink
          to="/"
          className="big-menu__link"
          activeClassName="selected"
          exact={true}
        >
          Видео
        </NavLink>
        <NavLink
          to="/downloads"
          className="big-menu__link"
          activeClassName="selected"
        >
          Загрузки
        </NavLink>
        <NavLink
          to="/player"
          className="big-menu__link"
          activeClassName="selected"
        >
          Плеер
        </NavLink>
      </nav>

      <div className="header__right-bar">
        <form action="" className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Введите запрос"
          />
        </form>
        <button
          className="user-pic"
          style={{
            backgroundImage:
              "url(https://blacksaildivision.com/wp-content/uploads/2015/03/centos-users-and-groups-624x390.jpg)"
          }}
        />
      </div>
    </div>
  </header>
);

export default Header;
