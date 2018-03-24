var autobahn = require('autobahn');

let connection = new autobahn.Connection({
//  url: 'ws:'+window.location.host+'/wss',
  url: 'ws:localhost:9000',
  realm: 'realm1'
});

let session = null;
let crp = null;

let threadNameMap = (function () {
  let map = {};
//  messages.forEach(({threadID, threadName}) => {
//    map[threadID] = threadName;
//  });
  return map;
})();

export function openConnection() {
  return new Promise((resolve, reject) => {
    crp = resolve;
    connection.open();
  });
};

export function getMessages(callback) {
  session.call('chat.getMessages').then(
     function (messages) {
       callback(messages.args);
       session.log('chat.getMessages', messages);
     },
     function (error) {
        console.log("Call failed:", error);
     });
};

export function postMessage(message, callback) {
  let timestamp = Date.now();
  let id = 'm_' + timestamp;
  let threadID = message.threadID;

  let createdMessage = {
    id,
    threadID,
    threadName: threadNameMap[threadID],
    authorName: message.authorName,
    text: message.text,
    timestamp
  };

  session.call('chat.postMessage', [], {message:createdMessage}).then(
     function (message) {
       callback(message);
       session.log('chat.postMessage', message);
     },
     function (error) {
        console.log("Call failed:", error);
     });
};

function onEvent(publishArgs, kwargs, opts) {
   console.log('Event', opts.topic, 'received args', publishArgs, 'kwargs ',kwargs);
}

connection.onopen = function (newSession, details) {
  session = newSession;
  crp(null);
  console.log('Connected');

  session.subscribe('chat.messages', onEvent).then(
      function(subscription) {
         console.log("subscription successfull", subscription.topic);
      },
      function(error) {
         console.log("subscription failed", error);
      }
   );
}
