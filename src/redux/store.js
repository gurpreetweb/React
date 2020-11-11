import { compose,createStore,applyMiddleware,combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; 
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import {reducer as formReducer } from 'redux-form'

import signupReducer from './reducers/signup/index'
import loginReducer from './reducers/login/index'
import userReducer from './reducers/userData';
import { reducer as voxeet } from '@voxeet/react-components';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import sagas from './rootSaga';


const rootReducer = combineReducers({
    signup:signupReducer,
    login:loginReducer,
    userData:userReducer,
    form:formReducer,
    voxeet:voxeet
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [];

const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);
middleware.push(thunkMiddleware);

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleware.run(sagas);

export default store;