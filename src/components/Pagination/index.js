import React from "react";
import "./Pagination.css";

const Pagination = ({ page, nbPages, setPageNo, fetching }) => {
  let hasNextPage = page + 1 !== nbPages;
  let condition = !isNaN(page) && fetching === false;

  return (
    <>
      {condition && (
        <div className="containerPagin">
          <div className="buttonAll">
            {page + 1 !== 1 && (
              <button className="btns" onClick={() => setPageNo(page - 1)}>
                {"<<"}
              </button>
            )}
            {page + 1 > 1 && (
              <button className="btns" onClick={() => setPageNo(0)}>
                {"1"}
              </button>
            )}
            {page + 1 > 2 && <button className="btns">{"..."}</button>}
            {page + 1 > 2 && (
              <button className="btns" onClick={() => setPageNo(page - 1)}>
                {page}
              </button>
            )}
            <button className="btns">{page + 1}</button>
            {hasNextPage && (
              <button className="btns" onClick={() => setPageNo(page + 2)}>
                {page + 2}
              </button>
            )}
            {hasNextPage && (
              <button className="btns" onClick={() => setPageNo(page + 1)}>
                {">>"}
              </button>
            )}
          </div>
          <div className="buttonAll">
            Page no. [ {page + 1} - {nbPages} ]
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
