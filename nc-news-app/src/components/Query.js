import React from "react";
import styled from "styled-components";

const StyledQueries = styled.div`
  margin: 1.5rem 0;
  padding: 5px 10px;
  background-color: white;
  border: 1px solid lightgrey;
  box-shadow: 3px 6px 8px #888888;
  border-left: 5px solid yellowgreen;
`;

const Query = ({ changeOrder, changeSort }) => {
  const handleOrderChange = (event) => {
    const newOrder = event.target.value;
    changeOrder(newOrder);
  };

  const handleSortChange = (event) => {
    const newSort = event.target.value;
    changeSort(newSort);
  };

  return (
    <StyledQueries>
      <select defaultValue="" onChange={handleOrderChange}>
        <option key="order-placeholder" disabled={true} value="">
          Order by:
        </option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      <select defaultValue="" onChange={handleSortChange}>
        <option key="sort-placeholder" disabled={true} value="">
          Sort by:
        </option>
        <option value="votes">Votes</option>
        <option value="created_at">Date Posted</option>
        <option value="comment_count">Comments</option>
      </select>
    </StyledQueries>
  );
};

export default Query;
