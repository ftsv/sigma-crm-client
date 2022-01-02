import React from 'react';
import { Toast } from 'react-bootstrap';
import { IToast } from '../../types/Toast';
import { InfoSquareFill } from 'react-bootstrap-icons'
import cn from 'classnames';

interface ToastItemProps {
  toast: IToast;
}


const ToastItem: React.FC<ToastItemProps> = ({toast}) => {
const [show, setShow] = React.useState(true)

  return (

      <Toast
        delay={toast.delay}
        autohide
        onClose={() => setShow(false)} 
        show={show} 
        bg="light"
      >
        <Toast.Header className={`bg-${toast.bg}`}>
          <span className={cn("me-auto", {
            ["text-white"]: toast.bg === "success" || toast.bg === "danger",
            ["text-black"]: toast.bg === "warning" || toast.bg === "info",
          })}>
            <InfoSquareFill/>
          <strong> {toast.title}</strong>
          </span>
        </Toast.Header>
        <Toast.Body>{toast.description}</Toast.Body>
      </Toast>
  );
}

export default ToastItem;
