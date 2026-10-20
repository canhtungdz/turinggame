# Testing Patterns

## 1) Test Stack and Commands

- Không có test runner, assertion/mocking library hoặc script test trong `package.json`.
- Các kiểm tra repo có sẵn:

```bash
npm run build  # tsc -b && vite build
npm run lint   # eslint .
```

- Không có command unit/integration/E2E/coverage. Bộ TESTS trong UI dùng 109 test cases bài tập, không tự kiểm tra regression của engine/store.

## 2) Test Layout

- Không tìm thấy `*.test.*`, `*.spec.*`, test setup hoặc test config trong inventory source.
- `src/levels/index.ts` chứa 25 level và 109 test với `input`, `expected`, `status: pending`.
- `src/levels/results.json` chứa title/problem và input cho các level, không có expected và không được import vào runtime source.
- [TODO] Vị trí/naming test file và setup chưa được định nghĩa.

## 3) Test Scope Matrix

| Scope | Covered? | Typical target | Notes |
|---|---|---|---|
| Unit | Không có suite tự động | Engine và store | Đã có probe tạm trong lần đọc, không commit suite |
| Integration | Không có suite tự động | Store ↔ catalog ↔ persistence | Probe chỉ xác nhận logic memory store; chưa kiểm tra browser persistence |
| E2E | Không có suite tự động | Sửa card → chạy test → submit → mở màn | Chưa chạy browser trong lần đọc repo |
| Type/build | Có script, pass lần đọc này | Toàn bộ TS và bundle | Không chứng minh logic game đúng |
| Lint | Có script, fail lần đọc này | TS/TSX | Một error, một warning |
| Gameplay | 109 test cases có sẵn | Chương trình do người chơi viết | Thực thi thủ công bằng STEP/RUN |

## 4) Mocking and Isolation Strategy

- Repo chưa cấu hình mocking hoặc isolation tự động.
- Probe tạm được chạy bằng Node + esbuild bundle các export từ source; chỉ sửa Zustand store trong tiến trình, không sửa dữ liệu localStorage của browser người dùng.
- Mỗi probe reset `savedSolutions`/`savedTestStatuses`, nạp level rồi thực hiện action cần kiểm chứng. Middleware storage báo unavailable trong tiến trình probe; vì vậy kết luận giới hạn ở engine và logic memory store.
- Engine không mutate tape đầu vào do copy trước khi ghi; đây là quan sát code, chưa có regression suite bảo vệ.

## 5) Coverage and Quality Signals

Kết quả đọc repo ngày 2026-10-20:

- `npm run build`: exit 0; Vite 7.3.1, JS 233,74 kB (gzip 72,40 kB), CSS 25,74 kB (gzip 5,44 kB). Node có warning deprecation `module.register()`.
- `npm run lint`: exit 1; `src/App.tsx:19` lỗi `@typescript-eslint/no-explicit-any`; `src/components/game/TestsTab.tsx:78` warning thiếu `handleStep` trong dependency array.
- Probe Input rỗng: state với `tape: []`, head 0, card mặc định của level 15 thất bại ở bước 0 với `No rule for symbol 'undefined' in state 01`. Level 15 test index 2 và level 17 test index 1 có input rỗng (index bắt đầu 0).
- Probe sửa cấu trúc: đánh dấu toàn bộ test level 1 success → `addCard('02')` hoặc `removeCard('02')` → test hiện tại pending → nạp level 2 rồi level 1 → toàn bộ trở lại success. Xác nhận saved statuses không bị invalidation trong hai action đó.
- Đối chiếu toàn bộ 109 expected với 25 hàm biến đổi trực tiếp theo đề bài: không có mismatch sau trim. Đây là kiểm tra dữ liệu, không chứng minh mọi level đều giải được bằng engine/UI hiện tại hoặc trong giới hạn bước.
- Chưa có coverage tool/threshold; [TODO] coverage và lịch sử flaky tests chưa xác định.

Các vùng cần regression nếu tiếp tục phát triển: tape rỗng, mở rộng hai biên, HALT và timeout, xóa state đang được tham chiếu, invalidation kết quả theo lời giải/catalog, đổi level khi đang ở test detail, reload và dữ liệu persist hỏng.

## 6) Evidence

- `package.json`, `eslint.config.js`, `tsconfig.app.json`, `tsconfig.node.json`
- `src/engine/turingEngine.ts`, `src/store/useGameStore.ts`
- `src/levels/index.ts`, `src/levels/results.json`, `src/components/game/TestsTab.tsx`
- Terminal ngày 2026-10-20: `npm run build`, `npm run lint`, Node/esbuild probe import trực tiếp engine/store/catalog và đối chiếu expected.
