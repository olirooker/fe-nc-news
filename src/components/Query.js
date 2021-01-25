import React from 'react';
import cardStyle from './styles/card.module.css';
import dropDownStyle from './styles/dropdown.module.css';

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
    <div className={cardStyle.queries}>
      <select
        className={dropDownStyle.dropDown}
        defaultValue=''
        onChange={handleOrderChange}
      >
        <option key='order-placeholder' disabled={true} value=''>
          Order by:
        </option>
        <option value='asc'>Asc</option>
        <option value='desc'>Desc</option>
      </select>

      <select
        className={dropDownStyle.dropDown}
        defaultValue=''
        onChange={handleSortChange}
      >
        <option key='sort-placeholder' disabled={true} value=''>
          Sort by:
        </option>
        <option value='votes'>Votes</option>
        <option value='created_at'>Date Posted</option>
        <option value='comment_count'>Comments</option>
      </select>
    </div>
  );
};

export default Query;
