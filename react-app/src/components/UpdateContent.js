import React, { Component } from 'react';

class UpdateContent extends Component {
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
					<p><input type="text" name="title" placeholder="title"></input></p>
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
