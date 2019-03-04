import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas/index';

const rootReducers = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

const logger = (state) => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        }
    }
};

const sagaMiddleWare = createSagaMiddleware();
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] : null) || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(logger, sagaMiddleWare)));

sagaMiddleWare.run(watchAuth);
sagaMiddleWare.run(watchBurgerBuilder);
sagaMiddleWare.run(watchOrder);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
