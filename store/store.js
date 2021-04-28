import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import userReducer from "./userDetail";
import modalReducer from "./modalHandler";

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;
