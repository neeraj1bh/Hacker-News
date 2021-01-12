import React from "react";
import moment from "moment";
import "./Filters.css";

const Filters = ({ nbHits, setTags, setSort, setNumericFilters }) => {
  let lastDayFromNow = moment.utc().subtract(1, "day").valueOf() / 1000;
  let last7DayFromNow = moment.utc().subtract(1, "week").valueOf() / 1000;
  let lastMonthFromNow = moment.utc().subtract(1, "month").valueOf() / 1000;
  let lastYearFromNow = moment.utc().subtract(1, "year").valueOf() / 1000;

  const firstSelect = (e) => {
    switch (e.target.name) {
      case "tags":
        setTags(e.target.value);
        break;
      case "popDate":
        setSort(e.target.value);
        break;
      case "time":
        setNumericFilters(e.target.value);
        break;
      default:
        break;
    }
  };
  return (
    <div className="cFilter">
      <div className="filters">
        <div className="indiFilters">
          <span className="spanHead">Search</span>
          <select name="tags" onChange={firstSelect} className="selectHead">
            <option value="(story,comment)">All</option>
            <option value="story">Stories</option>
            <option value="comment">Comments</option>
          </select>
        </div>
        <div className="indiFilters">
          <span className="spanHead">by</span>
          <select name="popDate" onChange={firstSelect} className="selectHead">
            <option value="">Popularity</option>
            <option value="searchByDate">Date</option>
          </select>
        </div>
        <div className="indiFilters">
          <span className="spanHead">for</span>
          <select name="time" onChange={firstSelect} className="selectHead">
            <option value="">All time</option>
            <option value={`created_at_i>${lastDayFromNow}`}>Last 24h</option>
            <option value={`created_at_i>${last7DayFromNow}`}>Past Week</option>
            <option value={`created_at_i>${lastMonthFromNow}`}>
              Past Month
            </option>
            <option value={`created_at_i>${lastYearFromNow}`}>Past Year</option>
            <option value={`created_at_i>${lastDayFromNow}`}>
              Custom Range
            </option>
          </select>
        </div>
      </div>
      <div className="hits">
        {!isNaN(nbHits)
          ? parseInt(nbHits, 10).toLocaleString() + " results"
          : "Fetching Results from API..."}
      </div>
    </div>
  );
};

export default Filters;
