import React from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';
import MessageStore from '../stores/MessageStore';

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

export default class MessageSection extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = MessageStore;
    this.storeKeys = ['currentThreadName', 'currentThreadID', 'threads'];
  }

  render() {
    let messageListItems =
      (this.state.currentThreadID && this.state.threads[this.state.currentThreadID]) ?
      this.state.threads[this.state.currentThreadID].map(getMessageListItem) :
      null;

    let composer =
      this.state.currentThreadID ?
      <MessageComposer threadId={this.state.currentThreadID} threadName={this.state.currentThreadName} /> :
      null;

    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{this.state.currentThreadName}</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        {composer}
      </div>
    );
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    if (this.refs.messageList) {
      let ul = ReactDOM.findDOMNode(this.refs.messageList);
      ul.scrollTop = ul.scrollHeight;
    }
  }

};
