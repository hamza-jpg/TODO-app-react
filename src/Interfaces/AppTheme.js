/**
 * UI Interfaces & Theme Configuration
 * Bu dosya uygulamanın görsel standartlarını (sözleşmesini) belirler.
 * Tasarımda bir değişiklik yapılacağı zaman tek merkezden yönetimi sağlar.
 */

export const THEME = {
    colors: {
        // 'primary' rengini mavi olarak güncelledik (mor yerine)
        primary: "bg-blue-600", // 'bg-indigo-600' -> 'bg-blue-600'
        primaryHover: "hover:bg-blue-700", // 'hover:bg-indigo-700' -> 'hover:bg-blue-700'
        
        secondary: "bg-purple-600",
        danger: "text-red-500 hover:text-red-700",
        success: "text-green-600 hover:text-green-800",
        // Arka plan gradyanını maviye uygun hale getirdik
        background: "bg-gradient-to-br from-blue-50 via-white to-sky-50", // 'indigo-50' -> 'blue-50', 'purple-50' -> 'sky-50'
    },
    layout: {
        // 'card' içindeki 'bg-white/80' (grilik) yerine tam beyaz 'bg-white' kullandık
        card: "bg-white backdrop-blur-md rounded-3xl shadow-2xl border border-white/20", // 'bg-white/80' -> 'bg-white'
        // 'input' içindeki 'bg-gray-50/50' (grilik) yerine tam beyaz 'bg-white' kullandık
        input: "bg-white border-2 border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-400", // 'bg-gray-50/50' -> 'bg-white', 'focus:ring-indigo-400' -> 'focus:ring-blue-400'
    },
    animation: {
        transition: "transition-all duration-300",
        hoverScale: "active:scale-95"
    }
};