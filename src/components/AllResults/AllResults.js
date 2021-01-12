import React from "react";
import Result from "./Result";
import "./AllResults.css";
const AllResults = ({ hits, tags, fetching, sort }) => {
  console.log(hits);
  return (
    <div className="allITems">
      <ul>
        {hits.map((hit) => {
          return (
            <Result
              key={Math.ceil(Math.random() * Math.pow(10, 20))}
              result={hit}
              tags={tags}
              fetching={fetching}
              sort={sort}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default AllResults;
