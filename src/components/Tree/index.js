import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchProblems, selectProblem } from 'actions/problemActions';
import {
  setTopic,
  searchOptions,
  searchSubOptions,
  selectSubOption,
  selectOption
} from 'actions/topicActions';

import Node from '../Node';

import { Wrapper, VerticalArrow, Level, Child, HorizontalLine } from './style';

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: null
    };
  }

  setActiveMenu = index => {
    const { activeMenu } = this.state;

    if (activeMenu !== index) {
      this.setState({
        activeMenu: index
      });
    } else {
      this.setState({
        activeMenu: null
      });
    }
  };

  initAddWithType = (activeType, parentIndex, listIndex) => {
    this.props.setTopic({
      activeType,
      activeIndex: parentIndex
    });

    if (activeType === 'cause' || activeType === 'effect') {
      this.props.searchOptions(this.props.topic.problem.text, activeType);
    } else if (activeType === 'sub-cause') {
      this.props.searchSubOptions(
        this.props.topic.causes[parentIndex].text,
        'cause',
        listIndex
      );
    } else if (activeType === 'sub-effect') {
      this.props.searchSubOptions(
        this.props.topic.effects[parentIndex].text,
        'effect',
        listIndex
      );
    }
  };

  render() {
    const { data } = this.props;
    // const { activeMenu } = this.state;

    return (
      <Wrapper>
        <Level bottomTop>
          {data.effects.length === 0 ? (
            <Child>
              <Node
                onClick={
                  data.problem.text
                    ? () => this.initAddWithType('effect')
                    : () => {}
                }
                content="ADD EFFECTS"
                identifier={data.problem.text ? 'toBeFilled' : 'empty'}
              />
            </Child>
          ) : (
            data.effects &&
            data.effects.map((effect, effectIndex) => (
              <Child>
                <Level bottomTop>
                  {effect._data &&
                    effect._data.map((subEffect, seIndex) => (
                      <Child>
                        <Node content={subEffect.text} identifier="effect" />
                        <VerticalArrow top />
                        {effect._data.length > 1 && (
                          <HorizontalLine
                            rightHalf={seIndex === 0}
                            leftHalf={seIndex === effect._data.length - 1}
                          />
                        )}
                      </Child>
                    ))}
                </Level>

                {effect._data && effect._data.length > 0 && <VerticalArrow />}

                <Node
                  onClick={() =>
                    this.initAddWithType(
                      'sub-effect',
                      effectIndex,
                      effect._listIndex
                    )
                  }
                  content={effect.text}
                  identifier="effect"
                />

                {data.effects && data.effects.length > 1 && (
                  <>
                    <VerticalArrow top />
                    <HorizontalLine
                      rightHalf={effectIndex === 0}
                      leftHalf={effectIndex === data.effects.length - 1}
                    />
                  </>
                )}
              </Child>
            ))
          )}
        </Level>

        {/* Center */}
        <VerticalArrow top />

        {data.effects.length <= 1 && <VerticalArrow />}

        <Node
          onClick={() =>
            this.props.setTopic({ activeType: 'problem', activeIndex: -1 })
          }
          content={data.problem.text || 'SELECT A PROBLEM STATEMENT'}
          identifier="problem"
        />
        <VerticalArrow top />
        {/* Center */}

        <Level>
          {data.causes.length === 0 ? (
            <Child>
              <VerticalArrow />
              <Node
                onClick={
                  data.problem.text
                    ? () => this.initAddWithType('cause')
                    : () => {}
                }
                content="ADD CAUSES"
                identifier={data.problem.text ? 'toBeFilled' : 'empty'}
              />
            </Child>
          ) : (
            data.causes.map((cause, index) => (
              <Child>
                {data.causes && data.causes.length > 1 && (
                  <HorizontalLine
                    rightHalf={index === 0}
                    leftHalf={index === data.causes.length - 1}
                  />
                )}

                <VerticalArrow />

                <Node
                  onClick={() =>
                    this.initAddWithType('sub-cause', index, cause._listIndex)
                  }
                  content={cause.text}
                  identifier="cause"
                  // withControls
                  // onGroupControlClick={() => this.setActiveMenu(`cause${index}`)}
                  // showControlGroup={`cause${index}` === activeMenu}
                />

                {cause._data && cause._data.length > 0 && <VerticalArrow top />}

                <Level>
                  {cause._data &&
                    cause._data.map((subCause, scIndex) => (
                      <Child>
                        {cause._data && cause._data.length > 1 && (
                          <HorizontalLine
                            rightHalf={scIndex === 0}
                            leftHalf={scIndex === cause._data.length - 1}
                          />
                        )}

                        <VerticalArrow />
                        <Node content={subCause.text} identifier="cause" />
                      </Child>
                    ))}
                </Level>
              </Child>
            ))
          )}
        </Level>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchProblems,
      selectProblem,
      setTopic,
      searchOptions,
      searchSubOptions,
      selectSubOption,
      selectOption
    },
    dispatch
  );

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tree);