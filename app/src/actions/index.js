import axios from 'axios';

import {
  SET_STORY_MODE, 
  SET_DEFAULT_STORY_MODE,
  FETCH_STORY_LIST_REQUEST,
  FETCH_STORY_LIST_SUCCESS,
  FETCH_STORY_LIST_FAILURE,
  MARK_STORY_VIEWED,
  MARK_STORY_UNVIEWED,
  SET_CURRENT_STORY,
  SET_READER_MODE, 
  SET_DEFAULT_READER_MODE
} from '../constants';

/**
 * set mode dispatch action function
 * @param {string} mode 
 */
export const setStoryModeAction = function(mode) {
  return function action(dispatch, getState) {
    dispatch({type : SET_STORY_MODE, payload : mode});
    fetchStoryList(dispatch, getState);
   };
};


/**
 * set default mode dispatch action function
 */
export const setDefaultStoryModeAction = function() {
  return function action(dispatch) {
    dispatch({type : SET_DEFAULT_STORY_MODE});
  }
};


/**
 * fetches list of all id of a story mode
 * 
 * @param {any} dispatch 
 * @param {any} getState 
 */
function fetchStoryList(dispatch, getState) {
  const storyMode = getState().storyMode;

  dispatch({type : FETCH_STORY_LIST_REQUEST});
  axios.get(`https://hacker-news.firebaseio.com/v0/${storyMode}.json`)
  .then((response) => {
    dispatch({type : FETCH_STORY_LIST_SUCCESS, response : response});
  })
  .catch((error) => {
    dispatch({type : FETCH_STORY_LIST_FAILURE, error : error});
  });
}

export const fetchStoryListAction = function () {
  return function action(dispatch, getState) {
    fetchStoryList(dispatch, getState);
  };
};


/**
 * mark story as read
 * @param {String} id story id
 */
export const markStoryAsViewed = function(id) {
  return function action(dispatch) {
    dispatch({type : MARK_STORY_VIEWED, payload : id});
  }
};


/**
 * unmark story as read
 * @param {String} id story id
 */
export const unMarkStoryAsViewed = function(id) {
  return function action(dispatch) {
    dispatch({type : MARK_STORY_UNVIEWED, payload : id});
  }
};


/**
 * set currently viewing story
 * @param {string} mode 
 */
export const setCurrentlyViewingStoryAction = function(story) {
  return function action(dispatch, getState) {
    dispatch({type : SET_CURRENT_STORY, payload : story});
   };
};



/**
 * set mode dispatch action function
 * @param {string} mode 
 */
export const setReaderModeAction = function(mode) {
  return function action(dispatch, getState) {
    dispatch({type : SET_READER_MODE, payload : mode});
   };
};


/**
 * set default mode dispatch action function
 */
export const setDefaultReaderModeAction = function() {
  return function action(dispatch) {
    dispatch({type : SET_DEFAULT_READER_MODE});
  }
};
