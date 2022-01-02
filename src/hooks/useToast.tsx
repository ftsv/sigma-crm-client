import React, { useCallback, useEffect, useState } from 'react';
import { IToast } from '../types/Toast';

export const useToast = () => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  //НЕОБХОДИМО ДОРАБОТАТЬ ОЧИЩЕНИЕ МАССИВА ТОСТОВ!!!!!!! они копятся в памяти до перезагрузки
  // вариант 1 ограничить длину массива количеством уведомлений по размеру экрана
  // вариант 2 настраиваемое пользователем количество


  const addToast = useCallback( (title, description, bg = "light", delay = 10000) => {
    let id = Date.now();
    setToasts(toasts => [...toasts, {id, title, description, bg, delay}]);
  }, []);
  
  //need to remake func
  const deleteToast= (id: number) => {
    setToasts(toasts.filter(item => item.id !== id));
  }

  //sets the interval for cleaning the array of toasts every hour
  useEffect(() => {
    setInterval(() => {
      setToasts([]);
    }, 1000*60*60)
  }, [])

  return {toasts, addToast, deleteToast};
}
