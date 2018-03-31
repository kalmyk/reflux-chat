import React from 'react';
import Reflux from 'reflux';
import MessageStore from '../stores/MessageStore';

export default class MessageSending extends Reflux.Component
{

  constructor(props)
	{
		super(props);
		this.store = MessageStore;
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
