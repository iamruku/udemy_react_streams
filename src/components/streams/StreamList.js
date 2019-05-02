import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderAdminButtons = stream => {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						Edit
					</Link>
					<Link to={`/streams/delete/${stream.id}`} className="ui button red">
						Delete
					</Link>
				</div>
			);
		}
	};

	renderList = () => {
		return this.props.streams.map(stream => {
			return (
				<div className="item" key={stream.id}>
					<div>{this.renderAdminButtons(stream)}</div>
					<i className="large middle aligned icon camera" />
					<div className="content">
						<div>{stream.title}</div>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	};

	renderCreateButton = () => {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button green">
						Create New Stream
					</Link>
				</div>
			);
		}
	};

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderList()}</div>
				{this.renderCreateButton()}
			</div>
		);
	}
}

const mapStateToProps = ({ streams, googleAuth }) => {
	return {
		streams: Object.values(streams),
		isSignedIn: googleAuth.isSignedIn,
		currentUserId: googleAuth.userId
	};
};

export default connect(
	mapStateToProps,
	{ fetchStreams }
)(StreamList);
