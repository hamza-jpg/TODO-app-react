import React, { useState } from "react";
// Parçalanmış bileşenlerimizi (components) içeri aktarıyoruz
import TodoItem from "../Components/TodoItem";
import TodoButton from "../Components/TodoButton";

function Home() {
    // --- 1. DURUM YÖNETİMİ (STATE MANAGEMENT) ---
    const [taskText, setTaskText] = useState("");
    const [tasks, setTasks] = useState([]); 
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");

    // --- 2. İŞ MANTIĞI (BUSINESS LOGIC) ---

    // Yeni görev ekleme (Create)
    const handleAddTask = () => {
        if (taskText.trim() === "") return;
        setTasks([...tasks, { text: taskText, isCompleted: false }]);
        setTaskText(""); 
    };

    // Görev silme (Delete)
    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // Tamamlanma durumunu değiştirme (Update - Status)
    const handleToggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index].isCompleted = !newTasks[index].isCompleted;
        setTasks(newTasks);
    };

    // Düzenlenen metni kaydetme (Update - Text)
    const handleEditSave = () => {
        if (editText.trim() === "") return;
        const newTasks = [...tasks];
        newTasks[editIndex].text = editText;
        setTasks(newTasks);
        setEditIndex(null);
    };

    // İstatistiksel veriler (Computed Properties)
    const completedCount = tasks.filter(t => t.isCompleted).length;

    // --- 3. KULLANICI ARAYÜZÜ (RENDER) ---
    return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white/80 backdrop-blur-md w-full max-w-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Header: Uygulama Başlığı ve İstatistikler */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">My Tasks</h1>
            <p className="text-indigo-100 opacity-90">
                {tasks.length} Total • {completedCount} Done
            </p>
        </div>

        <div className="p-8">
            {/* Input Grubu: Yeni görev girişi */}
            <div className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                    placeholder="What needs to be done?"
                    className="flex-1 bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-inner"
                />
                <TodoButton onClick={handleAddTask}>Add</TodoButton>
            </div>

            {/* Liste: Görevlerin dinamik olarak map edildiği alan */}
            <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {tasks.map((task, index) => (
                    // Eğer düzenleme modundaysak input göster, değilsek TodoItem bileşenini göster
                    editIndex === index ? (
                        <div key={index} className="flex gap-2 animate-in fade-in zoom-in duration-200">
                            <input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 border-2 border-green-400 rounded-xl px-4 py-2 outline-none"
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

            {/* Empty State: Liste boşsa kullanıcıya gösterilecek alan */}
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