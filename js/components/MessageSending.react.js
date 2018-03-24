import React from 'react';
import Reflux from 'reflux';
import MessageSendingStore from '../stores/MessageSendingStore';

export default class MessageSending extends Reflux.Component
{

  constructor(props)
	{
		super(props);
		this.store = MessageSendingStore;
    this.storeKeys = ['messageSending'];
	}

  render() {

    let messageSending =
      this.state.messageSending ?
      <span>Message Sinding...</span> :
      null;

    return (
      <div className="message-sending">
        {messageSending}
      </div>
    );
  }

};
