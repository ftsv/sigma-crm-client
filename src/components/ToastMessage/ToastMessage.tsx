import React, { useState, useEffect } from 'react';
import { IToast } from '../../types/Toast';
import { ToastContainer } from 'react-bootstrap';
import ToastItem from './ToastItem';

interface ToastListProps {
  toastList: IToast[];
  position?: "top-start" | "top-center" | "top-end" | "middle-start" | "middle-center" | "middle-end" | "bottom-start" | "bottom-center" | "bottom-end" | undefined
}

const ToastMessage = (props: ToastListProps) => {
  const { toastList, position } = props;
  const [toasts, setToasts] = useState(toastList);

  useEffect(() => {
    setToasts(toastList);
  }, [toastList])

  return (
    <ToastContainer position={position} >
      {toasts?.length
      ? toasts.map(toast => (
        <div key={toast.id}>
          <ToastItem toast={toast} />
        </div>)
      )
      : null}
    </ToastContainer>
  )
}

export default ToastMessage;
