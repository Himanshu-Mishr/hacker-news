import { combineReducers } from 'redux';

import storyIdList from './storyIdList.reducer';
import storyMode from './storyMode.reducer';
import readerMode from './readerMode.reducer';
import viewedStoryIdList from './viewedStoryIdList.reducer';
import currentlyViewingStory from './currentlyViewingStory.reducer';
import storyObject from './storyObject.reducer';


export default combineReducers({
  // loads all story list ids
  storyIdList,

  // story DB
  storyObject,

  // sets reader view as article or comment mode
  storyMode,

  // sets currently viewing story into it.
  currentlyViewingStory,

  // contains id list of stories that has been viewed
  viewedStoryIdList,

  // comment or article mode
  readerMode,

})