import React from 'react';
import { SlClose } from 'react-icons/sl';

const Modal = ({ onClose, visible, children }) => {
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === 'container' || e.target.id === 'icon-close') onClose();
  };

  return (
    <div id="container" onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white px-8 py-5 rounded w-[480px] relative">
        <SlClose className="w-7 h-7 z-50 absolute top-3 right-3 hover:cursor-pointer text-red-400" id="icon-close" />

        {children}
      </div>
    </div>
  );
};

export default Modal;
