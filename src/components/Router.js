import React from 'react';
import { Router as ReactRouter, Route } from 'react-router-dom';

import history from '../history';

import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';

const Router = () => {
	return (
		<div>
			<ReactRouter history={history}>
				<div>
					<Header />
					<Route path="/" exact component={StreamList} />
					<Route path="/streams/new" exact component={StreamCreate} />
					<Route path="/streams/edit/:id" exact component={StreamEdit} />
					<Route path="/streams/delete/:id" exact component={StreamDelete} />
					<Route path="/streams/show/:id" exact component={StreamShow} />
				</div>
			</ReactRouter>
		</div>
	);
};

export default Router;
