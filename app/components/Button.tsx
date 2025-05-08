import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  overrideClassName?: string;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, children, className, overrideClassName }) => {
  const overrideClassNameValue = overrideClassName || 'py-2 px-4 rounded-md';
  return (
    <button
      className={`${overrideClassNameValue} flex bg-black text-white font-semibold items-center justify-center gap-2 border-2 cursor-pointer  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
