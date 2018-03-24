import Reflux from 'reflux';
import {loadingStarted, loadingFinished} from '../actions';

export default class MessageSendingStore extends Reflux.Store
{
  constructor()
	{
		super();
		this.state.messageSending = false;
    this.listenToMany({loadingStarted, loadingFinished});
	}

  onLoadingStarted()
  {
    this.setState({messageSending: true});
  }

  onLoadingFinished()
  {
    this.setState({messageSending: false});
  }
}
