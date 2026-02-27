import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LevelInfo, MachineCard, MachineRule, TestCase, StateId } from '../engine/types';
import { LEVELS } from '../levels';

export const HALT_STATE: StateId = '00';

interface GameState {
    // --- Level Data ---
    levelInfo: LevelInfo | null;
    tests: TestCase[];

    // --- Player Programming Data ---
    cards: MachineCard[];
    // --- Lưu trữ Lời Giải từng màn ---
    savedSolutions: Record<string, MachineCard[]>;
    savedTestStatuses: Record<string, TestCase['status'][]>;

    // --- Progression ---
    currentLevelId: string | null;
    completedLevels: string[];
    isAdmin: boolean;

    // Level & Initialization
    loadLevelById: (id: string, initialCards?: MachineCard[]) => void;
    completeCurrentLevel: () => void;
    enableAdminMode: () => void;

    // Card & Rules Management
    addCard: (id: StateId) => void;
    removeCard: (id: StateId) => void;

    updateRuleInCard: (cardId: StateId, ruleIndex: number, newRule: MachineRule) => void;

    // Test Management
    updateTestStatus: (testIndex: number, status: TestCase['status']) => void;
    resetTests: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            levelInfo: null,
            tests: [],
            cards: [],
            savedSolutions: {},
            savedTestStatuses: {},
            currentLevelId: null,
            completedLevels: [],
            isAdmin: false,

            // --- Actions Implementation ---

            loadLevelById: (id, initialCards = []) => {
                const levelData = LEVELS.find(l => l.info.id === id);
                if (!levelData) return;

                // Tạo rules mặc định cho một state dựa vào các ký hiệu đầu vào
                const defaultRules = levelData.info.allowedSymbols.map(sym => ({
                    read: sym,
                    write: sym,
                    move: 'R' as const,
                    next: HALT_STATE
                }));

                set((state) => {
                    let isValidSavedState = false;
                    const savedCards = state.savedSolutions[id];

                    // Kiểm tra sự toàn vẹn của Dữ liệu Load từ Local Storage so với Thông số Level (tránh lỗi đổi luật chơi)
                    if (savedCards && savedCards.length > 0) {
                        const allowedSymbolsStr = [...levelData.info.allowedSymbols].sort().join('');
                        isValidSavedState = savedCards.every(card => {
                            const cardSymbolsStr = [...card.rules.map(r => r.read)].sort().join('');
                            return allowedSymbolsStr === cardSymbolsStr;
                        });
                    }

                    const newCardsState = initialCards.length > 0
                        ? initialCards
                        : (isValidSavedState ? savedCards : [{ id: '01', rules: defaultRules }]);

                    // Nếu State bị Reset do mâu thuẫn -> Hủy luôn mảng test status cũ
                    const savedStatuses = isValidSavedState && state.savedTestStatuses[id]
                        ? state.savedTestStatuses[id]
                        : [];

                    return {
                        currentLevelId: id,
                        levelInfo: levelData.info,
                        tests: levelData.tests.map((t, idx) => ({
                            ...t,
                            status: savedStatuses[idx] || 'pending'
                        })),
                        cards: newCardsState
                    };
                });
            },

            enableAdminMode: () => set({ isAdmin: true }),

            completeCurrentLevel: () => set((state) => {
                if (!state.currentLevelId) return state;
                const alreadyCompleted = state.completedLevels.includes(state.currentLevelId);

                return {
                    completedLevels: alreadyCompleted
                        ? state.completedLevels
                        : [...state.completedLevels, state.currentLevelId]
                };
            }),

            addCard: (id) => set((state) => {
                if (id === HALT_STATE || state.cards.some(c => c.id === id) || !state.levelInfo) return state;

                // Tự động generate các grid input field theo allowedSymbols
                const defaultRules = state.levelInfo.allowedSymbols.map(sym => ({
                    read: sym,
                    write: sym,
                    move: 'N' as const,
                    next: id // Next state tro về chính nó (cần user đổi)
                }));

                const newCardsState = [...state.cards, { id, rules: defaultRules }];

                return {
                    cards: newCardsState,
                    savedSolutions: {
                        ...state.savedSolutions,
                        [state.currentLevelId!]: newCardsState
                    },
                    tests: state.tests.map(test => ({ ...test, status: 'pending' }))
                };
            }),

            removeCard: (id) => set((state) => {
                // Không cho phép xoá Halt state (nếu có) và card Start '01' (nếu muốn bắt buộc)
                const newCardsState = state.cards.filter(c => c.id !== id);
                return {
                    cards: newCardsState,
                    savedSolutions: {
                        ...state.savedSolutions,
                        [state.currentLevelId!]: newCardsState
                    },
                    tests: state.tests.map(test => ({ ...test, status: 'pending' }))
                };
            }),

            updateRuleInCard: (cardId, ruleIndex, newRule) => set((state) => {
                const newCardsState = state.cards.map(card =>
                    card.id === cardId
                        ? {
                            ...card,
                            rules: card.rules.map((r, idx) => idx === ruleIndex ? newRule : r)
                        }
                        : card
                );
                const newTestsBase = state.tests.map(test => ({ ...test, status: 'pending' as const }));
                const newStatuses = newTestsBase.map(t => t.status);

                return {
                    cards: newCardsState,
                    savedSolutions: {
                        ...state.savedSolutions,
                        [state.currentLevelId!]: newCardsState
                    },
                    tests: newTestsBase,
                    savedTestStatuses: {
                        ...state.savedTestStatuses,
                        [state.currentLevelId!]: newStatuses
                    }
                };
            }),

            updateTestStatus: (testIndex, status) => set((state) => {
                const newTests = state.tests.map((test, idx) =>
                    idx === testIndex ? { ...test, status } : test
                );
                const newStatuses = newTests.map(t => t.status);

                return {
                    tests: newTests,
                    savedTestStatuses: {
                        ...state.savedTestStatuses,
                        [state.currentLevelId!]: newStatuses
                    }
                };
            }),

            resetTests: () => set((state) => {
                const newTests = state.tests.map(test => ({ ...test, status: 'pending' as const }));
                const newStatuses = newTests.map(t => t.status);

                return {
                    tests: newTests,
                    savedTestStatuses: {
                        ...state.savedTestStatuses,
                        [state.currentLevelId!]: newStatuses
                    }
                };
            })
        }),
        {
            name: 'turing-game-storage', // Khóa bộ nhớ LocalStorage
            partialize: (state) => ({
                completedLevels: state.completedLevels,
                savedSolutions: state.savedSolutions,
                savedTestStatuses: state.savedTestStatuses,
                isAdmin: state.isAdmin
            }),
        }
    ));
