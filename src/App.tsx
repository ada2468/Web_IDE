import React, { useEffect } from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux';
import * as esbuild from 'esbuild-wasm';

import ContentPage from 'pages';
import reducer from 'redux/reducers';
import rootSaga from 'redux/saga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,composeEnhancers(
  applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);


const App: React.FC = () => {
  useEffect(() => {
    esbuild.initialize({
      wasmURL: './node_modules/esbuild-wasm/esbuild.wasm',
      worker: true
    }).catch()
  }, [])

  return (
    <Provider store={store}>
      <ContentPage />
    </Provider>
  )
}

export default App;
