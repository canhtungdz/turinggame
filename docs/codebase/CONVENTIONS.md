# Coding Conventions

## 1) Naming Rules

| Item | Rule quan sát được | Example | Evidence |
|---|---|---|---|
| Component files | PascalCase `.tsx` | `MainLayout.tsx`, `TestsTab.tsx` | `src/components/` |
| Store/engine files | camelCase `.ts` | `useGameStore.ts`, `turingEngine.ts` | `src/store/`, `src/engine/` |
| Functions/variables | camelCase; hooks bắt đầu `use`, UI handlers bắt đầu `handle` | `runTuringMachineStep`, `handleOpenTest` | Engine, store, game components |
| Types/interfaces | PascalCase | `MachineRule`, `GameState`, `TapeState` | `src/engine/types.ts`, store, engine |
| Constants | UPPER_SNAKE_CASE cho một số hằng; cũng có camelCase | `HALT_STATE`, `MAX_STEPS`, `speeds` | Store, engine, TestsTab |
| IDs | Chuỗi zero-pad cho card; `lvl_XX` cho level | `01`, `00`, `lvl_01` | `src/levels/index.ts`, `CardsTab.tsx` |

## 2) Formatting and Linting

- Không tìm thấy formatter config hoặc script format. Source chủ yếu single quote, semicolon, indent 4; entry/config có indent 2 và thường bỏ semicolon. Level data viết dạng JSON trong TS.
- ESLint flat config, ignore `dist`, áp dụng JS recommended, TypeScript recommended, React Hooks recommended và React Refresh Vite cho TS/TSX.
- TypeScript strict; dùng `import type` với `verbatimModuleSyntax`, cấm unused locals/parameters và switch fallthrough.
- Chạy `npm run lint` và `npm run build`. Lần đọc ngày 2026-10-20: lint có 1 error `no-explicit-any` tại App và 1 warning `exhaustive-deps` tại TestsTab; build pass.

## 3) Import and Module Conventions

- ESM imports; thư viện ngoài thường ở đầu, sau đó relative source imports. Không có cấu hình enforce import order.
- Import nội bộ dùng relative path, đa số bỏ extension; `main.tsx` import `App.tsx` có extension. Không thấy alias trong tsconfigs/Vite.
- Component default export; engine/store/level data named exports. `src/levels/index.ts` được import bằng đường dẫn thư mục.
- Props dùng interface và nhiều component khai báo `React.FC`; `App` dùng function declaration trực tiếp.

## 4) Error and Logging Conventions

- Engine trả `TapeState` với status `failed` hoặc `timeout` và `error` text, không throw cho thiếu state/rule hoặc quá bước. UI chỉ hiển thị kết quả PASS/FAILED chung sau khi kết thúc, chưa render `activeTapeState.error`.
- Store thường bỏ qua input không hợp lệ bằng return (`loadLevelById` không tìm thấy ID, add trùng/00). Không có runtime schema validator; các action có mức kiểm tra khác nhau.
- Có một `console.log` có CSS format cho `window.turingAdmin`; không thấy logging framework hoặc quy tắc fields/redaction trong repo.
- [TODO] Chưa có tài liệu quy ước xử lý lỗi persistence hoặc logging chung ngoài hành vi code hiện tại.

## 5) Testing Conventions

- Chưa có automated test file, runner hoặc naming convention được cấu hình.
- `LEVELS[].tests` là dữ liệu bài tập người chơi, không phải suite regression của repo.
- Không tìm thấy mocking config hay coverage threshold. [TODO] Quy ước test và ngưỡng coverage chưa được định nghĩa trong repo.

## 6) Evidence

- `eslint.config.js`, `tsconfig.app.json`, `tsconfig.node.json`, `package.json`
- `src/main.tsx`, `src/App.tsx`, `src/engine/types.ts`, `src/engine/turingEngine.ts`
- `src/store/useGameStore.ts`, toàn bộ `src/components/`, `src/levels/index.ts`
- Terminal `npm run lint`, `npm run build` ngày 2026-10-20.
