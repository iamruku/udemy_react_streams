import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import googleAuthReducer from './googleAuthReducer';
import streamsReducer from './streamsReducer';

export default combineReducers({
	form: reduxFormReducer,
	googleAuth: googleAuthReducer,
	streams: streamsReducer
});
