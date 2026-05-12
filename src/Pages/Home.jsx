import React, { useState } from "react";
import TodoItem from "../components/TodoItem";
import TodoButton from "../components/TodoButton";
import { THEME } from "../Interfaces/AppTheme"; // Temayı buraya da ekledik

function Home() {
    // --- 1. STATE MANAGEMENT ---
    const [taskText, setTaskText] = useState("");
    const [tasks, setTasks] = useState([]); 
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");

    // --- 2. BUSINESS LOGIC ---
    const handleAddTask = () => {
        if (taskText.trim() === "") return;
        setTasks([...tasks, { text: taskText, isCompleted: false }]);
        setTaskText(""); 
    };

    const handleDeleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

    const handleToggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index].isCompleted = !newTasks[index].isCompleted;
        setTasks(newTasks);
    };

    const handleEditSave = () => {
        if (editText.trim() === "") return;
        const newTasks = [...tasks];
        newTasks[editIndex].text = editText;
        setTasks(newTasks);
        setEditIndex(null);
    };

    const completedCount = tasks.filter(t => t.isCompleted).length;

    // --- 3. UI RENDER ---
    return (
    // Arka plan rengini temadan alıyoruz
    <div className={`min-h-screen ${THEME.colors.background} flex items-center justify-center p-6 font-sans`}>
      {/* Kart yapısını temadan alıyoruz */}
      <div className={`w-full max-w-lg overflow-hidden ${THEME.layout.card}`}>
        
        {/* Header Alanı */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white text-center">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">My Tasks</h1>
            <p className="text-indigo-100 opacity-90">
                {tasks.length} Total • {completedCount} Done
            </p>
        </div>

        <div className="p-8">
            {/* Input Alanı */}
            <div className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                    placeholder="What needs to be done?"
                    // Input stilini temadan alıyoruz
                    className={`flex-1 px-5 py-4 outline-none ${THEME.layout.input} ${THEME.animation.transition}`}
                />
                <TodoButton onClick={handleAddTask}>Add</TodoButton>
            </div>

            {/* Görev Listesi */}
            <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {tasks.map((task, index) => (
                    editIndex === index ? (
                        <div key={index} className="flex gap-2 animate-in fade-in zoom-in duration-200">
                            <input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className={`flex-1 px-4 py-2 outline-none border-2 border-green-400 rounded-xl`}
                                autoFocus
                            />
                            <TodoButton variant="success" onClick={handleEditSave}>Save</TodoButton>
                        </div>
                    ) : (
                        <TodoItem 
                            key={index} 
                            task={task} 
                            index={index} 
                            onToggle={handleToggleComplete} 
                            onDelete={handleDeleteTask}
                            onEditStart={(i, txt) => { setEditIndex(i); setEditText(txt); }}
                        />
                    )
                ))}
            </ul>

            {/* Boş Durum */}
            {tasks.length === 0 && (
                <div className="text-center py-12 opacity-40">
                    <div className="text-6xl mb-4">📋</div>
                    <p className="text-xl font-medium">Your list is empty</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Home;