import {
  FETCH_STORY_LIST_REQUEST,
  FETCH_STORY_LIST_SUCCESS,
  FETCH_STORY_LIST_FAILURE
} from '../constants';

export default (state={
  isFetching : false,
  list : []
}, action) => {

  switch(action.type) {
    case FETCH_STORY_LIST_REQUEST : {
      return {
        ...state,
        isFetching : true
      };
    }
    case FETCH_STORY_LIST_SUCCESS : {
      return {
        ...state,
        isFetching : false,
        list : action.response.data
      };
    }
    case FETCH_STORY_LIST_FAILURE : {
      return {
        isFetching : false,
        error : action.error
      };
    }
    default :
      return state;    
  }  


}