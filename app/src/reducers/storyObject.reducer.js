import {
  FETCH_STORY_OBJECT_REQUEST,
  FETCH_STORY_OBJECT_SUCCESS,
  FETCH_STORY_OBJECT_FAILURE
} from '../constants'

export default (state={}, action) => {
  
    switch(action.type) {
      case FETCH_STORY_OBJECT_REQUEST : {
        let a = {
          ...state[action.id],
          isFetching : true
        };
        state[action['id']] = a;
        return {...state};      
      }
      case FETCH_STORY_OBJECT_SUCCESS : {
        let a = {
          ...state[action.id],
          isFetching : false,
          data : action.payload
        };
        state[action['id']] = a;
        return {...state};
      }
      case FETCH_STORY_OBJECT_FAILURE : {
        let a = {
          ...state[action.id],
          isFetching : false,
          data : action.error
        };
        state[action['id']] = a;
        return {...state};
      }
      default : {
        return state;
      }
    }
  
  };