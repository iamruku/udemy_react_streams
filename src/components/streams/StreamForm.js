import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
	renderInput = ({ input, label, meta }) => {
		const className = `field${meta.error && meta.touched ? ' error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderLabel = (text, mandatory) => {
		return (
			<div>
				<label>
					<span>{text}</span>
					{mandatory ? <span>&nbsp;*</span> : null}
				</label>
			</div>
		);
	};

	renderError = ({ error, touched }) => {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	};

	onSubmit = formValues => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form error"
				>
					<Field
						name="title"
						component={this.renderInput}
						label={this.renderLabel('Enter Title', true)}
					/>
					<Field
						name="description"
						component={this.renderInput}
						label={this.renderLabel('Enter Description', true)}
					/>
					<button type="submit" className="ui button primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

const validate = formValues => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'A title must be entered';
	}
	if (!formValues.description) {
		errors.description = 'A description must be entered';
	}
	return errors;
};

export default reduxForm({
	form: 'StreamForm',
	validate
})(StreamForm);
