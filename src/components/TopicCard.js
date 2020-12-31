import { Link } from '@reach/router';
import React from 'react';
import styled from "styled-components";

const TopicContainer = styled.div`
    margin: 1.5rem 0;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 3px 6px 8px #888888;
    border-left: 5px solid orange;
`

const TopicCard = ({ topicData }) => {
    return (
        <TopicContainer>
            <Link to={`/${topicData.slug}/articles`}><h3>{topicData.slug}</h3></Link>
            <p>{topicData.description}</p>
        </TopicContainer>
    )
};

export default TopicCard;