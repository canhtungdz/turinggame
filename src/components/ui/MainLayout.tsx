import React, { useState } from 'react';
import InfoTab from '../game/InfoTab';
import TestsTab from '../game/TestsTab';
import CardsTab from '../game/CardsTab';
import { useGameStore } from '../../store/useGameStore';

type TabType = 'INFO' | 'CARDS' | 'TESTS';

interface MainLayoutProps {
    children?: React.ReactNode;
    onOpenMenu?: () => void;
}

export interface TabProps {
    onOpenMenu?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onOpenMenu }) => {
    const { levelInfo } = useGameStore();
    const [activeTab, setActiveTab] = useState<TabType>('INFO');

    const renderContent = () => {
        switch (activeTab) {
            case 'INFO':
                return <InfoTab />;
            case 'CARDS':
                return <CardsTab />;
            case 'TESTS':
                // Truyền onOpenMenu xuống riêng cho màn TEST
                return <TestsTab onOpenMenu={onOpenMenu} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-md h-full bg-black text-[#00FF00] font-mono flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(0,255,0,0.15)] mx-auto md:border md:border-[#00FF00]/30 selection:bg-[#00FF00] selection:text-black">
            {/* Vệt sáng màn hình CRT mờ (hiệu ứng phụ) */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* HEADER */}
            <header className="flex items-center justify-between p-4 border-b border-[#00FF00] z-10 bg-black">
                <h1 className="text-2xl font-bold tracking-widest drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">
                    {levelInfo?.id?.toUpperCase() || 'LVL_00'}
                </h1>
                <button
                    onClick={onOpenMenu}
                    className="px-3 py-1 border border-[#00FF00] hover:bg-[#00FF00] hover:text-black transition-colors font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,0,0.2)]"
                >
                    MENU
                </button>
            </header>

            {/* TABS (Trải ngang) */}
            <div className="flex w-full border-b border-[#00FF00] z-10 bg-black">
                {(['INFO', 'CARDS', 'TESTS'] as TabType[]).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 font-bold border-r border-[#00FF00] last:border-r-0 transition-colors uppercase tracking-widest
                ${isActive
                                    ? 'bg-[#00FF00] text-black shadow-[0_0_15px_rgba(0,255,0,0.5)_inset]'
                                    : 'bg-black text-[#00FF00] hover:bg-[#00FF00]/10'
                                }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* CONTENT AREA */}
            <main className="flex-1 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-[#00FF00]/50 scrollbar-track-transparent">
                {/* Render tuỳ biến (hoặc lấy children truyền từ ngoài vào) */}
                {children || renderContent()}
            </main>

            {/* Scanline Effect (Phủ mờ sọc ngang) */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.025)_50%)] bg-[size:100%_4px] z-50 mix-blend-overlay" />
        </div>
    );
};

export default MainLayout;
