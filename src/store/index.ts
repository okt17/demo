import { createStore } from 'redux';
import appReducer from '../reducers/App';

const store = createStore( appReducer );

export default store;
