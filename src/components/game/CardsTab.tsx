import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import type { Direction } from '../../engine/types';

const CardsTab: React.FC = () => {
    const { cards, addCard, updateRuleInCard, removeCard, levelInfo } = useGameStore();
    const [selectedCardId, setSelectedCardId] = React.useState<string | null>(null);

    // --- Logic Xử lý Direction (Move) ---
    const handleToggleMove = (cardId: string, ruleIndex: number, currentMove: Direction) => {
        // Xoay vòng: L <-> N <-> R
        const nextMoveMap: Record<Direction, Direction> = {
            'L': 'N',
            'N': 'R',
            'R': 'L'
        };

        const rule = cards.find(c => c.id === cardId)?.rules[ruleIndex];
        if (rule) {
            updateRuleInCard(cardId, ruleIndex, { ...rule, move: nextMoveMap[currentMove] });
        }
    };

    // Ký hiệu hiển thị cho Direction
    const moveLabelMap: Record<Direction, string> = {
        'L': '<',
        'N': '-',
        'R': '>'
    };

    // --- Logic Xử lý Write (OUT) ---
    const handleToggleWrite = (cardId: string, ruleIndex: number, currentWrite: string) => {
        if (!levelInfo) return;
        const symbols = levelInfo.allowedSymbols;
        const currentIndex = symbols.indexOf(currentWrite);
        const nextIndex = (currentIndex + 1) % symbols.length;
        const nextWrite = symbols[nextIndex];

        const rule = cards.find(c => c.id === cardId)?.rules[ruleIndex];
        if (rule) {
            updateRuleInCard(cardId, ruleIndex, { ...rule, write: nextWrite });
        }
    };

    // --- Logic Xử lý Next State (NXT) ---
    const handleToggleNext = (cardId: string, ruleIndex: number, currentNext: string) => {
        // Danh sách các state hợp lệ bao gồm state dừng '00' và các state đang có
        const availableStates = ['00', ...cards.map(c => c.id)];
        const currentIndex = availableStates.indexOf(currentNext);
        const nextIndex = (currentIndex + 1) % availableStates.length;
        const nextStateId = availableStates[nextIndex];

        const rule = cards.find(c => c.id === cardId)?.rules[ruleIndex];
        if (rule) {
            updateRuleInCard(cardId, ruleIndex, { ...rule, next: nextStateId });
        }
    };

    const handleAddCard = () => {
        // Tìm ID mới chưa có (01, 02, 03)
        const existingIds = cards.map(c => parseInt(c.id)).filter(id => !isNaN(id));
        const nextIdNum = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
        const nextId = nextIdNum.toString().padStart(2, '0');
        addCard(nextId);
    };

    // --- RENDERING ---
    // 1. MÀN HÌNH DANH SÁCH (THU GỌN - 2 CỘT)
    if (!selectedCardId) {
        return (
            <div className="flex flex-col h-full bg-black relative p-4">
                <div className="flex justify-between items-center mb-4 border-b border-[#00FF00]/30 pb-2 shrink-0">
                    <h2 className="text-lg font-bold uppercase">&gt; SYSTEM_STATES</h2>
                </div>

                <div className="flex-1 overflow-y-auto pb-24 pr-1">
                    <div className="grid grid-cols-2 gap-3">
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                onClick={() => setSelectedCardId(card.id)}
                                className="border border-[#00FF00]/50 hover:bg-[#00FF00]/20 cursor-pointer p-3 flex flex-col gap-2 transition-colors relative"
                            >
                                <div className="font-bold tracking-widest text-[#00FF00]">
                                    [{card.id}]
                                </div>

                                {/* Xem nhanh số lượng luật của State này dạng Bảng thu nhỏ */}
                                <div className="text-[10px] font-mono w-full">
                                    <div className="grid grid-cols-4 gap-[2px] mb-[2px] text-center opacity-50 text-[8px]">
                                        <div>IN</div>
                                        <div>OUT</div>
                                        <div>DIR</div>
                                        <div>NXT</div>
                                    </div>
                                    <div className="space-y-[2px]">
                                        {card.rules.map((rule, idx) => (
                                            <div key={idx} className="grid grid-cols-4 gap-[2px] items-center text-[10px] text-center">
                                                <div className="bg-[#00FF00]/10 text-[#00FF00] p-[2px] border border-[#00FF00]/20">
                                                    {rule.read === ' ' ? '_' : rule.read}
                                                </div>
                                                <div className="bg-black text-[#00FF00] p-[2px] border border-[#00FF00]/20">
                                                    {rule.write === ' ' ? '_' : rule.write}
                                                </div>
                                                <div className="bg-black text-yellow-300 p-[2px] border border-[#00FF00]/20">
                                                    {moveLabelMap[rule.move]}
                                                </div>
                                                <div className="bg-black text-purple-400 p-[2px] border border-[#00FF00]/20">
                                                    {rule.next}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleAddCard}
                        className="w-full mt-4 py-3 font-bold border-2 border-[#00FF00]/50 hover:bg-[#00FF00]/10 shadow-[0_0_10px_rgba(0,255,0,0.1)] transition-colors"
                    >
                        + NEW_STATE
                    </button>
                </div>
            </div>
        );
    }

    // 2. MÀN HÌNH CHI TIẾT (EDIT CARD DETAIL)
    const card = cards.find(c => c.id === selectedCardId);
    if (!card) {
        setSelectedCardId(null);
        return null;
    }

    return (
        <div className="flex flex-col h-full bg-black relative p-4">
            <button
                onClick={() => setSelectedCardId(null)}
                className="mb-4 text-[#00FF00] text-sm hover:underline self-start font-bold"
            >
                &lt; BACK_TO_OVERVIEW
            </button>

            {/* KHU VỰC CHỈNH SỬA CARD CỤ THỂ */}
            <div className="flex-1 overflow-y-auto space-y-6 pb-24 transition-all">
                <div key={card.id} className="border border-[#00FF00]/50 bg-black">
                    {/* Header Card */}
                    <div className="flex justify-between items-center bg-[#00FF00]/10 p-2 border-b border-[#00FF00]/30">
                        <span className="font-bold tracking-widest text-[#00FF00]">STATE [{card.id}]</span>
                        {card.id !== '01' && (
                            <button
                                onClick={() => {
                                    removeCard(card.id);
                                    setSelectedCardId(null); // Xóa xong back về menu
                                }}
                                className="text-xs text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-3 py-1 ml-2 transition-colors"
                            >
                                [DELETE]
                            </button>
                        )}
                    </div>

                    {/* Bảng Rules */}
                    <div className="p-2 space-y-2">
                        <div className="grid grid-cols-4 gap-1 text-center text-[10px] opacity-60 mb-2 font-mono">
                            <div title="Read">IN</div>
                            <div title="Write">OUT</div>
                            <div title="Move">DIR</div>
                            <div title="Next State">NXT</div>
                        </div>

                        {card.rules.map((rule, idx) => (
                            <div key={idx} className="grid grid-cols-4 gap-1 items-center font-mono">
                                {/* Cột Read */}
                                <div
                                    className="border border-[#00FF00]/30 text-center py-2 text-lg bg-[#00FF00]/10 text-[#00FF00]"
                                >
                                    {rule.read === ' ' ? '_' : rule.read}
                                </div>

                                {/* Cột Write */}
                                <div
                                    onClick={() => handleToggleWrite(card.id, idx, rule.write)}
                                    className="border border-[#00FF00]/30 text-center py-2 text-lg bg-black active:bg-[#00FF00]/30 select-none text-[#00FF00] cursor-pointer hover:bg-[#00FF00]/10 transition-colors"
                                >
                                    {rule.write === ' ' ? '_' : rule.write}
                                </div>

                                {/* Cột Move (Nhấn xoay vòng) */}
                                <div
                                    onClick={() => handleToggleMove(card.id, idx, rule.move)}
                                    className="border border-[#00FF00]/30 text-center py-2 text-lg bg-black active:bg-[#00FF00]/30 select-none text-yellow-300 cursor-pointer hover:bg-yellow-300/10 transition-colors"
                                >
                                    {moveLabelMap[rule.move]}
                                </div>

                                {/* Cột Next State (Nhấn xoay vòng) */}
                                <div
                                    onClick={() => handleToggleNext(card.id, idx, rule.next)}
                                    className="border border-[#00FF00]/30 text-center py-2 text-lg bg-black active:bg-[#00FF00]/30 select-none text-purple-400 cursor-pointer hover:bg-purple-400/10 transition-colors"
                                >
                                    {rule.next}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsTab;
