import Reflux from 'reflux';
import collection from 'lodash/collection';
import MessageStore from './MessageStore';

let ThreadStore = Reflux.createStore({

  init() {
    this.listenTo(MessageStore, this.messagesChanged);
  },

  messagesChanged(messages) {
    let threads = collection.groupBy(messages, 'threadID');
    Object.keys(threads).forEach(threadID => {
      let messages = threads[threadID];
      let threadName = messages[0].threadName;
      for (let message of messages) {
        message.threadName = threadName;
      }
    });
    this.trigger(threads);
  }

});

export default ThreadStore;
