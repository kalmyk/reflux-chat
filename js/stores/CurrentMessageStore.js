import Reflux from 'reflux';
import ThreadStore from './ThreadStore';
import CurrentThreadStore from './CurrentThreadStore';

let CurrentMessageStore = Reflux.createStore({

  init() {
    this.listenTo(ThreadStore, this.threadsChanged);
    this.listenTo(CurrentThreadStore, this.currentThreadChanged);
  },

  threadsChanged(threads) {
    this._threads = threads;
    if (this._currentThreadID != null) {
      this.triggerEvent();
    }
  },

  currentThreadChanged(threadID) {
    this._currentThreadID = threadID;
    if (this._threads) {
      this.triggerEvent();
    }
  },

  triggerEvent() {
    this.trigger(this._threads[this._currentThreadID]);
  }

});

export default CurrentMessageStore;
