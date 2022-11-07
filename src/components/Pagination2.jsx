import React from "react";
import { Link } from "react-router-dom";
import { CgArrowLeftR, CgArrowRightR, CgHello } from "react-icons/cg";
import { useGetQuery } from "../store/services/categoryService";

const Pagination2 = ({ count, perPage, page, path }) => {
  const { data = [], isFetching } = useGetQuery(page);

  const pages = new Array(count).fill(null).map((v, i) => i + 1);
  console.log(pages);

  const links = () => {
    return pages.map((pageIndex, i) => {
      return (
        <ul>
          <li key={i}>
            <Link
              className="pagination-link bg-gray-500 text-gray-900"
              to={`/${path}/${i + 1}`}
            >
              {pageIndex}
            </Link>
          </li>
        </ul>
      );
    });
  };

  const next = () => {
    return (
      <li>
        <Link className="pagination-link" to={`/${path}/${page + 1}`}>
          <CgArrowRightR />
        </Link>
      </li>
    );
  };

  const prev = () => {
    if (page > 1) {
      return (
        <li>
          <Link className="pagination-link" to={`/${path}/${page - 1}`}>
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

export default Pagination2;
