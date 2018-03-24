import Reflux from 'reflux';
import array from 'lodash/array';
import * as Actions from '../actions';

let CurrentThreadStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.loadRawMessages.completed, this.gotRawMessages);
    this.listenTo(Actions.clickThread, this.changeThread)
  },

  gotRawMessages(rawMessages) {
    let msg = array.last(rawMessages);
    if (msg)
      this.trigger(msg.threadID);
  },

  changeThread(threadID) {
    this.trigger(threadID);
  }

});

export default CurrentThreadStore;
