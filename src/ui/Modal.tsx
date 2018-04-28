import * as React from 'react';
import { Modal as BSModal } from 'react-bootstrap';
import Portal from './Portal';

interface IProps {
  title: string;
  footerContent: React.ReactNode;
}

const Modal: React.SFC<IProps> = ( {
  title,
  footerContent,
  children,
} ) => <Portal>
  <div className='static-modal'>
    <BSModal.Dialog>
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
</Portal>;

export default Modal;
