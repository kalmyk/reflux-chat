// This file bootstraps the entire application.

import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './components/ChatApp.react';
import * as Actions from './actions';
import * as ChatDataServer from './ChatDataServer';

ChatDataServer.openConnection().then(
  (result) => { Actions.loadRawMessages(); }
);

ReactDOM.render(
  <ChatApp />,
  document.getElementById('react')
);
