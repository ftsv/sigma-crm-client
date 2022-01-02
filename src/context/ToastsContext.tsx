import React from 'react';
import { useToast } from '../hooks/useToast';
import { IToast } from '../types/Toast';

interface ToastsContextProps {
  toasts: IToast[];
  addToast: (title: string,
    description: string, 
    bg: "light" | "info" | "danger" | "success" | "warning", 
    delay: number
  ) => void;
  deleteToast: (id: number) => void;
}

export const ToastsContext = React.createContext<ToastsContextProps>({
  toasts: [],
  addToast: (title, description, bg, delay) => {},
  deleteToast: (id) => {},
})

const ToastsProvider: React.FC = ({children}) => {
  const {toasts, addToast, deleteToast} = useToast();

  return (
    <ToastsContext.Provider value={{toasts, addToast, deleteToast}}>
      {children}
    </ToastsContext.Provider>

  )
}

export default ToastsProvider;