import React from 'react';
import ReactDOM from 'react-dom';
import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';
import CurrentMessageStore from '../stores/CurrentMessageStore';

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

export default class MessageSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.unsubscribe = CurrentMessageStore.listen(this._onChange.bind(this));
    this._scrollToBottom();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.messages) {
      let messageListItems = this.state.messages.map(getMessageListItem);
      return (
        <div className="message-section">
          <h3 className="message-thread-heading">{this.state.messages[0].threadName}</h3>
          <ul className="message-list" ref="messageList">
            {messageListItems}
          </ul>
          <MessageComposer threadID={this.state.messages[0].threadID}/>
        </div>
      );
    } else {
      return <div className="message-section"></div>;
    }
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

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange(messages) {
    this.setState({ messages });
  }

};
