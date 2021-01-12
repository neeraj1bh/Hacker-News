import React from "react";
import "./Result.css";
import moment from "moment";
import dompurify from "dompurify";

const Result = ({ result, tags, fetching, sort }) => {
  const {
    objectID,
    author,
    title,
    created_at,
    points,
    url,
    _highlightResult,
    story_text,
    comment_text: coomenr,
    story_title,
    num_comments,
  } = result;

  const { comment_text } = _highlightResult;

  let condition =
    (tags === "comment" || tags === "(story,comment)" || tags === "") &&
    fetching === false &&
    comment_text !== null;

  const Comments = ({ value }) => {
    const title = value.split("\\n").join("<br />");
    const sanitizer = dompurify.sanitize;
    return <div dangerouslySetInnerHTML={{ __html: sanitizer(title) }} />;
  };

  let storyTitle = `on: ${story_title}`;
  const parsedPoint =
    points > 0 ? (points === 1 ? `${points} point` : `${points} points`) : null;
  const parsedComment =
    num_comments > 0
      ? num_comments === 1
        ? `${num_comments} comment`
        : `${num_comments} comments`
      : null;

  return (
    <li>
      {(url ||
        title ||
        tags === "" ||
        tags === "  " ||
        sort === "searchByDate") && (
        <div className="headInfo">
          {title && (
            <a
              className="storyTitle"
              href={`https://news.ycombinator.com/item?id=${objectID}`}
            >
              {title}
            </a>
          )}
          {url && <div className="spanUrl">{url ? url : null}</div>}
        </div>
      )}
      {(url || title || tags === "comment" || sort === "searchByDate") && (
        <div className="items">
          <span className="spanRes">
            {parsedPoint} {parsedPoint && <span className="spanPipe">|</span>}{" "}
            {author} <span className="spanPipe">|</span>{" "}
            {moment.utc(created_at).local().fromNow()}{" "}
            {(num_comments || story_title) && (
              <span className="spanPipe">|</span>
            )}{" "}
            {parsedComment}
            {story_title && storyTitle}
          </span>
        </div>
      )}
      {(url ||
        title ||
        tags === "(story, comment)" ||
        sort === "searchByDate") &&
        story_text && (
          <div className="headInfo readContent">
            <Comments value={story_text} />
          </div>
        )}
      {coomenr && condition && (
        <div className="headInfo readContent">
          <Comments value={comment_text.value} />
        </div>
      )}
    </li>
  );
};
export default Result;
