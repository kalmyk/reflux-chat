import Reflux from 'reflux';
import * as ChatMessageUtils from './utils/ChatMessageUtils';
import * as ChatDataServer from './ChatDataServer';

export let loadRawMessages = Reflux.createAction({
  asyncResult: true
});

loadRawMessages.listen(function () {
  ChatDataServer.getMessages(this.completed);
});

export let loadingStarted = Reflux.createAction();

export let loadingFinished = Reflux.createAction();

export let clickThread = Reflux.createAction();

export let messageArrived = Reflux.createAction();

export let createMessage = Reflux.createAction({
  asyncResult: true
});

createMessage.listen(function (text, threadId, threadName) {
  let message = ChatMessageUtils.getCreatedMessageData(text, threadId, threadName);
  loadingStarted();
  ChatDataServer.postMessage(message, rawMessage => {
    loadingFinished();
  });
});
