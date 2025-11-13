"use client";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  updateCurrentPage: (page: number) => void;
}
export default function Pagination({
  totalPages,
  currentPage,
  updateCurrentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      previousLabel="←"
      breakLabel="..."
      nextLabel="→"
      onPageChange={({ selected }) => updateCurrentPage(selected + 1)}
      pageRangeDisplayed={2}
      pageCount={totalPages}
      marginPagesDisplayed={1}
      renderOnZeroPageCount={null}
      containerClassName={css.pagination}
      activeClassName={css.active}
      forcePage={currentPage - 1}
    />
  );
}
