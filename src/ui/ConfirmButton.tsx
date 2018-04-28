import * as React from 'react';
import { Button } from 'react-bootstrap';
import Modal from './Modal';

interface IProps extends Button.ButtonProps {
  modalText?: string;
}

interface IState {
  confirmModalVisible: boolean;
}

class ConfirmButton extends React.PureComponent<IProps, IState> {
  static defaultProps: Partial<IProps> = {
    modalText: 'Are you sure?',
  };
  state: IState = {
    confirmModalVisible: false,
  };
  // we're using lambda properties instead of class methods
  // in order to preserve context
  // the other way around is to .bind( this ) every method in the constructor
  // the downside of this is that unlike traditional methods,
  // lambda property won't be present on the prototype
  openConfirmModal = () => this.setState( {
    confirmModalVisible: true,
  } );
  closeConfirmModal = () => this.setState( {
    confirmModalVisible: false,
  } );
  handleAcceptClick = ( event: React.MouseEvent<Button> ) => {
    if ( typeof this.props.onClick === 'function' ) {
      this.props.onClick( event );
    }
    this.closeConfirmModal();
  };
  render () {
    const {
      state: {
        confirmModalVisible,
      },
      props: {
        modalText,
        onClick,
        ...restProps,
      },
    } = this;

    return <>
      <Button
        {...restProps}
        onClick={this.openConfirmModal}
      />

      {
        confirmModalVisible
        &&
        <Modal
          title='Accept action'
          footerContent={<>
            <Button
              bsStyle='primary'
              onClick={this.handleAcceptClick}
            > Accept
            </Button>
    
            <Button
              onClick={this.closeConfirmModal}
            > Cancel
            </Button>
          </>}
        > {modalText}
        </Modal>
      }
    </>;
  }
}

export default ConfirmButton;
