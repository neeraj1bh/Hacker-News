import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Header from "./Header";
import Filters from "./Filters";
import AllResults from "./AllResults/AllResults";
import axios from "axios";
import Footer from "./Footer";
import "./Dashboard.css";

export default function Hnews() {
  const BASE_URL = "https://hn.algolia.com/api/v1/";
  const SEARCH = "search";
  const searchByDate = "search_by_date";

  const [query, setQuery] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [results, setResults] = useState([]);
  const [fetching, setFetching] = useState(false);

  const [tags, setTags] = useState("");
  const [sort, setSort] = useState("byPopularity");
  const [numericFilters, setNumericFilters] = useState("");

  useEffect(() => {
    setFetching(true);
    axios
      .get(BASE_URL + (sort === "searchByDate" ? searchByDate : SEARCH), {
        params: {
          query: query,
          page: pageNo,
          tags: tags,
          numericFilters: numericFilters,
        },
      })

      .then((res) => {
        setResults(res.data);
        setFetching(false);
      })
      .catch((e) => {
        console.log("Some error occurred");
      });
  }, [query, pageNo, tags, sort, numericFilters]);

  const { hits = [], page, nbPages, nbHits } = results;

  return (
    <div>
      <Header setQuery={setQuery} />
      <Filters
        nbHits={nbHits}
        setTags={setTags}
        setSort={setSort}
        setNumericFilters={setNumericFilters}
      />
      <AllResults hits={hits} tags={tags} fetching={fetching} sort={sort} />
      {console.log(hits)}
      {hits.length > 0 ? (
        <Pagination
          page={page}
          nbPages={nbPages}
          setPageNo={setPageNo}
          fetching={fetching}
        />
      ) : null}

      {hits.length > 0 ? (
        <div className="footerD">
          {" "}
          <Footer />{" "}
        </div>
      ) : null}
    </div>
  );
}
