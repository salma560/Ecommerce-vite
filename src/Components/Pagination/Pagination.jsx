import ReactPaginate from "react-paginate";

export default function Pagination({ pageCount, onPageChange, currentPage }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="▶"
      previousLabel="◀"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      containerClassName="flex justify-center items-center gap-2 mt-8"
      pageClassName="border px-3 py-1 rounded-md hover:bg-gray-100"
      activeClassName="bg-blue-600 text-white"
      previousClassName="px-3 py-1 border rounded-md"
      nextClassName="px-3 py-1 border rounded-md"
      breakClassName="px-3 py-1"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
}
