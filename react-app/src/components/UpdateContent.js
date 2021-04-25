import React, { Component } from 'react';

class UpdateContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.title,
		}
	}
	render() {
		console.log(this.props.data); //data props가 잘 주입되었는지 확인
		console.log('UpdateContent render');
		return (
			<article>
				<h2>Update</h2>
				<form action="/create_process" method="post"
					onSubmit={function (e) {
						e.preventDefault(); //페이지변경 동작을 off
						// debugger;
						this.props.onSubmit(
							e.target.title.value,
							e.target.desc.value
						);
					}.bind(this)}
				>
					<p>
						<input
							type="text"
							name="title"
							placeholder="title"
							value={this.state.title}
							onChange={function(e) {
								//console.log(e.target.value);
								this.setState({title:e.target.value});
							}.bind(this)}
						></input>
					</p>
					<p>
						<textarea name="desc" placeholder="description"></textarea>
					</p>
					<p>
						<input type="submit"></input>
					</p>
				</form>
			</article>
		);
	}
}

export default UpdateContent;
