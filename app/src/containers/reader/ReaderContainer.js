import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReaderHeader from './ReaderHeader';
import ReaderModeContainer from './ReaderModeContainer';
import CommentModeContainer from './CommentModeContainer';


@connect((store, action) => {
  return {
    readerMode : store.readerMode
  }
})
class ReaderContainer extends Component {

  getReaderModeContainer() {
    if(this.props.readerMode === 'article') {
      return (<ReaderModeContainer />);
    } else {
      return (<CommentModeContainer />)
    }
  }


  render() {
    return (
      <div>
        <ReaderHeader />
        {this.getReaderModeContainer()}
      </div>
    );
  }

}

export default ReaderContainer;