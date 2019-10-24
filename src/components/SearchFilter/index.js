import React, { Component } from 'react';
import { ChevronRight, Check } from '@material-ui/icons';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  RadioButton,
  CheckBox
} from './style';

const sortOptions = [
  {
    key: 'Sources',
    text: 'Sources',
    value: 'Sources'
  },

  {
    key: '',
    text: 'Relevance',
    value: 'Relevance'
  },
  {
    key: 'Newest',
    text: 'Newest',
    value: 'Newest'
  },
  {
    key: 'Oldest',
    text: 'Oldest',
    value: 'Oldest'
  }
];

const filterOptions = [
  {
    key: 'All',
    text: 'All',
    value: 'All'
  },
  {
    key: 'Selected',
    text: 'Selected',
    value: 'Selected'
  }
];

const sourceOptions = [
  {
    key: 'All',
    text: 'All',
    value: 'All',
    source_id: 'All'
  },
  {
    key: 'Xinhua',
    text: 'Xinhua',
    value: 'Xinhua',
    source_id: 'xinhuanet.com'
  },
  {
    key: 'Worldbank',
    text: 'Worldbank',
    value: 'Worldbank',
    source_id: 'wold_bank_news'
  },
  {
    key: 'RRP',
    text: 'RRP',
    value: 'RRP',
    source_id: 'rrp'
  },
  {
    key: 'SSA',
    text: 'SSA',
    value: 'SSA',
    source_id: 'ssa'
  },
  {
    key: 'CP',
    text: 'CP',
    value: 'CP',
    source_id: 'cp'
  },
  {
    key: 'CPS',
    text: 'CPS',
    value: 'CPS',
    source_id: 'cps'
  },
  {
    key: 'COBP',
    text: 'COBP',
    value: 'COBP',
    source_id: 'cobp'
  },
  {
    key: 'PCR',
    text: 'PCR',
    value: 'PCR',
    source_id: 'pcr'
  }
];

const countryOptions = [
  {
    key: 'All',
    text: 'All',
    value: 'All'
  },
  {
    key: 'China, PR',
    text: 'China, PR',
    value: 'China, PR'
  },
  {
    key: 'Mongolia',
    text: 'Mongolia',
    value: 'Mongolia'
  }
];
class SearchFilter extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const {
      onSelectFilter,
      onSelectFilterUpdate,
      sortBy,
      filterBy,
      filterSource,
      filterCountry
    } = this.props;

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle isopen={this.state.dropdownOpen ? 1 : 0}>
          Sort/Filter
          <ChevronRight />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Sort by</DropdownItem>
          {sortOptions.map(option => (
            <DropdownItem
              key={option.value}
              onClick={() => onSelectFilter(option.value, 'sortBy')}
            >
              <RadioButton selected={option.value === sortBy}>
                <span />
              </RadioButton>
              {option.text}
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem header>Filter by</DropdownItem>
          {filterOptions.map(option => (
            <DropdownItem
              key={option.value}
              onClick={() => onSelectFilter(option.value, 'filterBy')}
            >
              <CheckBox selected={filterBy.includes(option.value)}>
                <Check />
              </CheckBox>
              {option.text}
            </DropdownItem>
          ))}
          <DropdownItem header>Source</DropdownItem>
          {sourceOptions.map(option => (
            <DropdownItem
              key={option.value}
              onClick={() => {
                onSelectFilter(option.value, 'filterSource');
                onSelectFilter(option.source_id, 'filterSourceId');
                onSelectFilterUpdate();
              }}
            >
              <CheckBox selected={filterSource.includes(option.value)}>
                <Check />
              </CheckBox>
              {option.text}
            </DropdownItem>
          ))}
          <DropdownItem header>Country</DropdownItem>
          {countryOptions.map(option => (
            <DropdownItem
              key={option.value}
              onClick={() => onSelectFilter(option.value, 'filterCountry')}
            >
              <CheckBox selected={filterCountry.includes(option.value)}>
                <Check />
              </CheckBox>
              {option.text}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

SearchFilter.defaultProps = {
  filterBy: [],
  filterSource: [],
  filterCountry: [],
  filterSourceId: []
};

export default SearchFilter;
