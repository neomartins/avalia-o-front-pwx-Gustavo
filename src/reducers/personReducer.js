import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function personReducer(state = initialState.personState, action) {
  switch (action.type) {
    case types.GET_PERSON_FAIL:
      return Object.assign({}, state, { personFail: true });
    case types.GET_PERSON_SUCCESS:
      return Object.assign({}, state, { person: action.person, personFail : false, deleted: false, updated: false, inserted: false});
    case types.GET_PERSON_SUCCESS_DELETED:
      return Object.assign({}, state, { person: action.person, personFail : false, deleted: true, updated: false, inserted: false});
   	case types.GET_PERSON_SUCCESS_UPDATED:
      return Object.assign({}, state, { person: action.person, personFail : false, deleted: true, updated: true, inserted: false});
    case types.GET_PERSON_SUCCESS_INSERTED:
      return Object.assign({}, state, { person: action.person, personFail : false, deleted: true, updated: false, inserted: true});
    default:
      return state;
  }
}
