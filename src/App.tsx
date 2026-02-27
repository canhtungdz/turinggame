import { useEffect, useState } from 'react';
import MainLayout from './components/ui/MainLayout';
import LevelMenu from './components/ui/LevelMenu';
import { useGameStore } from './store/useGameStore';

export default function App() {
  const loadLevelById = useGameStore(state => state.loadLevelById);
  const currentLevelId = useGameStore(state => state.currentLevelId);
  const enableAdminMode = useGameStore(state => state.enableAdminMode);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Tự động nạp màn chơi mặc định nếu chưa có
    if (!currentLevelId) {
      loadLevelById('lvl_01');
    }

    // Gắn Developer Backdoor Console Script
    (window as any).turingAdmin = () => {
      enableAdminMode();
      console.log("%c[ADMIN OVERRIDE ENABLED] \nFull Sector Access Granted!", "color: #00FF00; font-size: 16px; font-weight: bold; background: black; padding: 4px; border: 1px solid #00FF00;");
      return "[SYSTEM]: You now have full access to all levels.";
    };

  }, [loadLevelById, currentLevelId, enableAdminMode]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#0a0a0a] relative">
      <MainLayout onOpenMenu={() => setShowMenu(true)} />
      {showMenu && <LevelMenu onClose={() => setShowMenu(false)} />}
    </div>
  )
}
