import React from 'react';

import { filterList } from 'utils';

import SearchResultsListItem from '../SearchResultsListItem';
import SearchResultsListMenu from '../SearchResultsListMenu';
import Tile from '../Tile';

import { StyledList, Wrapper } from './style';

const SearchResultsList = ({
  items,
  onSelect,
  selected,
  type,
  viewType,
  onRate,
  sortBy,
  filterBy,
  filterSource,
  filterCountry
}) => {
  const newItems = filterList(
    { sortBy, filterBy, filterSource, filterCountry },
    items
  );
  const renderView = () => {
    switch (viewType) {
      case 'tile':
        return (
          <Wrapper
            style={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            {newItems &&
              newItems.map((item, index) => (
                <Tile
                  key={index}
                  item={item}
                  onSelect={() => onSelect(item._listIndex)}
                  type={type}
                  onRate={onRate}
                />
              ))}
          </Wrapper>
        );

      default:
        return (
          <Wrapper>
            <StyledList celled>
              {newItems &&
                newItems.map((item, index) => (
                  <SearchResultsListItem
                    key={index}
                    item={item}
                    onSelect={() => onSelect(item._listIndex)}
                    type={type}
                    onRate={onRate}
                  />
                ))}
            </StyledList>
          </Wrapper>
        );
    }
  };

  return (
    <>
      <SearchResultsListMenu length={newItems.length} selected={selected} />
      {renderView()}
    </>
  );
};

export default SearchResultsList;
