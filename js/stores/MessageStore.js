import Reflux from 'reflux';
import array from 'lodash/array';
import * as ChatMessageUtils from '../utils/ChatMessageUtils';
import * as Actions from '../actions';

let MessageStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.loadRawMessages.completed, this.loadedRawMessages);
    this.listenTo(Actions.messageArrived, this.messageCreated);
    this.listenTo(Actions.createMessage.completed, this.receiveNewMessage);
    this.listenTo(Actions.clickThread, this.changeThread);
  },

  loadedRawMessages(messages) {
    let lastThread = array.last(messages);
    this._messages = messages.map(m => {
      let message = ChatMessageUtils.convertRawMessage(m);
      message.isRead = message.threadID === lastThread.threadID ? true : false;
      return message;
    });
    this.triggerEvent();
  },

  messageCreated(message) {
    this._messages.push(ChatMessageUtils.convertRawMessage(message));
    this.triggerEvent();
  },

  receiveNewMessage({rawMessage, tempMessageID}) {
    array.remove(this._messages, m => m.id === tempMessageID);
    let message = ChatMessageUtils.convertRawMessage(rawMessage);
    message.isRead = true;
    this._messages.push(message);
    this.triggerEvent();
  },

  changeThread(threadID) {
    for (let message of this._messages) {
      if (message.threadID === threadID) {
        message.isRead = true;
      }
    }
    this.triggerEvent();
  },

  triggerEvent() {
    this.trigger(this._messages);
  }

});

export default MessageStore;
