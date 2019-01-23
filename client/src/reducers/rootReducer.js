import { combineReducers } from 'redux'
import {streamReducer} from './streamReducer'
import { dataReducer } from './dataReducer';
import { mostRecentDataReducer } from './mostRecentData';


const rootReducer = combineReducers({
  stream:streamReducer,
  data:dataReducer,
  recent:mostRecentDataReducer
});

export default rootReducer