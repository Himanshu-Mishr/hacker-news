import { combineReducers } from 'redux';

import storyIdList from './storyIdList.reducer';
import storyMode from './storyMode.reducer';
import readerMode from './readerMode.reducer';
import viewedStoryIdList from './viewedStoryIdList.reducer';
import currentlyViewingStory from './currentlyViewingStory.reducer';

export default combineReducers({
  storyIdList,
  storyMode,
  currentlyViewingStory,
  viewedStoryIdList,
  readerMode
})