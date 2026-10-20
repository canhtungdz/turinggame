import type { Language } from '../store/useLanguageStore';

declare global {
    interface Window {
        turingAdmin?: () => string;
        turingLanguage?: (language?: Language) => Language;
    }
}
