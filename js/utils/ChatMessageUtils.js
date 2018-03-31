export function convertRawMessage(rawMessage, threadId) {
  return {
    ...rawMessage,
    date: new Date(rawMessage.timestamp),
    isRead: rawMessage.threadID === threadId
  };
};

export function getCreatedMessageData(text, threadId, threadName) {
  var timestamp = Date.now();
  return {
    id: 'm_' + timestamp,
    threadID: threadId,
    threadName, threadName,
    authorName: 'Bill', // hard coded for the example
    date: new Date(timestamp),
    text: text,
    isRead: true
  };
};
