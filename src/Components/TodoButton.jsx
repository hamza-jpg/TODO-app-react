import React from 'react';
import { THEME } from '../Interfaces/AppTheme'; // Yeni import

const TodoButton = ({ onClick, children, variant = 'primary' }) => {
  // Stil tanımlarını merkezi temadan çekiyoruz
  const variantStyles = {
    primary: `${THEME.colors.primary} ${THEME.colors.primaryHover} text-white shadow-md`,
    danger: THEME.colors.danger,
    success: THEME.colors.success,
    edit: "text-blue-500 hover:text-blue-700"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${variantStyles[variant]} ${THEME.animation.transition} ${THEME.animation.hoverScale} px-4 py-2 rounded-lg`}
    >
      {children}
    </button>
  );
};

export default TodoButton;