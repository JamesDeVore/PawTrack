import { combineReducers } from 'redux'
import {streamReducer} from './streamReducer'
import { dataReducer } from './dataReducer';
import { coordsReducer } from './coordsReducer';


const rootReducer = combineReducers({
  stream:streamReducer,
  data:dataReducer,
  coords:coordsReducer
});

export default rootReducer