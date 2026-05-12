import React from 'react';

const TodoButton = ({ onClick, children, variant = 'primary' }) => {
  const styles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md",
    danger: "text-red-500 hover:text-red-700 font-semibold",
    success: "text-green-600 hover:text-green-800 font-bold",
    edit: "text-blue-500 hover:text-blue-700 font-semibold"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${styles[variant]} px-4 py-2 rounded-lg transition-all active:scale-95 duration-200`}
    >
      {children}
    </button>
  );
};

export default TodoButton;