import Reflux from 'reflux';
import array from 'lodash/array';
import collection from 'lodash/collection';
import * as Actions from '../actions';
import * as ChatMessageUtils from '../utils/ChatMessageUtils';

export default class MessageSendingStore extends Reflux.Store
{
  constructor()
	{
		super();

		this.state.messageSending = false;
    this.state.threads = {};
    this.state.currentThreadID = null;
    this.state.currentThreadName = 'CUR-THREAD-NAME';
    this.state.unreadCount = 0;

    this.listenToMany(Actions);
	}

  onLoadingStarted()
  {
    this.setState({messageSending: true});
  }

  onLoadingFinished()
  {
    this.setState({messageSending: false});
  }

  calcUnreadCount(threads) {
    let unreadCount = 0;
    for (let threadId in threads) {
      if (!array.last(threads[threadId]).isRead)
        unreadCount++;
    }
    return unreadCount;
  }

  onMessageArrived(rawMessage) {
    let message = ChatMessageUtils.convertRawMessage(rawMessage);
    message.isRead = message.threadID == this.state.currentThreadID;
    this.state.threads[message.threadID].push(message);
    this.setState({
      threads:this.state.threads,
      unreadCount: this.calcUnreadCount(this.state.threads)
    });
   }

   onClickThread(threadId) {
    let unreadCount = this.state.unreadCount + 1;
    let msgs = this.state.threads[threadId];

    for (let message of msgs) {
      message.isRead = true;
    }

    this.setState({
      currentThreadID: threadId,
      currentThreadName: msgs[0].threadName,
      unreadCount: this.calcUnreadCount(this.state.threads)
    });
  }

  onLoadRawMessagesCompleted(rawMessages)
  {
    let messages = rawMessages.map(m => {
      let message = ChatMessageUtils.convertRawMessage(m);
      return message;
    });

    let threads = collection.groupBy(messages, 'threadID');
    let lastThreadId;

    Object.keys(threads).forEach(threadID => {
      lastThreadId = threadID;
    });

    Object.keys(threads).forEach(threadID => {
      threads[threadID].map(message => {
        message.isRead = message.threadID === lastThreadId;
        return message;
      });
    });

    this.setState({
      currentThreadID: lastThreadId,
      currentThreadName: threads[lastThreadId][0].threadName,
      threads: threads,
      unreadCount: this.calcUnreadCount(threads)
    });
  }
}
