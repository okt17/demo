import * as React from 'react';
import { Modal as BSModal } from 'react-bootstrap';
import Portal from './Portal';

interface IProps {
  title: string;
  footerContent: React.ReactNode;
  onBackgroundClick? (): void;
}

class Modal extends React.PureComponent<IProps> {
  dialogParentElement: HTMLDivElement;
  handleParentRef = ( instance: HTMLDivElement ) => {
    this.dialogParentElement = instance;
  };
  handleClick = ( event: { target: any } ) => {
    if ( this.dialogParentElement === event.target.parentElement ) {
      this.props.onBackgroundClick();
    }
  };
  render () {
    const {
      title,
      footerContent,
      children,
      onBackgroundClick,
    } = this.props;
    
    return <Portal>
      <div className='static-modal'
        ref={this.handleParentRef}
      >
        <BSModal.Dialog
          onClick={
            typeof onBackgroundClick === 'function'
              ? this.handleClick
              : undefined
          }
        >
          <BSModal.Header>
            <BSModal.Title>
              {title}
            </BSModal.Title>
          </BSModal.Header>
          <BSModal.Body>
            {children}
          </BSModal.Body>
          <BSModal.Footer>
            {footerContent}
          </BSModal.Footer>
        </BSModal.Dialog>
      </div>
    </Portal>
  }
}

export default Modal;
