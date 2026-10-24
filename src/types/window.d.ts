import type { Language } from '../store/useLanguageStore';

declare global {
    interface Window {
        turingAdmin?: (enabled?: boolean) => string;
        turingLanguage?: (language?: Language) => Language;
    }
}
