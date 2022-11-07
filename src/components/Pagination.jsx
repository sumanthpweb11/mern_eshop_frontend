import React from "react";
import { Link } from "react-router-dom";
import { CgArrowLeftR, CgArrowRightR } from "react-icons/cg";

const Pagination = ({ count, perPage, page, path, theme }) => {
  // console.log(typeof page);

  const totalLinks = Math.ceil(count / perPage);
  console.log(totalLinks, "totlalinks"); // 3
  let startLoop = page; // 1

  let diff = totalLinks - page; // 3-1 = 2

  if (diff <= 3) {
    startLoop = totalLinks - 3;
  }

  let endLoop = startLoop + 3;

  if (startLoop <= 0) {
    startLoop = 1;
  }

  const links = () => {
    const allLinks = [];
    for (let i = startLoop; i <= endLoop; i++) {
      allLinks.push(
        <li key={i} className="pagination-li">
          <Link
            className={`${
              theme === "light" ? "pagination-link-light" : " pagination-link"
            }  ${page === i && "bg-indigo-500 text-white"}`}
            to={`/${path}/${i}`}
          >
            {i}
          </Link>
        </li>
      );
    }
    return allLinks;
  };

  const next = () => {
    if (page < totalLinks) {
      return (
        <li className="pagination-li">
          <Link
            className={`${
              theme === "light" ? "pagination-link-light" : "pagination-link"
            }`}
            to={`/${path}/${page + 1}`}
          >
            <CgArrowRightR />
          </Link>
        </li>
      );
    }
  };

  const prev = () => {
    if (page > 1) {
      return (
        <li className="pagination-li">
          <Link
            className={`${
              theme === "light" ? "pagination-link-light" : "pagination-link"
            }`}
            to={`/${path}/${page - 1}`}
          >
            <CgArrowLeftR />
          </Link>
        </li>
      );
    }
  };

  return (
    count > perPage && (
      <ul className="flex mt-2 ">
        {prev()}
        {links()}
        {next()}
      </ul>
    )
  );
};

export default Pagination;
