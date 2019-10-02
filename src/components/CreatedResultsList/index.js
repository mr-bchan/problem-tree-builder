import React from 'react';
import CreatedResultsListItem from '../CreatedResultsListItem';
import { StyledList, Wrapper } from './style';

const CreatedResultsList = ({ items, onSelect, selected, type }) => {
  const newItems = items.filter(i => i.created);

  return (
    <Wrapper>
      <StyledList celled>
        {newItems &&
          newItems.map((item, index) => (
            <CreatedResultsListItem
              key={index}
              item={item}
              onSelect={() => onSelect(item._listIndex)}
              type={type}
              onRate={() => {}}
            />
          ))}
      </StyledList>
    </Wrapper>
  );
};

export default CreatedResultsList;
