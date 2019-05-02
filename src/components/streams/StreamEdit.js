import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	componentDidUpdate() {
		if (!this.props.stream) {
			this.props.fetchStream(this.props.match.params.id);
		}
	}

	onSubmit = formValues => {
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<h3>Edit Stream</h3>
				<StreamForm
					initialValues={_.pick(this.props.stream, 'title', 'description')}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

const mapStateToProps = ({ streams }, ownProps) => {
	return { stream: streams[ownProps.match.params.id] };
};

export default connect(
	mapStateToProps,
	{ fetchStream, editStream }
)(StreamEdit);
