import React from 'react';
import TodoButton from './TodoButton';
import { THEME } from '../Interfaces/AppTheme'; // Temayı içeri aktar

const TodoItem = ({ task, index, onToggle, onDelete, onEditStart }) => {
  return (
    <li className={`group p-4 ${THEME.layout.card} flex justify-between items-center hover:border-indigo-200 ${THEME.animation.transition}`}>
      <div className="flex items-center gap-4 flex-1">
        <input 
          type="checkbox" 
          checked={task.isCompleted}
          onChange={() => onToggle(index)}
          // Checkbox rengini de temaya uygun hale getiriyoruz
          className={`w-6 h-6 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer`}
        />
        <span className={`text-lg ${THEME.animation.transition} ${task.isCompleted ? 'line-through text-gray-400 italic' : 'text-gray-700 font-medium'}`}>
          {task.text}
        </span>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <TodoButton variant="edit" onClick={() => onEditStart(index, task.text)}>✎</TodoButton>
        <TodoButton variant="danger" onClick={() => onDelete(index)}>✕</TodoButton>
      </div>
    </li>
  );
};

export default TodoItem;