import React, { Component } from 'react';

class Control extends Component {
	render() {
		console.log('Subject render');
		return (
			<url>
				<li><a href="/create">create</a></li>
				<li><a href="/update">update</a></li>
				<li><input type="button" value="delete"></input></li>
			</url>
		);
	}
}

export default Control;
