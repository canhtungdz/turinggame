import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { runTuringMachineStep, type TapeState } from '../../engine/turingEngine';
import type { Direction } from '../../engine/types';

const moveLabelMap: Record<Direction, string> = {
    'L': '<',
    'N': '-',
    'R': '>'
};
const speeds = [1, 2, 5, 10, 20, 50, 100, 500, 2000]; // Các mức tốc độ x

interface TestsTabProps {
    onOpenMenu?: () => void;
}

const TestsTab: React.FC<TestsTabProps> = ({ onOpenMenu }) => {
    const { tests, updateTestStatus, cards, completeCurrentLevel } = useGameStore();

    // viewedTestIdx đóng vai trò kiểm soát chúng ta đang ở Màn View List (null) hay Màn Detail (number)
    const [viewedTestIdx, setViewedTestIdx] = useState<number | null>(null);
    const [activeTapeState, setActiveTapeState] = useState<TapeState | null>(null);
    const [autoRun, setAutoRun] = useState(false);
    const [speedIdx, setSpeedIdx] = useState(1); // Mặc định là 2x

    // Thêm refs chạy animation delay
    const runRef = useRef<number | null>(null);

    // Check điều kiện nút Submit
    const allTestsPassed = tests.length > 0 && tests.every(t => t.status === 'success');

    const handleOpenTest = (testIndex: number) => {
        setViewedTestIdx(testIndex);
        const test = tests[testIndex];
        const initialState: TapeState = {
            tape: test.input.split(''),
            headPosition: 0,
            currentState: '01', // Bắt đầu ở card mặc định 01
            steps: 0,
            status: 'running'
        };
        setActiveTapeState(initialState);
        setAutoRun(false);
    };

    const handleStep = () => {
        if (!activeTapeState || activeTapeState.status !== 'running' || viewedTestIdx === null) return;

        const nextState = runTuringMachineStep(activeTapeState, cards);
        setActiveTapeState(nextState);

        // Kiểm tra kết quả dừng nếu đã đạt đỉnh điểm
        if (nextState.status !== 'running') {
            const test = tests[viewedTestIdx];
            const cleanTapeResult = nextState.tape.join('').trim();
            const cleanExpected = test.expected.trim();
            const isPassed = nextState.status === 'success' && cleanTapeResult === cleanExpected;

            updateTestStatus(viewedTestIdx, isPassed ? 'success' : 'failed');
            setAutoRun(false); // Dịch xong thì ngắt
        }
    };

    // Vòng lặp Loop Render Effect từng bước Turing
    useEffect(() => {
        if (!autoRun || !activeTapeState || activeTapeState.status !== 'running' || viewedTestIdx === null) return;

        const baseTime = 600; // 1x = 600ms
        const currentTime = baseTime / speeds[speedIdx];

        runRef.current = window.setTimeout(() => {
            handleStep();
        }, currentTime);

        return () => {
            if (runRef.current) clearTimeout(runRef.current);
        };
    }, [autoRun, activeTapeState, viewedTestIdx, speedIdx]);

    if (!tests || tests.length === 0) {
        return <div className="p-4 text-center mt-10 text-slate-500">[NO_TESTS_LOADED]</div>;
    }

    // ============================================
    // --- 1. MÀN HÌNH CHI TIẾT (DETAIL VIEW) ---
    // ============================================
    if (viewedTestIdx !== null) {
        const test = tests[viewedTestIdx];
        const isFinished = activeTapeState?.status !== 'running';

        // Truy xuất Card hiện tại mà băng từ đang trỏ tới State của nó
        const currentCard = cards.find(c => c.id === activeTapeState?.currentState);
        const currentSymbol = activeTapeState?.tape[activeTapeState.headPosition] || ' ';
        // Tìm Rule index đang thỏa mãn để tô đậm (highlight)
        const activeRuleIdx = currentCard?.rules.findIndex(r => r.read === currentSymbol);

        return (
            <div className="p-4 flex flex-col h-full relative">
                <button
                    onClick={() => { setViewedTestIdx(null); setAutoRun(false); }}
                    className="mb-4 text-[#00FF00] text-sm hover:underline self-start font-bold"
                >
                    &lt; BACK_TO_LIST
                </button>

                <div
                    className="mb-2 text-xs opacity-80 font-mono truncate"
                    title={`TEST_CASE #${viewedTestIdx.toString().padStart(2, '0')}: IN '${test.input}'`}
                >
                    TEST_CASE #{viewedTestIdx.toString().padStart(2, '0')}: IN '{test.input}'
                </div>

                {/* Visual Header Animation (TAPE TURING) */}
                {activeTapeState && (
                    <div className="mb-4 bg-black border border-[#00FF00] p-2 overflow-hidden relative h-24 shadow-[0_0_15px_rgba(0,255,0,0.3)] shrink-0">
                        <div className="text-[10px] text-[#00FF00] opacity-80 mb-2 font-mono flex justify-between">
                            <span>[TAPE_SIMULATOR]</span>
                            <span>STATE: {activeTapeState.currentState} | STP: {activeTapeState.steps}</span>
                        </div>

                        {/* Window Tape */}
                        <div className="relative h-12 flex items-center w-full justify-center">
                            {/* HEAD cố định ở giữa màn hình */}
                            <div className="absolute w-10 h-12 border-2 border-[#00FF00] top-0 shadow-[0_0_5px_#00FF00] animate-pulse z-10" />

                            {/* Dải Băng Dịch chuyển */}
                            <div
                                className="absolute flex font-mono text-xl transition-transform ease-linear"
                                style={{
                                    transform: `translateX(calc(50% - ${(activeTapeState.headPosition + 30) * 40}px - 20px))`,
                                    transitionDuration: autoRun ? `${600 / speeds[speedIdx]}ms` : '300ms'
                                }}
                            >
                                {/* 30 ô đệm ảo bên trái đại diện cho dải băng vô hạn */}
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <div key={`pad-l-${i}`} className="w-10 h-10 flex items-center justify-center shrink-0 opacity-40">
                                        _
                                    </div>
                                ))}

                                {/* Các ký hiệu trên băng từ thật của step */}
                                {activeTapeState.tape.map((symbol, i) => (
                                    <div key={`tape-${i}`} className="w-10 h-10 flex items-center justify-center shrink-0">
                                        {symbol === ' ' ? '_' : symbol}
                                    </div>
                                ))}

                                {/* 30 ô đệm ảo bên phải đại diện cho dải băng vô hạn */}
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <div key={`pad-r-${i}`} className="w-10 h-10 flex items-center justify-center shrink-0 opacity-40">
                                        _
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- CONTROLS: Play, Pause, Step, Speed --- */}
                <div className="flex justify-between items-center bg-[#00FF00]/10 p-2 border border-[#00FF00]/30 mb-4 font-mono shrink-0">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setAutoRun(!autoRun)}
                            disabled={isFinished}
                            className="bg-[#00FF00] text-black px-3 py-1 font-bold disabled:opacity-50 disabled:bg-transparent disabled:text-[#00FF00] disabled:border disabled:border-[#00FF00]/50"
                        >
                            {autoRun ? '[PAUSE]' : '[RUN]'}
                        </button>
                        <button
                            onClick={handleStep}
                            disabled={autoRun || isFinished}
                            className="border border-[#00FF00] text-[#00FF00] px-4 py-1 hover:bg-[#00FF00] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                        >
                            [STEP]
                        </button>
                    </div>

                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => setSpeedIdx(s => Math.max(0, s - 1))}
                            className="w-8 h-8 border border-[#00FF00]/50 flex items-center justify-center hover:bg-[#00FF00]/30 text-lg font-bold"
                        >
                            -
                        </button>
                        <span className="w-14 text-center text-lg">{speeds[speedIdx]}x</span>
                        <button
                            onClick={() => setSpeedIdx(s => Math.min(speeds.length - 1, s + 1))}
                            className="w-8 h-8 border border-[#00FF00]/50 flex items-center justify-center hover:bg-[#00FF00]/30 text-lg font-bold"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* --- CURRENT STATE CARD (Bên dưới controls) --- */}
                {!isFinished && currentCard && (
                    <div className="border border-[#00FF00]/50 bg-black overflow-y-auto shadow-[0_0_10px_rgba(0,255,0,0.1)] mb-4">
                        <div className="bg-[#00FF00]/20 p-2 border-b border-[#00FF00]/30 text-center">
                            <span className="font-bold tracking-widest text-[#00FF00] text-sm">&gt; CURRENT_STATE [{currentCard.id}]</span>
                        </div>
                        <div className="p-2 space-y-1">
                            <div className="grid grid-cols-4 gap-1 text-center text-[10px] opacity-60 mb-2">
                                <div title="Read">IN</div>
                                <div title="Write">OUT</div>
                                <div title="Move">DIR</div>
                                <div title="Next State">NXT</div>
                            </div>
                            {currentCard.rules.map((rule, idx) => {
                                // Rule nào đang ứng với symbol hiện tại sẽ được highlight
                                const isHighlight = idx === activeRuleIdx;
                                return (
                                    <div key={idx} className={`grid grid-cols-4 gap-1 items-center font-mono transition-colors ${isHighlight ? 'bg-[#00FF00] text-black font-bold scale-[1.02]' : ''}`}>
                                        <div className={`text-center py-2 text-lg ${isHighlight ? 'text-black' : 'bg-[#00FF00]/10 text-[#00FF00]'}`}>
                                            {rule.read === ' ' ? '_' : rule.read}
                                        </div>
                                        <div className={`text-center py-2 text-lg ${!isHighlight && 'text-[#00FF00]'}`}>
                                            {rule.write === ' ' ? '_' : rule.write}
                                        </div>
                                        <div className={`text-center py-2 text-lg ${!isHighlight && 'text-yellow-300'}`}>
                                            {moveLabelMap[rule.move]}
                                        </div>
                                        <div className={`text-center py-2 text-lg ${!isHighlight && 'text-purple-400'}`}>
                                            {rule.next}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {(!currentCard && !isFinished) && (
                    <div className="text-center text-red-500 mt-4 animate-pulse border border-red-500 p-4 bg-red-500/10">
                        [ERROR: STATE '{activeTapeState?.currentState}' NOT FOUND]
                    </div>
                )}

                {/* --- HIỂN THỊ KẾT QUẢ PASS/FAIL VÀ NÚT RESET KHI HOÀN THÀNH --- */}
                {isFinished && (
                    <div className="mt-2 flex flex-col gap-3">
                        {test.status === 'success' ? (
                            <div className="border border-emerald-400 bg-emerald-400/10 text-emerald-400 p-4 text-center font-bold text-xl shadow-[0_0_15px_rgba(52,211,153,0.3)] animate-pulse">
                                [ TEST PASSED ]
                            </div>
                        ) : test.status === 'failed' ? (
                            <div className="border border-red-500 bg-red-500/10 text-red-500 p-4 text-center font-bold text-xl shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                [ TEST FAILED ]
                            </div>
                        ) : null}

                        <button
                            onClick={() => handleOpenTest(viewedTestIdx)}
                            className="bg-transparent border-2 border-blue-400 text-blue-400 py-3 w-full font-bold tracking-widest hover:bg-blue-400 hover:text-black transition-colors"
                        >
                            &gt; RESTART_TEST
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // ============================================
    // --- 2. MÀN HÌNH DANH SÁCH TEST (LIST VIEW) ---
    // ============================================
    return (
        <div className="p-4 flex flex-col h-full relative">
            <div className="flex justify-between items-center mb-4 border-b border-[#00FF00]/30 pb-2 shrink-0">
                <h2 className="text-lg font-bold uppercase">&gt; TEST_SUITE</h2>
            </div>

            {/* Danh sách Test Cases */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {tests.map((test, idx) => {
                    const isSuccess = test.status === 'success';
                    const isFailed = test.status === 'failed';
                    const isRunning = test.status === 'running';

                    // Set màu theo status
                    let statusColor = 'text-[#00FF00] border-[#00FF00]/30'; // pending/default
                    let resultText = '[ PENDING ]';

                    if (isRunning) {
                        statusColor = 'text-yellow-400 border-yellow-400/50';
                        resultText = '[ PROCESSING... ]';
                    } else if (isSuccess) {
                        statusColor = 'text-emerald-400 border-emerald-400 bg-emerald-400/10';
                        resultText = '[ PASS ]';
                    } else if (isFailed) {
                        statusColor = 'text-red-500 border-red-500 bg-red-500/10 text-shadow-red';
                        resultText = '[ FAILED ]';
                    }

                    return (
                        <div
                            key={idx}
                            className={`p-3 border flex flex-col gap-2 transition-all cursor-pointer hover:bg-[#00FF00]/20 active:scale-[0.98] ${statusColor}`}
                            onClick={() => handleOpenTest(idx)}
                        >
                            <div className="flex justify-between items-start pointer-events-none">
                                <div className="font-bold opacity-80 text-sm">TEST_CASE #{idx.toString().padStart(2, '0')}</div>
                                <div className="text-xs tracking-wider">{resultText}</div>
                            </div>

                            <div className="text-sm space-y-1 text-slate-300 font-mono pointer-events-none">
                                <div className="truncate" title={`IN: '${test.input}'`}>
                                    <span className="opacity-50 min-w-[3rem] inline-block">IN:</span> '{test.input}'
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Button Submit bự dưới cùng */}
            <div className="mt-4 pt-4 border-t border-[#00FF00]/30 shrink-0">
                <button
                    disabled={!allTestsPassed}
                    onClick={() => {
                        completeCurrentLevel();
                        if (onOpenMenu) onOpenMenu();
                    }}
                    className={`w-full py-4 font-bold tracking-[0.2em] uppercase text-lg transition-all
            ${allTestsPassed
                            ? 'bg-[#00FF00] text-black shadow-[0_0_20px_rgba(0,255,0,0.4)] animate-pulse hover:animate-none'
                            : 'border-2 border-slate-700 text-slate-600 bg-transparent cursor-not-allowed'
                        }
          `}
                >
                    {allTestsPassed ? '> SUBMIT_SOLUTION <' : 'LOCKED'}
                </button>
            </div>
        </div>
    );
};

export default TestsTab;
