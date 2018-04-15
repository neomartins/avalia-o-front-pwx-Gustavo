import React from 'react';
import BaseComponent from '../components/BaseComponent';
import CircularProgress from 'material-ui/CircularProgress';
import './loadPage.css'

class LoadingPage extends BaseComponent {
	constructor(props){
		super(props);
	}

	render(){
		if(this.props.isLoading){
			return (<div className="load">
						<CircularProgress size={50}/>
					</div>)
		}
		return <div/>
	}
}

export default (LoadingPage);