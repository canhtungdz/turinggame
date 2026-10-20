# Codebase Concerns

## 1) Top Risks (Prioritized)

Đây là kết quả đọc/kiểm chứng, chưa sửa hành vi ứng dụng.

| Severity | Concern | Evidence | Impact | Suggested action |
|---|---|---|---|---|
| High | Input rỗng tạo `tape: []`; engine đọc undefined thay vì blank | `TestsTab.tsx:36`, `turingEngine.ts:24`, probe trong `TESTING.md` | Không vượt được test rỗng level 15/17 bằng rule alphabet hợp lệ | Chuẩn hóa tape rỗng thành một blank và bảo vệ bằng regression test |
| High | Thêm/xóa card reset tests hiện tại nhưng bỏ sót savedTestStatuses | `useGameStore.ts:113`, `useGameStore.ts:136`, probe | Đổi màn rồi quay lại khôi phục success của chương trình trước, có thể submit sai | Dùng chung một đường invalidation cho mọi thay đổi chương trình |
| Medium | Đổi level không reset tape/index đang xem | `MainLayout.tsx`, `LevelMenu.tsx`, `TestsTab.tsx:88` | Rủi ro tape cũ chạy với cards mới, hoặc truy cập undefined khi index ngoài số test mới; chưa xác nhận browser | Reset theo currentLevelId hoặc remount test view theo level |
| Medium | Lint đang fail | `App.tsx:19`, `TestsTab.tsx:78`, kết quả lint | Check chất lượng không pass dù build pass | Khai báo kiểu window helper; xử lý dependency effect |
| Medium | `_` thật và blank `' '` cùng hiển thị `_` | `CardsTab.tsx:180`, `CardsTab.tsx:188`, level 14/22/23 | Người chơi khó phân biệt hai ký tự khi chỉnh rule | Hiển thị phân biệt hoặc giải thích alphabet |
| Medium | Xóa card không sửa rule đang tham chiếu card đó | `useGameStore.ts:136`, `turingEngine.ts:28` | Máy fail ở lần chuyển đến state bị xóa | Chặn/xác nhận xóa state đang được dùng hoặc sửa transition phù hợp |
| Low | Comment Vite về local base khác biểu thức | `vite.config.ts:7` | Local mặc định base `/turinggame/`, không phải `/` như comment | Đồng bộ comment với chính sách base đã chọn |

## 2) Technical Debt

| Debt item | Why it exists | Where | Risk if ignored | Suggested fix |
|---|---|---|---|---|
| Chưa có regression suite | Không có test script/config/file; lý do lịch sử [TODO] | `package.json`, inventory source | Bug engine/persistence khó phát hiện | Bắt đầu với hai bug đã tái hiện và các biên engine |
| Engine phụ thuộc store để lấy HALT | Hằng được export ở store | `turingEngine.ts:2` | Khó import engine độc lập khỏi Zustand/catalog | Tách domain constants |
| Không version/migrate persistence | Persist config chỉ có name/partialize | `useGameStore.ts:203` | Saved statuses có thể cũ sau thay expected/input mà alphabet vẫn giữ nguyên | Thêm schema/catalog version và chính sách invalidation |
| Store không bảo vệ mọi invariant | `removeCard` không chặn 01; `completeCurrentLevel` không kiểm tra tests; UI mới chặn | `useGameStore.ts:102`, `useGameStore.ts:136`, CardsTab/TestsTab | Gọi action trực tiếp có thể tạo state không hợp lệ | Enforce invariant trong action |
| Trùng dữ liệu level | Catalog và JSON cùng lưu mô tả/input; JSON chưa được import | `src/levels/index.ts`, `results.json` | Sửa hai nguồn riêng dễ lệch | Chọn nguồn dữ liệu chính và generate khi cần |
| Dependencies chưa dùng rõ ràng | clsx/tailwind-merge có trong manifest nhưng không import; không biết ý định giữ lại | `package.json`, toàn bộ src | Tăng bề mặt bảo trì dependency | Xác nhận nhu cầu rồi dọn khi có tác vụ phù hợp |

Không tìm thấy TODO/FIXME/HACK marker trong production source. Không có test TODO để phân loại; thiếu regression là khoảng trống kiểm thử, không phải bằng chứng mọi code đều sai.

## 3) Security Concerns

| Risk | OWASP category | Evidence | Current mitigation | Gap |
|---|---|---|---|---|
| Client có thể tự mở khóa level/admin/completion | N/A cho game offline cá nhân; nếu dùng như quyền server thì cần thiết kế khác | `App.tsx:19`, store persist, `LevelMenu.tsx` | UI khóa theo completedLevels | Không có server/auth; mục đích admin cần hỏi người dùng |
| Dữ liệu persist chỉ được kiểm tra một phần | N/A | `useGameStore.ts:70` | So tập read symbols với allowedSymbols | Không schema toàn bộ card/rule/status và không catalog version |

