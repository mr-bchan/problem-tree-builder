import * as types from 'constants/actionTypes';
import { getProblems, sendUserScore, addUserInput, editProblem } from 'api/ptg';
import { getState } from '../index';

export const setTopic = payload => {
  return dispatch => {
    dispatch({ type: types.SET_TOPIC, payload });
  };
};

export const searchOptions = (keyword, searchType) => {
  const SEARCH_TYPES = {
    cause: types.SET_CAUSES,
    effect: types.SET_EFFECTS
  };

  const sources = getState().topic.filterSourceId;
  return dispatch => {
    dispatch({ type: types.SET_FETCHING });
    return getProblems(keyword, searchType, sources)
      .then(result => {
        dispatch({
          type: SEARCH_TYPES[searchType],
          payload: result
        });
      })
      .catch(err => console.error(`Options ${searchType} fetch error: `, err));
  };
};

export const selectOption = (index, type) => {
  const SELECTION_TYPE = {
    cause: types.SELECT_CAUSE,
    effect: types.SELECT_EFFECT
  };

  return dispatch => {
    dispatch({
      type: SELECTION_TYPE[type],
      idx: index
    });
  };
};

export const addOption = (payload, type, keyword) => {
  const SELECTION_TYPE = {
    cause: types.ADD_CAUSE,
    effect: types.ADD_EFFECT
  };

  return dispatch => {
    return addUserInput(type, payload.text, payload.link, keyword)
      .then(response => {
        dispatch({
          type: SELECTION_TYPE[type],
          payload: { ...payload, ...response }
        });
      })
      .catch(e => console.error(`Failed to save new option for ${type}: `, e));
  };
};

export const selectSubOption = (parentIndex, selectedIndex, activeType) => {
  const SEARCH_TYPES = {
    'sub-cause': types.SELECT_SUB_CAUSE,
    'sub-effect': types.SELECT_SUB_EFFECT
  };

  return dispatch => {
    dispatch({
      type: SEARCH_TYPES[activeType],
      parentIndex,
      idx: selectedIndex
    });
  };
};

export const addSubOption = (payload, parentIndex, activeType, keyword) => {
  const SEARCH_TYPES = {
    'sub-cause': types.ADD_SUB_CAUSE,
    'sub-effect': types.ADD_SUB_EFFECT
  };

  return dispatch => {
    return addUserInput(activeType, payload.text, payload.link, keyword)
      .then(response => {
        dispatch({
          type: SEARCH_TYPES[activeType],
          parentIndex,
          payload: { ...payload, ...response }
        });
      })
      .catch(e =>
        console.error(`Failed to save new option for ${activeType}: `, e)
      );
  };
};

export const searchSubOptions = (keyword, searchType, idx, shouldFetch) => {
  const SEARCH_TYPES = {
    cause: types.SET_SUB_CAUSES,
    effect: types.SET_SUB_EFFECTS
  };

  const sources = getState().topic.filterSourceId;
  return dispatch => {
    if (shouldFetch) {
      dispatch({ type: types.SET_FETCHING });
      return getProblems(keyword, searchType, sources)
        .then(result => {
          dispatch({
            type: SEARCH_TYPES[searchType],
            payload: result,
            idx
          });
        })
        .catch(err => console.error(`Sub ${searchType} fetch error: `, err));
    }
  };
};

export const updateFilteredList = () => {
  const sources = getState().topic.filterSourceId;
  const keyword = getState().topic.keyword;
  const searchType = getState().topic.activeType;

  const SEARCH_TYPES = {
    cause: types.SET_CAUSES,
    effect: types.SET_EFFECTS,
    problem: types.SET_PROBLEMS,
    'sub-cause': types.ADD_SUB_CAUSE,
    'sub-effect': types.ADD_SUB_EFFECT
  };

  return dispatch => {
    dispatch({ type: types.SET_FETCHING });
    return getProblems(keyword, searchType, sources)
      .then(result => {
        dispatch({
          type: SEARCH_TYPES[searchType],
          payload: result
        });
      })
      .catch(err => console.error(`Options ${searchType} fetch error: `, err));
  };
};

export const setFilter = (value, field) => {
  return dispatch => {
    dispatch({
      type: types.SET_FILTER,
      payload: {
        value,
        field
      }
    });
  };
};

export const clear = (activeType, idx) => {
  return dispatch => {
    if (activeType === 'problem') {
      dispatch({ type: types.CLEAR_PROBLEM_SELECTION });
    } else {
      dispatch({ type: types.CLEAR_CAUSE_EFFECT_SELECTION });
    }
  };
};

export const updateOption = (type, index, childIndex, payload) => {
  const UPDATE_TYPE = {
    cause: types.UPDATE_CAUSE,
    'sub-cause': types.UPDATE_SUB_CAUSE,
    effect: types.UPDATE_EFFECT,
    'sub-effect': types.UPDATE_SUB_EFFECT
  };

  return async dispatch => {
    dispatch({
      type: UPDATE_TYPE[type],
      index,
      childIndex,
      payload
    });
    await editProblem(payload.text, payload.id);
  };
};

export const switchView = view => dispatch =>
  dispatch({ type: types.SWITCH_VIEW, view });

export const updateUserScore = (stars, id) => {
  return async dispatch => {
    dispatch({ type: types.UPDATE_USER_SCORE });
    await sendUserScore(stars, id);
  };
};
