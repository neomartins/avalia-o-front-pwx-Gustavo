import * as types from './actionTypes';
import { fetchUtil, fetchGetUtil, fetchDeleteUtil } from '../utils/fetchUtils';


export function getPerson_Success(person) {
  return { 
    type: types.GET_PERSON_SUCCESS, 
    person
   };
}

export function getPerson_Fail(person) {
  return { 
    type: types.GET_PERSON_FAIL, 
    person
   };
}

export function deletePerson_Success(person){
  return {
    type: types.GET_PERSON_SUCCESS_DELETED, 
    person
  };
}

export function updatePerson_Success(person){
  return {
    type: types.GET_PERSON_SUCCESS_UPDATED, 
    person
  };
}

export function insertPerson_Success(person){
  return {
    type: types.GET_PERSON_SUCCESS_INSERTED, 
    person
  };
}

export function getPerson(person) {
   return function (dispatch){
    return dispatch(getPerson_Success(fetchGetUtil('person')));
  };
}

export function getPersonById(personId) {
  return function (dispatch){
    return dispatch(getPerson_Success(fetchGetUtil(`person/${personId}`)));
  };
}

export function updatePerson(person) {
  return function (dispatch){
      return dispatch(updatePerson_Success(fetchUtil('PUT', 'person', person)));
    };
}

export function savePerson(person) {
  return function (dispatch){
    return dispatch(insertPerson_Success(fetchUtil('POST', 'person', person)));
  };
}

export function deletePerson(id) {
  return function (dispatch){
    return dispatch(deletePerson_Success(fetchDeleteUtil('person', id)));
  };
}

export function searchPerson(person){
  return function (dispatch){
    return dispatch(getPerson_Success(person));
  };
}