import * as types from 'constants/actionTypes';
import { CAUSE_STRING, EFFECT_STRING } from 'constants/strings';
import { getChildUpdates, getParentUpdates } from 'utils';

import initialState from './initialState';

export default function topicReducer(state = initialState.topic, action) {
  switch (action.type) {
    case types.RESET_SEARCH_FILTERS:
      return Object.assign({}, state, {
        filterSource: ['All'],
        filterSourceId: []
      });

    case types.SET_FETCHING:
      return Object.assign({}, state, { isFetching: true });

    case types.SET_TOPIC:
      return Object.assign({}, state, action.payload);

    case types.SET_CAUSES:
      return Object.assign({}, state, {
        isFetching: false,
        _sourceCauses: action.payload.map((c, _listIndex) =>
          Object.assign({}, c, { _listIndex })
        )
      });

    case types.SET_EFFECTS:
      return Object.assign({}, state, {
        isFetching: false,
        _sourceEffects: action.payload.map((e, _listIndex) =>
          Object.assign({}, e, { _listIndex })
        )
      });

    case types.SELECT_CAUSE:
      const newCauses = Object.assign([], state._sourceCauses).map((s, idx) => {
        return action.idx === idx
          ? Object.assign({}, s, { selected: !s.selected })
          : s;
      });

      return Object.assign({}, state, {
        _sourceCauses: newCauses,
        causes: newCauses.filter(s => s.selected),
        activeType: 'cause'
      });

    case types.ADD_CAUSE:
      // TODO: Add limitReached
      const newAddedCauses = [...state._sourceCauses];
      newAddedCauses.push({ ...action.payload, selected: true, created: true });
      const newIndexedCauses = newAddedCauses.map((item, _listIndex) => ({
        ...item,
        _listIndex
      }));

      return Object.assign({}, state, {
        _sourceCauses: newIndexedCauses,
        causes: newIndexedCauses.filter(s => s.selected),
        activeType: 'cause'
      });

    case types.SELECT_EFFECT:
      const newEffects = Object.assign([], state._sourceEffects).map(
        (s, idx) => {
          return action.idx === idx
            ? Object.assign({}, s, { selected: !s.selected })
            : s;
        }
      );

      return Object.assign({}, state, {
        _sourceEffects: newEffects,
        effects: newEffects.filter(s => s.selected),
        activeType: 'effect'
      });

    case types.ADD_EFFECT:
      // TODO: Add limitReached
      const newAddedEffects = [...state._sourceEffects];
      newAddedEffects.push({
        ...action.payload,
        selected: true,
        created: true
      });
      const newIndexedEffects = newAddedEffects.map((item, _listIndex) => ({
        ...item,
        _listIndex
      }));

      return Object.assign({}, state, {
        _sourceEffects: newIndexedEffects,
        effects: newIndexedEffects.filter(s => s.selected),
        activeType: 'effect'
      });

    case types.SET_SUB_CAUSES:
      const newCausesWithSub = Object.assign([], state._sourceCauses).map(
        (cause, idx) => {
          if (action.idx === idx) {
            cause._sources = action.payload.map((subCause, sIdx) =>
              Object.assign({}, subCause, { _listIndex: sIdx })
            );
            cause._data = cause._sources.filter(item => item.selected);
          }
          return action.activeIndex === idx
            ? Object.assign({}, cause, { selected: true })
            : Object.assign({}, cause);
        }
      );

      return Object.assign({}, state, {
        _sourceCauses: newCausesWithSub,
        isFetching: false,
        causes: newCausesWithSub.filter(s => s.selected)
      });

    case types.SET_SUB_EFFECTS:
      const newEffectsWithSub = Object.assign([], state._sourceEffects).map(
        (effect, idx) => {
          if (action.idx === idx) {
            effect._sources = action.payload.map((subEffect, sIdx) =>
              Object.assign({}, subEffect, { _listIndex: sIdx })
            );
            effect._data = effect._sources.filter(item => item.selected);
          }
          return action.activeIndex === idx
            ? Object.assign({}, effect, { selected: true })
            : Object.assign({}, effect);
        }
      );

      return Object.assign({}, state, {
        _sourceEffects: newEffectsWithSub,
        isFetching: false,
        effects: newEffectsWithSub.filter(s => s.selected)
      });

    case types.SELECT_SUB_EFFECT:
      const effectListIndex = action.parentIndex;
      const newEffectsWithSubSelection = Object.assign(
        [],
        state._sourceEffects
      ).map((effect, idx) => {
        if (effectListIndex === idx) {
          effect._sources = effect._sources.map((subEffect, sIdx) => {
            return action.idx === sIdx
              ? Object.assign({}, subEffect, { selected: !subEffect.selected })
              : Object.assign({}, subEffect);
          });
          effect._data = effect._sources.filter(item => item.selected);
        }
        return effect;
      });

      return Object.assign({}, state, {
        _sourceEffects: newEffectsWithSubSelection,
        isFetching: false,
        effects: newEffectsWithSubSelection.filter(s => s.selected)
      });

    case types.ADD_SUB_EFFECT:
      const newEffectsWithAddedSubSelection = Object.assign(
        [],
        state._sourceEffects
      ).map((effect, idx) => {
        if (action.parentIndex === idx) {
          const originalSubEffects = [...effect._sources];
          originalSubEffects.push({
            ...action.payload,
            selected: true,
            created: true
          });

          const indexedSubEffects = originalSubEffects.map(
            (subEffect, _listIndex) => ({ ...subEffect, _listIndex })
          );
          effect._sources = indexedSubEffects;
          effect._data = indexedSubEffects.filter(item => item.selected);
        }
        return effect;
      });

      return Object.assign({}, state, {
        _sourceEffects: newEffectsWithAddedSubSelection,
        isFetching: false,
        effects: newEffectsWithAddedSubSelection.filter(s => s.selected)
      });

    case types.SELECT_SUB_CAUSE:
      const causeListIndex = action.parentIndex;
      const newCausesWithSubSelection = Object.assign(
        [],
        state._sourceCauses
      ).map((cause, idx) => {
        if (causeListIndex === idx) {
          cause._sources = cause._sources.map((subCause, sIdx) => {
            return action.idx === sIdx
              ? Object.assign({}, subCause, { selected: !subCause.selected })
              : Object.assign({}, subCause);
          });
          cause._data = cause._sources.filter(item => item.selected);
        }
        return cause;
      });

      return Object.assign({}, state, {
        _sourceCauses: newCausesWithSubSelection,
        isFetching: false,
        causes: newCausesWithSubSelection.filter(s => s.selected)
      });

    case types.ADD_SUB_CAUSE:
      const newCausesWithAddedSubSelection = Object.assign(
        [],
        state._sourceCauses
      ).map((cause, idx) => {
        if (action.parentIndex === idx) {
          const originalSubCauses = [...cause._sources];
          originalSubCauses.push({
            ...action.payload,
            selected: true,
            created: true
          });

          const indexedSubCauses = originalSubCauses.map(
            (subCause, _listIndex) => ({ ...subCause, _listIndex })
          );
          cause._sources = indexedSubCauses;
          cause._data = indexedSubCauses.filter(item => item.selected);
        }
        return cause;
      });

      return Object.assign({}, state, {
        _sourceCauses: newCausesWithAddedSubSelection,
        isFetching: false,
        causes: newCausesWithAddedSubSelection.filter(s => s.selected)
      });

    case types.SET_FILTER:
      const { field, value } = action.payload;
      // Hard coding
      const reference = {
        filterBy: ['All', 'Selected'],
        filterSource: [
          'All',
          'Xinhua',
          'Worldbank',
          'RRP',
          'SSA',
          'CP',
          'CPS',
          'COBP',
          'PCR'
        ],

        filterSourceId: [],
        filterCountry: ['All', 'China, PR', 'Mongolia']
      };
      const obj = {};

      if (field === 'sortBy') {
        obj[field] = value;
      } else if (
        value === 'All' &&
        state[field] &&
        !state[field].includes(value)
      ) {
        obj[field] = reference[field];
      } else if (
        value === 'All' &&
        state[field] &&
        state[field].includes(value)
      ) {
        obj[field] = [];
      } else if (state[field] && state[field].includes(value)) {
        const list = [...state[field]];
        list.splice(list.indexOf(value), 1);
        obj[field] = list;
      } else {
        const list = [...state[field]];
        list.push(value);
        obj[field] = list;
      }

      return Object.assign({}, state, obj);

    case types.CLEAR_PROBLEM_SELECTION:
      return Object.assign({}, state, { problem: {}, causes: [], effects: [] });

    case types.CLEAR_CAUSE_EFFECT_SELECTION:
      if (state.activeType === 'cause') {
        const unselectedCausesList = state._sourceCauses.map(item =>
          Object.assign({}, item, { selected: false })
        );
        return Object.assign({}, state, {
          _sourceCauses: unselectedCausesList,
          isFetching: false,
          causes: []
        });
      } else if (state.activeType === 'effect') {
        const unselectedEffectsList = state._sourceEffects.map(item =>
          Object.assign({}, item, { selected: false })
        );
        return Object.assign({}, state, {
          _sourceEffects: unselectedEffectsList,
          isFetching: false,
          effects: []
        });
      } else if (state.activeType === 'sub-effect') {
        const newCausesList = state._sourceEffects.map((item, idx) =>
          idx === state.effects[state.activeIndex]._listIndex
            ? Object.assign({}, item, {
                _data: [],
                _sources: item._sources.map(i =>
                  Object.assign({}, i, { selected: false })
                )
              })
            : item
        );
        return Object.assign({}, state, {
          _sourceEffects: newCausesList,
          isFetching: false,
          effects: newCausesList.filter(n => n.selected)
        });
      } else if (state.activeType === 'sub-cause') {
        const newEffects = state._sourceCauses.map((item, idx) =>
          idx === state.causes[state.activeIndex]._listIndex
            ? Object.assign({}, item, {
                _data: [],
                _sources: item._sources.map(i =>
                  Object.assign({}, i, { selected: false })
                )
              })
            : item
        );
        return Object.assign({}, state, {
          _sourceCauses: newEffects,
          isFetching: false,
          causes: newEffects.filter(n => n.selected)
        });
      }

      return;

    case types.UPDATE_PROBLEM:
      const { problem } = state;
      const updatedProblem =
        action.index === problem._listIndex
          ? { ...problem, link: action.payload.link, text: action.payload.text }
          : problem;

      return { ...state, problem: updatedProblem };

    case types.UPDATE_CAUSE:
      const updatedCauses = getParentUpdates(state._sourceCauses, action);

      return {
        ...state,
        _sourceCauses: updatedCauses,
        causes: updatedCauses.filter(cause => cause.selected),
        activeType: CAUSE_STRING
      };

    case types.UPDATE_SUB_CAUSE:
      const updatedSubCauses = getChildUpdates(state._sourceCauses, action);

      return {
        ...state,
        _sourceCauses: updatedSubCauses,
        isFetching: false,
        causes: updatedSubCauses.filter(subCause => subCause.selected)
      };

    case types.UPDATE_EFFECT:
      const updatedEffects = getParentUpdates(state._sourceEffects, action);

      return {
        ...state,
        _sourceEffects: updatedEffects,
        effects: updatedEffects.filter(effect => effect.selected),
        activeType: EFFECT_STRING
      };

    case types.UPDATE_SUB_EFFECT:
      const updatedSubEffects = getChildUpdates(state._sourceEffects, action);

      return {
        ...state,
        _sourceEffects: updatedSubEffects,
        isFetching: false,
        effects: updatedSubEffects.filter(subEffect => subEffect.selected)
      };

    case types.SWITCH_VIEW:
      return {
        ...state,
        view: action.view
      };

    case types.INITIAL_STATE:
      return Object.assign({}, initialState.topic);

    default:
      return state;
  }
}
