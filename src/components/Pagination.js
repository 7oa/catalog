import React from "react";
import "../css/pagination.scss";

const Pagination = ({ page, pageCount, handlePage }) => {
  const delta = 2,
    left = page - delta,
    right = page + delta + 1;
  let range = [],
    rangeWithDots = [],
    l;

  range.push(1);
  for (let i = page - delta; i <= page + delta; i++) {
    if (i >= left && i < right && i < pageCount && i > 1) {
      range.push(i);
    }
  }
  range.push(pageCount);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  const pagesList = rangeWithDots.map((item, i) => {
    if (item !== "...") {
      return (
        <div
          className={`${item - 1 === page ? "active " : ""}pagination__page`}
          key={i}
          onClick={() => handlePage(item - 1)}
        >
          {item}
        </div>
      );
    } else
      return (
        <div className="pagination__page" key={i}>
          {item}
        </div>
      );
  });

  return (
    <div className="pagination">
      {page > 0 && (
        <div
          onClick={() => handlePage(page - 1)}
          className="pagination__prev"
        />
      )}
      {pagesList}
      {page + 1 < pageCount && (
        <div
          onClick={() => handlePage(page + 1)}
          className="pagination__next"
        />
      )}
    </div>
  );
};

export default Pagination;
