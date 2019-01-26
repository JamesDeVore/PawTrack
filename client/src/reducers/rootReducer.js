import { combineReducers } from 'redux'
import {streamReducer} from './streamReducer'
import { dataReducer } from './dataReducer';
import { mostRecentDataReducer } from './mostRecentData';
import dashReducer from './dashReducer'


const rootReducer = combineReducers({
  stream:streamReducer,
  data:dataReducer,
  recent:mostRecentDataReducer,
  dash:dashReducer
});

export default rootReducer