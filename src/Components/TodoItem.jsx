import React from 'react';
import TodoButton from './TodoButton';

const TodoItem = ({ task, index, onToggle, onDelete, onEditStart }) => {
  return (
    <li className="group bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md hover:border-indigo-200 transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
        <input 
          type="checkbox" 
          checked={task.isCompleted}
          onChange={() => onToggle(index)}
          className="w-6 h-6 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        <span className={`text-lg transition-all ${task.isCompleted ? 'line-through text-gray-400 italic' : 'text-gray-700 font-medium'}`}>
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