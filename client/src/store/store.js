import {createStore, combineReducers} from 'redux'
import { counterReduce } from './counterReduce';
import { setdarkMode } from './modeReduce';

const rootReduce = combineReducers({
    mode: setdarkMode,
    counter: counterReduce,
})

const store = createStore(rootReduce);

export default store;
