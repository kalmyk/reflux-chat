import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Actions from '../actions';

class ThreadListItem extends React.Component {

  render() {
    let lastMessage = this.props.lastMessage;
    return (
      <li
        className={classNames({
          'thread-list-item': true,
          'active': lastMessage.threadID === this.props.currentThreadID
        })}
        onClick={this._onClick.bind(this)}>
        <h5 className="thread-name">{lastMessage.threadName}</h5>
        <div className="thread-time">
          {lastMessage.date.toLocaleTimeString()}
        </div>
        <div className="thread-last-message">
          {lastMessage.text}
        </div>
      </li>
    );
  }

  _onClick() {
    Actions.clickThread(this.props.lastMessage.threadID);
  }

};

ThreadListItem.propTypes = {
  thread: PropTypes.object,
  currentThreadID: PropTypes.string
};

export default ThreadListItem;
