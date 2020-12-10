import React from 'react';
import styled from 'styled-components';

const StyledQueries = styled.div`
margin: 1rem 0;
background-color: white;
`

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
                <option key="order-placeholder" disabled={true} value="">Order by:</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>

            <select defaultValue="" onChange={handleSortChange}>
                <option key="sort-placeholder" disabled={true} value="">Sort by:</option>
                <option value="votes">Votes</option>
                <option value="created_at">Time</option>
            </select>
        </StyledQueries>
    );
}

export default Query;