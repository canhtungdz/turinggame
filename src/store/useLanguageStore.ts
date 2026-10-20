import { create } from 'zustand';

export type Language = 'en' | 'vi';

const STORAGE_KEY = 'turing-game-language:v1';

function readLanguage(): Language {
    try {
        return localStorage.getItem(STORAGE_KEY) === 'vi' ? 'vi' : 'en';
    } catch {
        return 'en';
    }
}

interface LanguageState {
    language: Language;
    setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: readLanguage(),
    setLanguage: (language) => {
        if (language !== 'en' && language !== 'vi') {
            throw new Error('Unsupported language. Use "en" or "vi".');
        }

        set({ language });
        try {
            localStorage.setItem(STORAGE_KEY, language);
        } catch {
            // Vẫn đổi ngôn ngữ cho phiên hiện tại khi không thể lưu vào browser.
        }
    },
}));
