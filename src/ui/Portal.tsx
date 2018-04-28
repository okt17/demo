import * as React from 'react';
import { createPortal } from 'react-dom';

class Portal extends React.PureComponent {
  container = document.body.appendChild( document.createElement( 'div' ) );
  componentWillUnmount () {
    document.body.removeChild( this.container );
  }
  render () {
    return createPortal(
      this.props.children,
      this.container,
    );
  }
}

export default Portal;
