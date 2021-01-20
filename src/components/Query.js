import React from 'react';
import styled from 'styled-components';

const Queries = styled.div`
  margin: 1.8rem 0;
  padding: 0.8rem;
  background-color: white;
  border: 1px solid #b5bdc4;
  border-radius: 1rem;
  box-shadow: 1.5px 3px 4px #888888;
  display: flex;
  justify-content: space-between;
`;
const DropDownSelect = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  width: 49%;
  font-size: 1.6rem;
  cursor: pointer;
  border-color: lightgrey;
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
    <Queries>
      <DropDownSelect defaultValue='' onChange={handleOrderChange}>
        <option key='order-placeholder' disabled={true} value=''>
          Order by:
        </option>
        <option value='asc'>Asc</option>
        <option value='desc'>Desc</option>
      </DropDownSelect>

      <DropDownSelect defaultValue='' onChange={handleSortChange}>
        <option key='sort-placeholder' disabled={true} value=''>
          Sort by:
        </option>
        <option value='votes'>Votes</option>
        <option value='created_at'>Date Posted</option>
        <option value='comment_count'>Comments</option>
      </DropDownSelect>
    </Queries>
  );
};

export default Query;
