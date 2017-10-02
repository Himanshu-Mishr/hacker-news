import {
  MARK_STORY_VIEWED,
  MARK_STORY_UNVIEWED
} from '../constants';

export default (state=[], action) => {

  switch(action.type) {
    case MARK_STORY_VIEWED : {
      if(state.indexOf(action.payload) > -1) {
        return state.concat();
      } else {
        return state.concat(action.payload);
      }
    }
    case MARK_STORY_UNVIEWED : {
      return state.filter((id) => id !== action.payload);
    }
    default :
      return state;
  }

}