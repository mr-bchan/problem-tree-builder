import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchProblems, resetSearchFilters } from 'actions/problemActions';
import { retrieveSuggestions } from 'actions/suggestionActions';
import SearchBar from 'components/SearchBar';

import {
  Wrapper,
  Container,
  Center,
  Background,
  Image,
  Heading,
  Link
} from './style';

class Home extends Component {
  state = {
    keyword: ''
  };

  /**
   * Manages the modification of the keyword within the search field.
   *
   * @param {string} keyword
   * String value of the text field
   */
  handleChange = keyword => {
    this.props.retrieveSuggestions(keyword);
    this.setState({ keyword });
  };

  /**
   * Triggers the search using the keyword and navigates
   * to the next page.
   */
  handleSearch = () => {
    const { keyword } = this.state;
    this.props.resetSearchFilters();
    this.props.searchProblems(keyword);
    navigate('/compose');
  };

  handleSuggestionSelect = problem => {
    this.props.searchProblems(problem);
    navigate('/compose');
  };

  render() {
    const { keyword } = this.state;
    const { data, isFetching } = this.props.suggestions;

    return (
      <Wrapper>
        <Container>
          {/* <Logo src={`${process.env.PUBLIC_URL}/adb_logo_outline.png`} /> */}

          <Center active={keyword !== ''}>
            <Background>
              {keyword === '' && (
                <Image src={`${process.env.PUBLIC_URL}/bg-img.jpg`} />
              )}
            </Background>

            <Heading>Start building your tree</Heading>

            <SearchBar
              onSearch={this.handleSearch}
              onChange={this.handleChange}
              size="huge"
              active={keyword !== ''}
              width="45%"
              loadingSuggestions={isFetching}
              suggestions={data}
              onSelectSuggestion={this.handleSuggestionSelect}
              keyword={keyword}
            />
          </Center>
        </Container>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { searchProblems, resetSearchFilters, retrieveSuggestions },
    dispatch
  );

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
