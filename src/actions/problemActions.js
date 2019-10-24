import { getProblems, addUserInput, editProblem } from 'api/ptg';
import * as types from 'constants/actionTypes';
import { getState } from '../index';

export const resetSearchFilters = () => {
  return dispatch => {
    dispatch({ type: types.RESET_SEARCH_FILTERS });
  };
};

export const searchProblems = keyword => {
  return dispatch => {
    dispatch({ type: types.GET_PROBLEMS });
    dispatch({
      type: types.SET_TOPIC,
      payload: {
        keyword,
        activeType: 'problem',
        effects: [],
        causes: [],
        _sourceEffects: [],
        _sourceCauses: [],
        problem: {}
      }
    });

    const sources = getState().topic.filterSourceId;
    return getProblems(keyword, 'problem', sources)
      .then(payload => {
        dispatch({
          type: types.SET_PROBLEMS,
          payload
        });
      })
      .catch(err => console.error('Problems fetch error: ', err));
  };
};

/**
 * Handles the logic for selecting a problem from the list
 * of problems. Sets a new value for problems list with 'selected'
 * keyword and topic.problem
 *
 * @param {number} index
 * Position of the item selected within the list of problems
 *
 * @param {Array} problems
 * List of problems
 */
export const selectProblem = (index, problems) => {
  return dispatch => {
    const newProblems = problems.map((problem, idx) => {
      return index === idx
        ? Object.assign({}, problem, { selected: true })
        : Object.assign({}, problem, { selected: false });
    });

    dispatch({
      type: types.SET_TOPIC,
      payload: {
        problem: newProblems.filter(problem => problem.selected)[0],
        activeType: 'problem',
        effects: [],
        causes: [],
        _sourceEffects: [],
        _sourceCauses: []
      }
    });

    dispatch({
      type: types.SET_PROBLEMS,
      payload: newProblems
    });
  };
};

export const updateProblem = (index, payload) => {
  return async dispatch => {
    dispatch({ type: types.UPDATE_PROBLEM, index, payload });
    await editProblem(payload.text, payload.id);
  };
};

export const addProblem = (payload, problems, keyword) => dispatch => {
  return addUserInput('problem', payload.text, payload.link, keyword)
    .then(response => {
      const newProblems = [...problems, { ...payload, created: true }].map(
        (p, _listIndex) => {
          return _listIndex === problems.length
            ? {
                ...p,
                _listIndex,
                selected: true,
                ...response
              }
            : {
                ...p,
                _listIndex,
                selected: false
              };
        }
      );

      dispatch({
        type: types.SET_TOPIC,
        payload: {
          problem: newProblems.filter(problem => problem.selected)[0],
          activeType: 'problem',
          effects: [],
          causes: [],
          _sourceEffects: [],
          _sourceCauses: []
        }
      });

      dispatch({
        type: types.SET_PROBLEMS,
        payload: newProblems
      });
    })
    .catch(e => console.error('Failed to save new option for problem: ', e));
};
