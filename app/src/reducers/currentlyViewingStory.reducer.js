import {
  SET_CURRENT_STORY,
  UNSET_CURRENT_STORY
} from '../constants'



export default (state={}, action) => {

  switch(action.type) {
    case SET_CURRENT_STORY: {
      return action.payload;
    }
    case UNSET_CURRENT_STORY: {
      return {};
    }
    default : {
      return state;
    }
  }

}