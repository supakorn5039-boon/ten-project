import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export const ToastProvider = () => {
  return <ToastContainer position="top-right" autoClose={1000} newestOnTop closeOnClick theme="colored" />;
};

type Status = 'success' | 'error' | 'info' | 'default';

export function ToastAlert(status: Status, message: string) {
  switch (status) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast.info(message);
      break;
    case 'default':
      toast(message);
      break;
    default:
      toast(message);
  }
}
