import React from 'react';
import { FiX } from 'react-icons/fi';

interface ModalProps {
    isOpen: boolean;
    onClose: (close: boolean) => void;
    children: React.ReactNode;
    title?: string | React.ReactNode;
    className?: string;
    size?: 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl';
    bgColor?: string;
    titleStyle?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    size = 'max-w-2xl',
    bgColor = 'white',
    className = '',
    titleStyle = '',
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div className="fixed inset-0 bg-gray-500/80 transition-opacity" onClick={() => onClose(false)} />

            <div
                className={`relative z-50 w-full ${size} mx-auto transform overflow-hidden rounded-lg shadow-xl transition-all sm:my-8 ${className}`}
            >
                <div className={`bg-${bgColor} px-4 py-5 sm:p-6`}>
                    <div className="flex items-start justify-between">
                        <h3 className={`text-xl font-semibold ${titleStyle}`}>{title}</h3>
                        <button onClick={() => onClose(false)} className="text-gray-500 hover:text-gray-700 transition">
                            <FiX size={24} />
                        </button>
                    </div>

                    <div className="mt-4">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
