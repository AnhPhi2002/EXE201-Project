import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen,  children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/2 max-w-lg">
        {children}
      </div>
    </div>
  );
};

export const ModalContent: React.FC<{ children: ReactNode }> = ({ children }) => <div>{children}</div>;
export const ModalHeader: React.FC<{ children: ReactNode }> = ({ children }) => <div className="border-b p-4">{children}</div>;
export const ModalTitle: React.FC<{ children: ReactNode }> = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>;
export const ModalFooter: React.FC<{ children: ReactNode }> = ({ children }) => <div className="border-t p-4 flex justify-end">{children}</div>;
export const ModalCloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="text-gray-500">✕</button>
);
