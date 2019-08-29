import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function problemsReducer(state = initialState.problems, action) {
  switch (action.type) {
    case types.GET_PROBLEMS:
      return Object.assign({}, state, { isFetching: true });

    case types.SET_PROBLEMS:
      const data = action.payload.map((p, _listIndex) => Object.assign({}, p, { _listIndex }));
      return Object.assign({}, { isFetching: false, data });
    
    case types.CLEAR_PROBLEM_SELECTION:
        return Object.assign({}, state, { data: state.data.map(item => Object.assign({}, item, { selected: false })) });
    
    case types.INIT_PROBLEMS:
      return Object.assign({}, initialState.problems);

    default:
      return state;
  }
}
