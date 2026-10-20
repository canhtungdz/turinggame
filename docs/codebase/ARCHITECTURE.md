# Architecture

## 1) Architectural Style

- SPA chạy trên browser: React view, Zustand store toàn ứng dụng, engine chuyển trạng thái và dữ liệu level tĩnh. Không tìm thấy routing library hoặc request API trong source.
- UI được giới hạn `max-w-md`, nền terminal xanh/đen, ba tab INFO/CARDS/TESTS. Chỉ component của tab hiện tại được mount; trạng thái chi tiết card/tape/tốc độ của tab mất khi unmount.
- Mỗi máy bắt đầu ở state `01`, dừng khi NEXT là `00`. Blank nội bộ là dấu cách `' '`; UI vẽ blank thành `_`. Một số level còn có ký tự `_` thật, khác blank.
- Giới hạn 10.000 bước mỗi lần mô phỏng; kết quả so bằng `tape.join('').trim()` với `expected.trim()`. Khoảng trắng bên trong vẫn có ý nghĩa.

## 2) System Flow

```text
index.html → main.tsx → App → loadLevelById → LEVELS + savedSolutions
                                      ↓
CardsTab → store actions → cards + savedSolutions → persist localStorage
                                      ↓
TestsTab → runTuringMachineStep → TapeState → so expected → updateTestStatus
                                      ↓
SUBMIT → completeCurrentLevel → completedLevels → LevelMenu mở màn tiếp
```

1. Store khởi tạo qua Zustand persist với key `turing-game-storage`; `App` nạp `lvl_01` khi chưa có current level.
2. Load level tìm dữ liệu trong `LEVELS`, kiểm tra tập ký tự đọc của saved cards khớp allowedSymbols; nếu không hợp lệ thì tạo card `01` mặc định. Rule mặc định giữ ký tự, đi phải, gặp blank thì chuyển `00`.
3. Người chơi click xoay vòng OUT, DIR, NEXT trong `CardsTab`; store cập nhật cards/lời giải và reset trạng thái test hiện tại.
4. `TestsTab` khởi tạo tape bằng `input.split('')`, head 0, state `01`; STEP gọi engine một lần, RUN dùng `setTimeout` với delay `600 / speed` ms.
5. Engine tìm card và rule, copy tape, ghi ký tự, đi L/R/N, mở rộng bằng blank khi vượt biên, rồi đổi state. Status `success` của engine chỉ có nghĩa đã đến HALT; `TestsTab` mới kiểm tra output đúng hay sai.
6. Test statuses được lưu vào store; SUBMIT chỉ enable ở UI khi tất cả test success, gọi completion rồi mở menu. Menu mở level đầu, level ngay sau level đã hoàn thành, hoặc toàn bộ khi admin.

## 3) Layer/Module Responsibilities

| Layer or module | Owns | Không xử lý trong code hiện tại | Evidence |
|---|---|---|---|
| App/layout/menu | Boot, tabs, menu và unlock UI | Thực thi rule | `src/App.tsx`, `src/components/ui/` |
| CardsTab | Chọn card, thêm/xóa, cycle các ô rule | Chấm output | `src/components/game/CardsTab.tsx` |
| TestsTab | TapeState, timer, render tape, chấm và submit | Lưu tape đang chạy qua reload | `src/components/game/TestsTab.tsx` |
| Zustand store | Data level hiện tại, lời giải, statuses, completion | Timer/animation | `src/store/useGameStore.ts` |
| Engine | Chuyển một bước không mutate tape đầu vào | Chấm expected, persistence | `src/engine/turingEngine.ts` |
| Level catalog | Mô tả, hints, alphabet và test cases | Logic engine | `src/levels/index.ts` |

## 4) Reused Patterns

| Pattern | Where found | Vai trò quan sát được |
|---|---|---|
| Global store + actions | `useGameStore.ts` | Chia sẻ trạng thái giữa các tab |
| Persist với partialize | `useGameStore.ts` | Chỉ lưu completedLevels, savedSolutions, savedTestStatuses, isAdmin |
| Hàm chuyển trạng thái | `turingEngine.ts` | Nhận state/cards, trả state tiếp theo |
| UI theo dữ liệu | `CardsTab.tsx`, `useGameStore.ts` | Sinh rules từ allowedSymbols thay vì hardcode từng alphabet |
| Local component state | `MainLayout.tsx`, `CardsTab.tsx`, `TestsTab.tsx` | Tabs, selection và mô phỏng tạm thời |

## 5) Known Architectural Risks

- Engine import `HALT_STATE` từ store: dependency miền tính toán kéo về Zustand và catalog level; hằng số chung chưa tách riêng.
- Tape rỗng không được chuẩn hóa thành ít nhất một blank; hai test rỗng trong level 15/17 không chạy được với alphabet hợp lệ hiện tại.
- `addCard`/`removeCard` reset `tests` nhưng không reset `savedTestStatuses`; load lại level có thể phục hồi kết quả cũ cho chương trình vừa sửa.
- Đổi level qua menu không remount `TestsTab` theo level ID và không reset local tape/index. Nếu đang xem test có index lớn hơn số test ở màn mới, code truy cập `test.input` có thể gặp undefined; chưa kiểm chứng bằng browser trong lần đọc này.
- Lock/completion/admin chỉ ở client; `completeCurrentLevel` không kiểm tra test statuses trong action. Xem `CONCERNS.md`.

## 6) Evidence

- `src/main.tsx`, `src/App.tsx`, `src/components/ui/MainLayout.tsx`
- `src/components/game/CardsTab.tsx`, `src/components/game/TestsTab.tsx`
- `src/store/useGameStore.ts`, `src/engine/turingEngine.ts`, `src/engine/types.ts`
- `src/levels/index.ts`, `src/components/ui/LevelMenu.tsx`
