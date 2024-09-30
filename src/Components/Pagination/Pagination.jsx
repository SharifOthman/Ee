
import ReactPaginate from "react-paginate";
import "./Pagination.css";


export default function PaginatedItems({total,setPage }) {
 const pageCount = total / 6;

  return (
    <>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-end"                                    
        pageLinkClassName="pagination-tag-anchor mx-2  text-secondary  rounded-circle"
        activeLinkClassName="text-white pagination"
        nextLinkClassName="pagination-next"
        previousLinkClassName="pagination-previous" 
      />
    </>
  );
}
