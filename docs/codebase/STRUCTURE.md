# Codebase Structure

## 1) Top-Level Map

| Path | Purpose | Evidence |
|---|---|---|
| `README.md` | Hướng dẫn chơi tiếng Việt, bốn screenshot | Nội dung README |
| `index.html` | HTML shell, favicon, root DOM, import entry TSX | Nội dung file |
| `src/main.tsx`, `src/App.tsx` | Mount React; nạp level đầu, bật menu, đăng ký admin console helper | Nội dung hai file |
| `src/components/ui/` | Khung giao diện và menu chọn màn | `MainLayout.tsx`, `LevelMenu.tsx` |
| `src/components/game/` | Đề bài, trình sửa cards, mô phỏng và chấm test | `InfoTab.tsx`, `CardsTab.tsx`, `TestsTab.tsx` |
| `src/engine/` | Types miền bài toán và hàm chuyển một bước | `types.ts`, `turingEngine.ts` |
| `src/store/` | Zustand store và persist lời giải/tiến độ | `useGameStore.ts` |
| `src/levels/` | 25 level, 109 test; JSON tham khảo chưa được import | `index.ts`, `results.json` |
| `src/index.css` | Tailwind import, style nền, root và scrollbar | Nội dung file |
| `src/assets/sounds/`, `src/hooks/`, `src/utils/` | Thư mục hiện không có file theo inventory | Kết quả scan và `rg --files` |
| `public/` | `1.png`–`4.png` dùng trong README, `favicon.svg` dùng trong HTML | `README.md`, `index.html` |
| `package*.json` | Manifest scripts và npm lockfile | Nội dung hai file |
| `vite.config.ts`, `tsconfig*.json`, `eslint.config.js` | Build, typecheck và lint | Nội dung các config |
| `dist/`, `node_modules/` | Build output và dependencies; gitignore | `.gitignore` |
| `docs/codebase/` | Bảy tài liệu tạo trong lần đọc repo này | Các file Markdown trong thư mục |

## 2) Entry Points

- Runtime: `index.html` → `src/main.tsx` → `App.tsx`, bọc React `StrictMode`.
- `App` gọi `loadLevelById('lvl_01')` nếu chưa có current level. Current level không nằm trong persisted subset nên reload browser bắt đầu từ level 1, giữ lời giải và tiến độ đã lưu.
- Không tìm thấy entry backend, worker, CLI hoặc scheduled job của ứng dụng.
- Các script dev/build/preview chọn Vite; project references TypeScript tách app và Vite config.

## 3) Module Boundaries

Cột cuối mô tả phạm vi đang quan sát trong code, không phải quy tắc kiến trúc được enforce.

| Boundary | What belongs here | Ngoài phạm vi hiện tại |
|---|---|---|
| `engine/` | Một bước đọc/ghi/di chuyển/chuyển state; định nghĩa types | Chấm Expected Output, animation, lưu tiến độ |
| `store/` | Load level, sửa cards, test statuses, completion, persistence | Tape đang chạy và timer |
| `levels/` | Đề bài, allowedSymbols, input và expected | Lời giải người chơi |
| `components/game/` | Tương tác cards, hiển thị đề, orchestration mô phỏng/chấm test | Backend/API |
| `components/ui/` | Tabs, layout, menu, hiển thị khóa/mở màn | Thuật toán một bước engine |

## 4) Naming and Organization Rules

- Component PascalCase `.tsx`; store/hàm engine camelCase `.ts`; dữ liệu level qua `index.ts`.
- Source kết hợp thư mục theo trách nhiệm (`engine`, `store`, `levels`) và UI theo tính năng (`game`, `ui`). Không có workspace/monorepo manifest.
- Import nội bộ tương đối, chưa có alias paths. `src/levels/index.ts` là barrel dữ liệu trực tiếp export `LEVELS` và `GameLevel`.
- Không dùng code minified trong `dist/` để suy ra convention source. Inventory source là 12 file TS/TSX, khoảng 2.202 dòng; thêm 260 dòng JSON và 42 dòng CSS, tổng 2.504 dòng.

## 5) Evidence

- `index.html`, `src/main.tsx`, `src/App.tsx`
- Toàn bộ `src/components/`, `src/engine/`, `src/store/`, `src/levels/`
- `.gitignore`, `package.json`, `tsconfig.json`
- Terminal: `rg --files --hidden -g '!node_modules' -g '!.git' -g '!dist'`, `wc -l src/**/*.ts src/**/*.json src/components/**/*.tsx src/*.tsx src/*.css`.
