import { createStore, applyMiddleware, combineReducers} from "redux";
import user from "../reducers/user";
import posts from "../reducers/posts";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const reducers = combineReducers({user,posts});
const store = createStore(reducers, composedEnhancer);
export default store;
