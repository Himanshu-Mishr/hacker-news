import {
  DEFAULT_READER_MODE,
  SET_READER_MODE,
  SET_DEFAULT_READER_MODE
} from '../constants'

export default (state=DEFAULT_READER_MODE, action) => {

  switch(action.type) {
    case SET_READER_MODE: {
      return action.payload;
    }
    case SET_DEFAULT_READER_MODE : {
      return DEFAULT_READER_MODE;
    }
    default : {
      return state;
    }
  }

}