import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Provider,
  connect,
} from 'react-redux';
import store from './store';
import App from './components/App';
import './style';

function mapStateToProps ( state: any ) {
  return state;
}

const ConnectedApp = connect( mapStateToProps )( App );

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>,
  document.getElementById('app-root'),
);
