import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: `153415930777-da3bhqpmth3cr2rpsrcrjgfshk63q97n.apps.googleusercontent.com`,
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = isSignedIn => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = event => {
		this.auth.signIn();
	};

	onSignOutClick = event => {
		this.auth.signOut();
	};

	renderAuthButton = () => {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<div>
					<button
						className="ui red google button"
						onClick={this.onSignOutClick}
					>
						<i className="google icon" />
						Sign Out
					</button>
				</div>
			);
		} else {
			return (
				<div>
					<button
						className="ui green google button"
						onClick={this.onSignInClick}
					>
						<i className="google icon" />
						Sign In with Google
					</button>
				</div>
			);
		}
	};

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = ({ googleAuth }) => {
	return { isSignedIn: googleAuth.isSignedIn };
};

export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);
