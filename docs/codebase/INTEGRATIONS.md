# External Integrations

## 1) Integration Inventory

| System | Type | Purpose | Auth model | Criticality | Evidence |
|---|---|---|---|---|---|
| Browser localStorage qua Zustand persist | Browser storage | Lời giải, tiến độ, test statuses, admin flag | Theo browser origin, không có user auth | Cao đối với dữ liệu đã lưu | `src/store/useGameStore.ts` |
| GitHub Pages qua gh-pages | Công cụ publish | Script publish `dist/` | [TODO] Cấu hình git/credential bên ngoài repo | Chỉ khi chạy deploy | `package.json` |
| Vercel / Cloudflare Pages | Build environment detection | Chọn URL base `/` | Không có client/API credential trong code | Khi build ở môi trường này | `vite.config.ts` |

Không tìm thấy HTTP API, database client, auth provider, queue, gateway/proxy hoặc monitoring SDK trong source/manifest. Nhánh build theo biến môi trường không chứng minh website đang host ở nhà cung cấp nào.

## 2) Data Stores

| Store | Role | Access layer | Key risk | Evidence |
|---|---|---|---|---|
| `turing-game-storage` | Persist completedLevels, savedSolutions, savedTestStatuses, isAdmin | Zustand `persist` + `partialize` | Client sửa/xóa được; chưa có migration/schema đầy đủ | `src/store/useGameStore.ts:203` |
| Zustand memory | Current level, current tests/cards và các dữ liệu đã hydrate | Store actions/hooks | Không persist currentLevelId/levelInfo/current tape | `src/store/useGameStore.ts` |
| Static level catalog | 25 đề bài và 109 input/expected | Import `LEVELS` | Chỉnh catalog có thể làm saved statuses lỗi thời | `src/levels/index.ts` |
| `results.json` | Bản mô tả và input tham khảo | Chưa thấy import trong source | Trùng dữ liệu với catalog, dễ lệch khi sửa riêng | `src/levels/results.json` |

Không có đồng bộ đa thiết bị hoặc tài khoản trong code hiện tại.

## 3) Secrets and Credentials Handling

- Không tìm thấy đọc secret hoặc biến runtime trong app. Biến `VERCEL`, `CF_PAGES` dùng ở build config để chọn base, không phải credential.
- Tìm kiếm source/config không thấy API key, endpoint dịch vụ hoặc auth flow. Không thực hiện audit bí mật trong lịch sử git hay dependency security audit.
- [TODO] Credential và lifecycle/rotation cho tác vụ publish nằm ngoài bằng chứng repo hiện tại.
- `window.turingAdmin()` bật isAdmin và flag được persist; đây là cơ chế mở level ở client, không phải hệ thống phân quyền server.

## 4) Reliability and Failure Behavior

- Không có network request nên không có retry/backoff/circuit breaker hoặc network timeout trong app source.
- Store chỉ kiểm tra saved cards bằng tập ký tự đọc khớp allowedSymbols; không kiểm tra đầy đủ ID, write, move, next và version của catalog/test.
- Không cấu hình persist version/migrate hoặc UI fallback khi storage không dùng được. [TODO] Chưa kiểm tra browser storage quota, private mode hay dữ liệu hỏng qua UI.
- 10.000 bước là giới hạn tính toán engine, không phải timeout của tích hợp.

## 5) Observability for Integrations

- Không có logger/metrics/tracing cho persistence hoặc deployment trong source.
- Chỉ thấy console message khi bật admin; không có telemetry service được cấu hình.
- Không tìm thấy workflow CI/CD trong inventory. [TODO] Build/deploy log của hosting thực tế chưa có trong repo.

## 6) Evidence

- `src/store/useGameStore.ts`, `src/App.tsx`
- `src/levels/index.ts`, `src/levels/results.json`
- `package.json`, `package-lock.json`, `vite.config.ts`
- Inventory `rg --files --hidden`; tìm kiếm `fetch(`, `axios`, `http`, `localStorage`, `process.env`, `import.meta.env` trong source/config.
