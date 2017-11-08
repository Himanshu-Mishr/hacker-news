import { combineReducers } from 'redux';

import storyIdList from './storyIdList.reducer';
import storyMode from './storyMode.reducer';
import readerMode from './readerMode.reducer';
import viewedStoryIdList from './viewedStoryIdList.reducer';
import currentlyViewingStory from './currentlyViewingStory.reducer';
import storyObject from './storyObject.reducer';


export default combineReducers({
  // 
  /**
   * contains all story list ids that are currently shown
   * @type {Array}
   * @example [15643050, 15642591, 15642880, 15643844, 15643791, 15643747, 15642343, 15643192, ...]
   */
  storyIdList,

  // 
  /**
   * story DB
   * @type {Object}
   * @example {
   *       storyId   : {
   *           isFetching: Boolean,
   *           data      : {
   *             "by"         : "wolframio",
   *             "descendants": 18,
   *             "id"         : 15642041,
   *             "kids"       : [15643050, 15642591, 15642880, 15643844, 15643791, 15643747, 15642343, 15643192],
   *             "score"      : 187,
   *             "time"       : 1510047676,
   *             "title"      : "Hackers mod an inexpensive GPS quadcopter with open source to add more features",
   *             "type"       : "story",
   *             "url"        : "http://dronegarageblog.wordpress.com/index.html"
   *           }
   *    
   *         }
   *
   *   }
   */
  storyObject,


  /**
   * contains id list of stories that has been viewed
   * @type {Array on numbers}
   * @example : [15642116,15642041,15642276,15643663,15643429, ...]
   */
  viewedStoryIdList,

  /**
   * story mode 
   * @type {String}
   * possible values : topstories | newstories | askstories | showstories | beststories
   * @example : 'topstories'
   * 
   */
  storyMode,

  // sets currently viewing story into it.
  currentlyViewingStory,

  // sets reader view as article or comment mode
  readerMode,

})