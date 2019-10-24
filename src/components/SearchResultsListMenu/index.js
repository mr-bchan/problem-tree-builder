import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setFilter,
  clear,
  switchView,
  updateFilteredList
} from 'actions/topicActions';
import SearchFilter from '../SearchFilter';
import { Wrapper, Label, Menu, Button } from './style';

class SearchResultsListMenu extends Component {
  switchView = view => {
    this.props.switchView(view);
  };

  render() {
    const {
      selected,
      length,
      setFilter,
      topic,
      updateFilteredList
    } = this.props;
    return (
      <Wrapper>
        <Label>
          {selected && selected.length >= 1
            ? `${selected.length} of ${length} selected`
            : length > 1
            ? `${length} Results found`
            : `${length} Result found`}
        </Label>
        <Menu>
          <SearchFilter
            onSelectFilter={setFilter}
            onSelectFilterUpdate={updateFilteredList}
            sortBy={topic.sortBy}
            filterBy={topic.filterBy}
            filterSource={topic.filterSource}
            filterCountry={topic.filterCountry}
          />
          <Button
            content="Clear"
            onClick={() => this.props.clear(topic.activeType)}
          />
          <Button
            content={topic.view === 'list' ? 'tile' : 'list'}
            onClick={() => {
              const view = topic.view === 'list' ? 'tile' : 'list';
              this.switchView(view);
            }}
          />
        </Menu>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setFilter,
      clear,
      switchView,
      updateFilteredList
    },
    dispatch
  );

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsListMenu);
