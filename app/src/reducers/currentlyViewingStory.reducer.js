import {
  SET_CURRENT_STORY,
} from '../constants'



export default (state={}, action) => {

  switch(action.type) {
    case SET_CURRENT_STORY: {
      return action.payload;
    }
    default : {
      return state;
    }
  }

}