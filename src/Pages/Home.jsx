import React, { useState } from "react";

function Home() {
    // --- 1. DURUM YÖNETİMİ (STATE MANAGEMENT) ---
    
    // Kullanıcının metin kutusuna girdiği anlık veriyi tutar
    const [taskText, setTaskText] = useState("");
    
    // Görev listesini tutan ana state. 
    // Veri Yapısı: [{ text: "Örnek Görev", isCompleted: false }, ...]
    const [tasks, setTasks] = useState([]); 
    
    // Güncelleme operasyonları için geçici hafızalar
    const [editIndex, setEditIndex] = useState(null); // Şu an hangi satır düzenleniyor (index numarası)
    const [editText, setEditText] = useState("");     // Düzenlenen metnin anlık değerini tutar

    // --- 2. İŞ MANTIĞI VE FONKSİYONLAR (BUSINESS LOGIC) ---

    /**
     * Yeni bir görev ekler (Create)
     * Kullanıcı boş veri gönderirse işlemi iptal eder.
     * Mevcut listeyi bozmadan, kopyasının sonuna yeni bir obje ekler.
     */
    const handleAddTask = () => {
        if (taskText.trim() === "") return;
        
        // Spread operator (...) ile mevcut diziyi koruyup yeni elemanı obje olarak ekliyoruz
        setTasks([...tasks, { text: taskText, isCompleted: false }]);
        setTaskText(""); // İşlem bitince input alanını temizle
    };

    /**
     * Belirtilen index numarasına sahip görevi listeden siler (Delete)
     * filter() metodu ile tıklanan eleman dışındaki tüm elemanları içeren yeni bir dizi oluşturur.
     */
    const handleDeleteTask = (indexToDelete) => {
        const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(updatedTasks);
    };

    /**
     * Görevin tamamlanma (isCompleted) durumunu tersine çevirir (Toggle)
     * Checkbox işaretlendiğinde veya kaldırıldığında çalışır.
     */
    const handleToggleComplete = (index) => {
        const updatedTasks = [...tasks];
        // Mantıksal DEĞİL (!) operatörü ile mevcut durumu tersine çeviriyoruz (true -> false, false -> true)
        updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
        setTasks(updatedTasks);
    };

    /**
     * Düzenleme modunu başlatır
     * İlgili satırı input alanına dönüştürmek için gerekli stateleri doldurur.
     */
    const handleEditStart = (index, currentText) => {
        setEditIndex(index);
        setEditText(currentText);
    };

    /**
     * Düzenlenen metni kalıcı olarak kaydeder (Update)
     * Boş metin kaydedilmesini engeller ve işlemi bitirince düzenleme modunu kapatır.
     */
    const handleEditSave = () => {
        if (editText.trim() === "") return;
        
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].text = editText; // Sadece ilgili objenin 'text' değerini güncelliyoruz
        
        setTasks(updatedTasks);
        setEditIndex(null); // Düzenleme modundan çık (input'u tekrar metne dönüştür)
    };

    // UI'da (Kullanıcı Arayüzü) göstermek üzere tamamlanmış görevlerin sayısını dinamik hesaplar
    const completedCount = tasks.filter(task => task.isCompleted).length;

    // --- 3. KULLANICI ARAYÜZÜ (RENDER / UI) ---
    return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        
        {/* Üst Bilgi Paneli (Header) */}
        <div className="bg-indigo-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-1">Yapılacaklar</h1>
            <p className="text-indigo-200 text-sm">
                {tasks.length} görevden {completedCount} tanesi tamamlandı
            </p>
        </div>

        <div className="p-6">
            
            {/* Görev Ekleme Form Alanı */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()} // Klavye UX iyileştirmesi
                    placeholder="Yeni bir görev ekle..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <button
                    onClick={handleAddTask}
                    className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-md"
                >
                    Ekle
                </button>
            </div>

            {/* Dinamik Görev Listesi (Read) */}
            <ul className="space-y-3">
                {tasks.map((task, index) => (
                    // Listedeki her bir eleman. 'group' sınıfı hover efektleri için kullanıldı
                    <li key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center group hover:border-indigo-100 transition-all">
                    
                    {/* Düzenleme Modu Aktifse Çalışacak Görünüm */}
                    {editIndex === index ? (
                        <div className="flex gap-2 w-full animate-pulse">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 border-b-2 border-indigo-500 bg-gray-50 px-2 py-1 focus:outline-none text-gray-700"
                                autoFocus
                            />
                            <button onClick={handleEditSave} className="text-indigo-600 hover:text-indigo-800 text-sm font-bold">
                                Kaydet
                            </button>
                        </div>
                    ) : (
                    /* Düzenleme Modu Kapalıysa Çalışacak Standart Görünüm */
                        <>
                            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                <input 
                                    type="checkbox" 
                                    checked={task.isCompleted}
                                    onChange={() => handleToggleComplete(index)}
                                    className="w-5 h-5 accent-indigo-600 cursor-pointer"
                                />
                                {/* Görev tamamlandıysa CSS ile üstünü çiz ve rengi soluklaştır */}
                                <span className={`break-all ${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                                    {task.text}
                                </span>
                            </div>

                            {/* Aksiyon Butonları (Düzenle ve Sil) */}
                            <div className="flex gap-3 opacity-70 group-hover:opacity-100 transition-opacity ml-4">
                                <button onClick={() => handleEditStart(index, task.text)} className="text-blue-500 hover:text-blue-700 text-sm font-semibold">
                                    ✎
                                </button>
                                <button onClick={() => handleDeleteTask(index)} className="text-red-500 hover:text-red-700 text-sm font-semibold">
                                    ✕
                                </button>
                            </div>
                        </>
                    )}
                    </li>
                ))}
            </ul>

            {/* Boş Liste Durumu (Empty State) İyileştirmesi */}
            {tasks.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-400">Harika! Yapılacak hiçbir şey yok.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}

export default Home;