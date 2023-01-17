import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import API from "../../api";

function Paginate({
  currentPage,
  setCurrPage,
  productsPerPage,
  pages,
  setPages,
}) {
  const api = new API();

  const [totalProducts, setTotal] = useState(0);

  // const [renderPages, setRenderPages] = useState([])
  const renderPages = [];
  let active = 1;

  function renderingPages() {
    for (let i = 1; i <= pages; i++) {
      console.log("hice algo");
      const element = (
        <Pagination.Item
          key={i}
          active={active === i}
          id={`page-${i}`}
          onClick={handleChangePage}
        >
          {i}
        </Pagination.Item>
      );
      renderPages.push(element);
    }
  }

  function handleChangePage(e) {
    setCurrPage(e.target.id);
    active = e.target.value;
  }

  function handleNextPage(e) {
    if (currentPage < pages - 1) {
      setCurrPage(currentPage + 1);
      active = e.target.value;
    }
  }

  function handlePreviousPage(e) {
    if (currentPage > 0) {
      setCurrPage(currentPage - 1);
      active = e.target.value;
    }
  }

  function handleFirstPage() {
    setCurrPage(0);
    active = 1;
  }

  function handleLastPage() {
    setCurrPage(pages);
    active = pages;
  }

  useEffect(() => {
    api.getTotalProducts().then((result) => setTotal(result[0]["COUNT(*)"]));
  }, []);

  useEffect(() => {
    setPages(Math.ceil(totalProducts / productsPerPage));
  }, []);

  return (
    <Pagination className="pagination">
      <Pagination.First onClick={handleFirstPage} />
      <Pagination.Prev onClick={handlePreviousPage} />
      {renderPages.length > 1 &&
        pages > 1 &&
        renderingPages() &&
        renderPages.map((item) => item)}
      <Pagination.Next onClick={handleNextPage} />
      <Pagination.Last onClick={handleLastPage} />
    </Pagination>
  );
}

export default Paginate;
