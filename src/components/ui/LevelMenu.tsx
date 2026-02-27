import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { LEVELS } from '../../levels';

interface LevelMenuProps {
    onClose: () => void;
}

const LevelMenu: React.FC<LevelMenuProps> = ({ onClose }) => {
    const { currentLevelId, completedLevels, loadLevelById, isAdmin } = useGameStore();

    const handleSelectLevel = (id: string) => {
        loadLevelById(id);
        onClose();
    };

    return (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm border-2 border-[#00FF00] bg-black p-6 shadow-[0_0_30px_rgba(0,255,0,0.3)] relative font-mono text-[#00FF00]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-2xl font-bold hover:text-white transition-colors"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold tracking-widest border-b border-[#00FF00]/50 pb-2 mb-6 text-center">
                    SELECT_SECTOR
                </h2>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#00FF00]/50">
                    {LEVELS.map((level, idx) => {
                        const isCurrent = level.info.id === currentLevelId;
                        const isCompleted = completedLevels.includes(level.info.id);

                        // Rule đơn giản: Màn đầu tiên luôn mở, Màn tiếp theo mở nếu màn trước pass
                        const isUnlocked = isAdmin || idx === 0 || completedLevels.includes(LEVELS[idx - 1].info.id);

                        return (
                            <button
                                key={level.info.id}
                                disabled={!isUnlocked}
                                onClick={() => handleSelectLevel(level.info.id)}
                                className={`w-full p-4 border text-left transition-all relative
                                    ${isCurrent ? 'bg-[#00FF00]/20 border-[#00FF00] shadow-[0_0_10px_rgba(0,255,0,0.5)_inset]' : ''}
                                    ${!isUnlocked
                                        ? 'border-gray-800 text-gray-600 bg-black/50 cursor-not-allowed'
                                        : 'border-[#00FF00]/50 hover:bg-[#00FF00]/10 hover:border-[#00FF00] cursor-pointer'
                                    }
                                `}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`font-bold uppercase ${!isUnlocked ? 'opacity-50' : ''}`}>
                                        {level.info.id.replace('_', ' ')}
                                    </span>
                                    {isCompleted && (
                                        <span className="text-sm border border-[#00FF00] px-2 bg-[#00FF00] text-black font-bold">
                                            CLEARED
                                        </span>
                                    )}
                                </div>
                                <div className={`text-xs opacity-70 truncate ${!isUnlocked ? 'opacity-30' : ''}`}>
                                    {isUnlocked ? level.info.title : '[ENCRYPTED DATA]'}
                                </div>

                                {!isUnlocked && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-30">
                                        🔒
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LevelMenu;
