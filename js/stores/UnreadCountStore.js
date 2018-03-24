import Reflux from 'reflux';
import array from 'lodash/array';
import ThreadStore from './ThreadStore';

let UnreadCountStore = Reflux.createStore({

  init() {
    this.listenTo(ThreadStore, this.onThreadChange);
  },

  onThreadChange(threads) {
    this.trigger(Object.keys(threads).reduce((count, threadID) => {
      return count + (array.last(threads[threadID]).isRead ? 0 : 1);
    }, 0));
  },

});

export default UnreadCountStore;
