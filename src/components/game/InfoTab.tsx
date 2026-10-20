import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { VI_LEVEL_TEXT } from '../../levels/vi';

const InfoTab: React.FC = () => {
    const levelInfo = useGameStore((state) => state.levelInfo);
    const language = useLanguageStore((state) => state.language);

    if (!levelInfo) {
        return (
            <div className="p-4 text-center mt-10 text-slate-500 animate-pulse">
                [NO_DATA_AVAILABLE]
            </div>
        );
    }

    const { description, hints } = language === 'vi'
        ? VI_LEVEL_TEXT[levelInfo.id] ?? levelInfo
        : levelInfo;

    return (
        <div className="p-4 flex flex-col gap-6">
            {/* Title */}
            <div>
                <h2 className="text-xl font-bold mb-2 uppercase border-b border-[#00FF00]/30 pb-2">
                    &gt; MISSION_OBJECTIVE
                </h2>
                <p lang={language} className="text-slate-200 indent-4 tracking-wide leading-relaxed whitespace-pre-wrap">
                    {description}
                </p>
            </div>

            {/* Hints / Examples */}
            {hints.length > 0 && (
                <div className="bg-[#00FF00]/5 border border-[#00FF00]/30 p-3 rounded-sm">
                    <h3 className="font-bold mb-2 uppercase text-sm opacity-80">
                        &gt; EXAMPLES
                    </h3>
                    <ul lang={language} className="list-disc list-inside space-y-1 text-slate-300">
                        {hints.map((hint, idx) => (
                            <li key={idx} className="text-sm whitespace-pre-wrap">{hint}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default InfoTab;
