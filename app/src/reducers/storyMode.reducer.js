import {
  DEFAULT_STORY_MODE,
  SET_STORY_MODE,
  SET_DEFAULT_STORY_MODE
} from '../constants'

export default (state=DEFAULT_STORY_MODE, action) => {

  switch(action.type) {
    case SET_STORY_MODE: {
      return action.payload;
    }
    case SET_DEFAULT_STORY_MODE : {
      return DEFAULT_STORY_MODE;
    }
    default : {
      return state;
    }
  }

}