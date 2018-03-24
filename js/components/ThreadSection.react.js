import React from 'react';
import array from 'lodash/array';
import ThreadListItem from '../components/ThreadListItem.react';
import MessageSending from '../components/MessageSending.react';
import ThreadStore from '../stores/ThreadStore';
import CurrentThreadStore from '../stores/CurrentThreadStore';
import UnreadCountStore from '../stores/UnreadCountStore';

export default class ThreadSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      threads: {},
      currentThreadID: null,
      unreadCount: 0
    };
  }

  componentDidMount() {
    this.unsubscribe1 = ThreadStore.listen(this._onChangeThread.bind(this));
    this.unsubscribe2 = CurrentThreadStore.listen(this._onChangeCurrentThread.bind(this));
    this.unsubscribe3 = UnreadCountStore.listen(this._onChangeUnreadCount.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe1();
    this.unsubscribe2();
    this.unsubscribe3();
  }

  render() {
    let threadListItems = Object.keys(this.state.threads).map(threadID => {
      let messages = this.state.threads[threadID];
      return (
        <ThreadListItem
          key={threadID}
          lastMessage={array.last(messages)}
          currentThreadID={this.state.currentThreadID}
        />
      );
    });

    let unread =
      this.state.unreadCount === 0 ?
      null :
      <span>Unread threads: {this.state.unreadCount}</span>;

    return (
      <div className="thread-section">
        <div className="thread-count">
          {unread}
        </div>
        <ul className="thread-list">
          {threadListItems}
        </ul>
        <MessageSending />
      </div>
    );
  }

  _onChangeThread(threads) {
    this.setState({ threads });
  }

  _onChangeCurrentThread(currentThreadID) {
    this.setState({ currentThreadID });
  }

  _onChangeUnreadCount(unreadCount) {
    this.setState({ unreadCount });
  }

};
