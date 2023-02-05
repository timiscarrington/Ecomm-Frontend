import { createStore, compose } from "redux";
import rootReducers from "./reducer";

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  // applyMiddleware(...middleware),
  // other store enhancers if any
);

const store = createStore(rootReducers, enhancer);

export default store;
