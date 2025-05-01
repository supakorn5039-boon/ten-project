import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  error?: FieldError | undefined;
  icon?: React.ReactNode;
  register: UseFormRegisterReturn;
}

export default function InputField({
  label,
  type,
  name,
  placeholder,
  error,
  icon,
  register,
}: InputFieldProps): React.ReactElement {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div
          className={`
          flex items-center rounded-lg border px-4 py-2
          ${error ? 'border-red-500' : 'border-gray-300'}
          
        `}
        >
          {icon && <div className="text-gray-400 mr-2">{icon}</div>}
          <input
            id={name}
            {...register}
            type={type}
            placeholder={placeholder}
            className="
            w-full bg-transparent outline-none text-sm text-gray-900
            placeholder:text-gray-400
            focus:ring-0"
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
      </div>
    </div>
  );
}
