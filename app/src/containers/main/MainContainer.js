import React, { Component } from 'react';

import MainHeader from './MainHeader';
import StoryListContainer from './StoryListContainer';

class MainContainer extends Component {

  render() {
    return (
      <div>
        <MainHeader />
        <StoryListContainer />
      </div>
    );
  }

}

export default MainContainer;