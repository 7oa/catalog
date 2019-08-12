import React, { useState } from "react";
import "../css/watch-list.scss";
import { PlayIcon } from "../components/Icons";

function WatchList() {
  const [sortDesc, setSortDesc] = useState(true);
  return (
    <div className="watch-list">
      <div className="watch-list__header">
        <div className="watch-list__select-wrapper">
          <div className="watch-list__select">
            <select name="season" id="" className="select">
              <option value="1">1 сезон</option>
              <option value="2">2 сезон</option>
              <option value="3">3 сезон</option>
              <option value="4">4 сезон</option>
            </select>
          </div>
          <div className="watch-list__select">
            <select name="translate" id="" className="select">
              <option value="1">Amedia TV</option>
              <option value="2">Other</option>
            </select>
          </div>
        </div>
        <button
          className={`watch-list__sort ${sortDesc ? "desc" : "asc"}`}
          onClick={() => setSortDesc(!sortDesc)}
        />
      </div>
      <div className="series-list">
        <div className="series-item">
          <div className="series-item__title">
            1. Благодетельный отец Фрэнк Благодетельный отец Фрэнк
          </div>
          <div className="series-item__date">( 15.05.2011 )</div>
          <button className="series-item__play">
            <PlayIcon />
          </button>
        </div>
        <div className="series-item">
          <div className="series-item__title">
            2. Благодетельный отец
          </div>
          <div className="series-item__date">( 15.05.2011 )</div>
          <button className="series-item__play">
            <PlayIcon />
          </button>
        </div>
        <div className="series-item">
          <div className="series-item__title">
            3. Благодетельный отец Фрэнк
          </div>
          <div className="series-item__date">( 15.05.2011 )</div>
          <button className="series-item__play">
            <PlayIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WatchList;