Không tìm thấy API call, credential hoặc xử lý HTML thô trong source đã đọc. Chưa thực hiện dependency vulnerability audit hay kiểm tra lịch sử secrets; không kết luận mức an toàn tổng thể từ việc không thấy các mẫu trên.

## 4) Performance and Scaling Concerns

| Concern | Evidence | Current symptom | Scaling risk | Suggested improvement |
|---|---|---|---|---|
| Mỗi bước copy tape, tìm card/rule bằng find | `turingEngine.ts` | Chưa đo profiler | Tốn theo độ dài tape và số card/rule khi máy lớn | Đo trước; cân nhắc lookup map khi có nhu cầu |
| Một timeout + render cho mỗi bước; UI render toàn tape và 60 ô đệm | `TestsTab.tsx` | Chưa benchmark mức 2000x | Delay nhỏ hơn 1ms không đảm bảo tốc độ tương ứng, render có thể thành nút thắt | Batch nhiều bước/khung hình, chỉ render vùng tape đang xem |
| Nhiều component subscribe cả store | CardsTab, TestsTab, MainLayout, LevelMenu gọi `useGameStore()` | Chưa đo re-render | Component nhận update ngoài phần state cần dùng | Dùng selector sau khi đo hoặc khi sửa liên quan |
| Level catalog 1.088 dòng nạp tĩnh | `src/levels/index.ts` | Build JS 233,74 kB, gzip 72,40 kB | Catalog lớn hơn sẽ tăng bundle đầu | Chỉ cân nhắc chia catalog khi có số liệu tải trang |

Không có server/database nên chưa có bằng chứng về N+1, request tuần tự hoặc bottleneck đa instance.

## 5) Fragile/High-Churn Areas

| Area | Why fragile | Churn signal | Safe change strategy |
|---|---|---|---|
| `src/levels/index.ts` | Catalog dài, chứa description/alphabet/expected | 3 lần xuất hiện trong log 90 ngày | Kiểm tra expected và tính tương thích lời giải cũ |
| `vite.config.ts` | Base URL tùy môi trường | 2 lần trong log 90 ngày | Kiểm tra output path ở môi trường mục tiêu |
| `useGameStore.ts`, `TestsTab.tsx` | Trạng thái lưu và mô phỏng chia ở hai nơi | Mỗi file 1 lần trong log 90 ngày; không phải churn cao về số lượng tuyệt đối | Tái hiện các luồng sửa card/đổi màn/reload trước khi đổi |

Repo có 10 commit trong log đã đọc. Không suy ra độ ổn định chỉ từ số commit nhỏ. File source dài nhất là catalog; không có component/source logic nào vượt 500 dòng.

## 6) `[ASK USER]` Questions

1. [ASK USER] `window.turingAdmin()` có được chủ đích giữ trong bản phát hành công khai để mở toàn bộ màn chơi không? Code hiện luôn đăng ký helper và persist admin flag, trong khi README chỉ mô tả tiến trình chơi thông thường.

Câu trả lời không chặn việc đọc repo hoặc ghi nhận hành vi hiện có.

### Intent vs. Reality

- README mô tả hoàn thành màn khi test pass; thực tế hai test input rỗng không chạy được, và thêm/xóa card có thể phục hồi pass cũ sau khi load lại level.
- README nói xem Expected Output trong INFO; thực tế InfoTab chỉ render description/hints, danh sách TESTS chỉ hiển thị input. Expected vẫn có trong catalog và được dùng để chấm.
- UI hiển thị khóa theo tiến độ, nhưng helper admin luôn có trong runtime. Chưa kết luận đây là bug vì phụ thuộc ý định phát hành.
- Comment Vite nói local base `/`; biểu thức hiện chọn `/turinggame/` nếu không có biến VERCEL/CF_PAGES.

## 7) Evidence

- `README.md`, `vite.config.ts`, `package.json`
- `src/App.tsx`, `src/store/useGameStore.ts`, `src/engine/turingEngine.ts`
- `src/components/game/CardsTab.tsx`, `TestsTab.tsx`, `InfoTab.tsx`
- `src/components/ui/MainLayout.tsx`, `LevelMenu.tsx`, `src/levels/index.ts`, `results.json`
- `TESTING.md` ghi kết quả build/lint và probe ngày 2026-10-20; `git log --since='90 days ago' --format= --name-only` và scan cho số lần đổi file.
