# Technology Stack

## 1) Runtime Summary

| Area | Value | Evidence |
|---|---|---|
| Ngôn ngữ | TypeScript `~5.9.3`, lockfile `5.9.3`; TSX cho UI | `package.json`, `package-lock.json`, `src/main.tsx` |
| Runtime | Ứng dụng chạy trong browser; máy đọc repo dùng Node `v26.5.0`, npm `11.17.0` | `index.html`, kết quả `node --version`, `npm --version` |
| Phiên bản Node của dự án | Không có `engines` hoặc file pin Node; Vite đã cài yêu cầu `^20.19.0 || >=22.12.0` | `package.json`, `node_modules/vite/package.json` |
| Package manager | npm, lockfile v3 | `package-lock.json` |
| Module/build | ESM, Vite; `tsc -b` trước khi bundle | `package.json`, `vite.config.ts`, `tsconfig.json` |

## 2) Production Frameworks and Dependencies

Các dependency được khai báo trong `dependencies`; phiên bản dưới đây là phiên bản lockfile.

| Dependency | Version | Role in system | Evidence |
|---|---|---|---|
| react / react-dom | 19.2.4 / 19.2.4 | Component, hooks, browser root | `src/main.tsx`, `src/components/` |
| zustand | 5.0.11 | Global store, persist localStorage | `src/store/useGameStore.ts` |
| lucide-react | 0.575.0 | Icon khóa màn chơi | `src/components/ui/LevelMenu.tsx` |
| @tailwindcss/vite | 4.2.1 | Plugin build CSS; được đặt trong dependencies dù dùng lúc build | `vite.config.ts` |
| clsx | 2.1.1 | Có khai báo, chưa tìm thấy import trong source | `package.json`, toàn bộ `src/` |
| tailwind-merge | 3.5.0 | Có khai báo, chưa tìm thấy import trong source | `package.json`, toàn bộ `src/` |

## 3) Development Toolchain

| Tool | Purpose | Evidence |
|---|---|---|
| vite 7.3.1, @vitejs/plugin-react 5.1.4 | Dev server, React transform, build | `vite.config.ts`, `package-lock.json` |
| typescript 5.9.3, @types/node/react/react-dom | Type checking | `tsconfig.app.json`, `tsconfig.node.json`, `package.json` |
| tailwindcss 4.2.1 | Utility CSS | `src/index.css`, `package.json` |
| ESLint 9.39.3, @eslint/js, typescript-eslint, globals | JS/TS lint và browser globals | `eslint.config.js` |
| eslint-plugin-react-hooks / react-refresh | Kiểm tra hooks và Fast Refresh | `eslint.config.js` |
| gh-pages 6.3.0 | Publish thư mục dist qua script deploy | `package.json` |
| autoprefixer 10.4.27, postcss 8.5.6 | Được khai báo; không có PostCSS config riêng trong repo | `package.json`, inventory file |

## 4) Key Commands

```bash
npm ci
npm run dev
npm run build
npm run lint
npm run preview
```

Không có `npm test`. `npm run deploy` có side effect publish, tự chạy `predeploy` để build rồi `gh-pages -d dist`; không chạy deploy trong lần đọc repo này.

## 5) Environment and Config

- `vite.config.ts` dùng biến build `VERCEL` hoặc `CF_PAGES` để chọn base `/`; khi cả hai không truthy, base là `/turinggame/`, kể cả local. Comment về local `/` không khớp biểu thức thực tế.
- Không tìm thấy biến môi trường runtime, `.env.example`, backend, Docker hoặc CI config trong inventory repo.
- TypeScript strict, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`; app target ES2022, Vite config target ES2023.
- Build tạo `dist/` đã được gitignore. [TODO] Hosting đang dùng thực tế chưa xác định từ repo; script hiện có dành cho GitHub Pages và config có nhánh Vercel/Cloudflare Pages.

## 6) Evidence

- `package.json`, `package-lock.json`
- `vite.config.ts`, `eslint.config.js`
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- `src/main.tsx`, `src/index.css`, `.gitignore`
- Terminal đọc repo ngày 2026-10-20: `node --version`, `npm --version`, `npm run build`, inventory `rg --files --hidden`.
