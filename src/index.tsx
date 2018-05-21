import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Provider,
  connect,
} from 'react-redux';
import {
  bindActionCreators,
} from 'redux';
import store from './store';
import App from './components/App';
import * as appActions from './actions/App';
import './style';

function mapStateToProps ( state: any ) {
  return state;
}

function mapDispatchToProps( dispatch: any ) {
  return {
    appActions: bindActionCreators( appActions, dispatch ),
  };
}

const ConnectedApp = connect( mapStateToProps, mapDispatchToProps )( App );

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>,
  document.getElementById( 'app-root' ),
);
