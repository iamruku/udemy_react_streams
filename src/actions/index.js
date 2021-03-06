import * as actionTypes from './types';
import history from '../history';
import streamsApi from '../apis/streams';

export const signIn = userId => {
	return { type: actionTypes.SIGN_IN, payload: userId };
};
export const signOut = () => {
	return { type: actionTypes.SIGN_OUT };
};

export const createStream = formValues => async (dispatch, getState) => {
	const { userId } = getState().googleAuth;
	const response = await streamsApi.post('/streams', { ...formValues, userId });
	dispatch({ type: actionTypes.CREATE_STREAM, payload: response.data });
	history.push('/');
};
export const deleteStream = id => async dispatch => {
	await streamsApi.delete(`/streams/${id}`);
	dispatch({ type: actionTypes.DELETE_STREAM, payload: id });
};
export const editStream = (id, formValues) => async dispatch => {
	const response = await streamsApi.patch(`/streams/${id}`, formValues);
	dispatch({ type: actionTypes.EDIT_STREAM, payload: response.data });
	history.push('/');
};
export const fetchStreams = () => async dispatch => {
	const response = await streamsApi.get('/streams');
	dispatch({ type: actionTypes.FETCH_STREAMS, payload: response.data });
};
export const fetchStream = id => async dispatch => {
	const response = await streamsApi.get(`/streams/${id}`);
	dispatch({ type: actionTypes.FETCH_STREAM, payload: response.data });
};
