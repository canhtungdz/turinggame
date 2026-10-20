import type { LevelInfo } from '../engine/types';

// Chỉ dịch nội dung đề bài và ví dụ; giữ nguyên ký hiệu trên băng.
export const VI_LEVEL_TEXT: Record<string, Pick<LevelInfo, 'description' | 'hints'>> = {
    lvl_01: {
        description: 'Tạo một máy nhận vào một dãy chữ số và tăng mỗi chữ số CHẴN lên 1.\n\n(GỢI Ý: Đừng quên rằng 0 cũng là số CHẴN.)',
        hints: [
            'Ví dụ, nếu đầu vào là:\n_____16334087_____\nThì đầu ra phải là:\n_____17335197_____',
        ],
    },
    lvl_02: {
        description: 'Tạo một máy nhận vào một số và cho ra số đó nhân với MƯỜI.\n\n(GỢI Ý: Có thể ghi đè lên các dấu gạch dưới.)',
        hints: ['__123__->__1230_'],
    },
    lvl_03: {
        description: 'Quét đầu vào và xóa mọi chữ số 1, chỉ giữ lại chữ số 1 đầu tiên.\n\n(GỢI Ý: Để xóa một ký tự, hãy ghi đè lên nó bằng dấu gạch dưới.)',
        hints: ['__01213__->__012_3__'],
    },
    lvl_04: {
        description: 'Tổng thống đã chán ngấy những trò đùa thiếu chín chắn trên Internet và quyết định cấm số 69.\nNhiệm vụ của bạn là tạo một máy quét đầu vào và thay mọi lần xuất hiện của số bị cấm bằng người hàng xóm “đúng mực” của nó: số 68.',
        hints: ['__24699__->__24689__\n__69669__->__68668__'],
    },
    lvl_05: {
        description: 'Xóa tất cả các chữ x không nằm bên trong dấu ngoặc đơn.',
        hints: ['__x(xx)xx__->__(xx)__\n_(x)x(x)_->_(x)_(x)_'],
    },
    lvl_06: {
        description: 'Ở màn này, bạn chỉ cần dùng các chữ số 0 và 1.\n\nĐếm số chữ số 1 trong đầu vào và xác định số lượng đó là CHẴN hay LẺ.\nNếu là LẺ, hãy thêm một chữ số 1 vào cuối đầu vào để tổng số chữ số 1 trở thành chẵn.\nKhông ghi đè lên các chữ số 0.',
        hints: ['__0100__->__01001_\n__0110__->__0110__'],
    },
    lvl_07: {
        description: 'Ghi 1 nếu số đầu vào chia hết cho 3; nếu không, ghi 0.\n\nNhớ xóa số ban đầu, chỉ để lại một chữ số 0 hoặc 1.\n\n(GỢI Ý: Một số chia hết cho 3 nếu tổng các chữ số của nó chia hết cho 3. Nếu bí, hãy tham khảo màn trước để tìm ý tưởng.)',
        hints: ['__123__->__1__\n__301__->__0__'],
    },
    lvl_08: {
        description: 'Quét đầu vào và xuất ra chữ số lớn nhất tìm được.\n\nĐể đơn giản hơn, đầu vào chỉ chứa các chữ số từ 1 đến 5.',
        hints: ['__114223__->__4__\n__355252__->__5__'],
    },
    lvl_09: {
        description: 'Xóa mọi chữ số 1, chỉ giữ lại chữ số 1 cuối cùng.\n\n(GỢI Ý: Tương tự màn 3, nhưng di chuyển theo chiều ngược lại.)',
        hints: [],
    },
    lvl_10: {
        description: 'Ghi 1 nếu số đầu vào chia hết cho 100; nếu không, ghi 0.\n\nNhớ xóa số ban đầu, chỉ để lại một chữ số 0 hoặc 1.',
        hints: ['__123__->__0__\n__4200__->__1__'],
    },
    lvl_11: {
        description: 'Tăng số đầu vào lên 1.',
        hints: ['__23__->__24__\n__39__->__40__'],
    },
    lvl_12: {
        description: 'Đầu vào là một số N có một chữ số, từ 0 đến 9.\n\nGhi chữ X vào đầu ra đúng N lần và xóa số ban đầu.',
        hints: ['__5__->__XXXXX__'],
    },
    lvl_13: {
        description: 'Đầu vào gồm hai chữ số. Hãy ghi ra độ chênh lệch giữa hai chữ số đó, không kèm dấu.\n\n(GỢI Ý: Có hai cách giải: tính trực tiếp độ chênh lệch, hoặc lần lượt giảm cả hai chữ số đi 1 cho đến khi một trong hai bằng 0. Bạn nên thử cách thứ hai.)',
        hints: ['__53__->__2__\n__18__->__7__'],
    },
    lvl_14: {
        description: 'Đầu vào gồm hai số được ngăn cách bằng một dấu gạch dưới. Đầu ra phải chứa tổng của hai số đó.',
        hints: ['__15_9__->__24__\n__41_182__->__223__'],
    },
    lvl_15: {
        description: 'Ghi ra số lần chữ X xuất hiện trên băng đầu vào, dưới dạng một số.\n\nNhớ xóa các chữ X trong lúc đếm: đầu ra cuối cùng chỉ được chứa số lượng đếm được.\n\n(GỢI Ý: Khi chạy thử, hãy tăng tốc độ bằng nút +.)',
        hints: ['__XXX__->__3__'],
    },
    lvl_16: {
        description: 'Bạn sẽ nhận được một số N ở đầu vào, nhưng lần này N lớn hơn 10.\n\nGhi chữ X vào đầu ra đúng N lần và xóa số ban đầu.',
        hints: [],
    },
    lvl_17: {
        description: 'Bạn vừa đột nhập vào tài khoản ngân hàng của mình! Hãy dùng máy Turing để nhân đôi số ký hiệu $ bạn có.',
        hints: ['__$$$__->__$$$$$$__'],
    },
    lvl_18: {
        description: 'Đầu vào là một dãy chữ số 1 và 0. Mỗi khi gặp một nhóm có từ hai chữ số 1 liền nhau trở lên, hãy chèn một chữ số 0 vào giữa từng cặp chữ số 1 liền nhau.\n\nLưu ý: Khi chèn 0, không được thay thế chữ số 1; hãy dịch nó và tất cả các chữ số phía sau sang phải.',
        hints: ['__110__->__1010__\n__111__->__10101__'],
    },
    lvl_19: {
        description: 'Ôi không! Một trận động đất đã làm xáo trộn bộ sưu tập nam châm tủ lạnh hình chữ số của bạn, khiến chúng rơi vương vãi trên sàn.\n\nBạn có thể sắp xếp chúng lại không? Các chữ số 1 nằm bên trái, tiếp đến là các chữ số 2 ở giữa, và cuối cùng là các chữ số 3 bên phải.\n\nĐừng thêm hoặc bớt nam châm nào nhé, tất cả đều được đánh số rồi đấy! (hehe)\n\n(GỢI Ý: Nếu bí, hãy tìm hiểu thuật toán “sắp xếp nổi bọt” — bubble sort.)',
        hints: ['__121313123__->__111122333__'],
    },
    lvl_20: {
        description: 'Đầu vào là một dãy dấu ( và ). Ghi ( nếu các dấu ngoặc được ghép cặp hợp lệ; nếu không, ghi ).\n\nĐể thuận tiện, ở màn này bạn có thể dùng thêm [ và ] làm ký hiệu phụ trợ.',
        hints: ['__())__->__)__\n__(())__->__(__\n__()()__->__(__\n__)()__->__)__'],
    },
    lvl_21: {
        description: 'Thuyền trưởng! Những kẻ mạo danh đã trà trộn lên tàu vũ trụ. Chúng ta phải tìm ra chúng trước khi chúng phá hoại và làm hại các thành viên phi hành đoàn.\n\nCác chữ số 0 và 1 đại diện cho thành viên phi hành đoàn, còn chữ số 2 đại diện cho kẻ mạo danh.\n\nLoại bỏ những kẻ mạo danh mà không thay đổi số lượng hay thứ tự các thành viên phi hành đoàn, đồng thời không để lại khoảng trống giữa họ.',
        hints: ['__01200__->__0100__\n(KHÔNG PHẢI __01_00__)'],
    },
    lvl_22: {
        description: 'Đầu vào gồm hai dãy chữ số 1 và 0, được ngăn cách bằng một dấu gạch dưới. Ghi 1 nếu hai dãy giống nhau; nếu không, ghi 0.',
        hints: ['__10_10__->__1__\n__10_01__->__0__\n__101_1__->__0__'],
    },
    lvl_23: {
        description: 'Bạn là thí sinh trong một chương trình trò chơi trên truyền hình. Người dẫn chương trình đưa ra hai hộp: hộp bên trái đựng táo, hộp bên phải đựng cam. Bạn có đoán được hộp nào có nhiều quả hơn không?\n\nGhi đè lên dấu gạch dưới giữa hai hộp bằng ký hiệu > nếu táo nhiều hơn, < nếu cam nhiều hơn, hoặc = nếu số lượng bằng nhau.',
        hints: [
            'Đầu vào có dạng:\n__[AA]_[OOO]__\nMỗi cặp ngoặc vuông biểu thị một hộp, mỗi chữ A là một quả táo và mỗi chữ O là một quả cam.',
            'Không ghi đè lên các chữ cái hoặc dấu ngoặc vuông. Đầu ra phải có dạng:\n__[AA]<[OOO]__',
        ],
    },
    lvl_24: {
        description: 'Đầu vào là một dãy chữ số. Hãy ghi ra dãy đó theo thứ tự đảo ngược.\n\nĐể đơn giản hơn, đầu vào chỉ chứa các chữ số từ 1 đến 5.',
        hints: ['__42__->__24__\n__311__->__113__'],
    },
    lvl_25: {
        description: 'Bạn vừa nhận được cuộc gọi từ văn phòng Tổng thống. Ông rất hài lòng với công việc bạn đã làm ở màn 4 và giao cho bạn một nhiệm vụ mới: viết phần mềm kiểm phiếu cho cuộc bầu cử sắp tới.\n\nĐầu vào là một dãy chữ số 0 và 1. Mỗi chữ số 0 là một phiếu bầu cho Tổng thống đương nhiệm, còn mỗi chữ số 1 là một phiếu bầu cho ứng viên còn lại.\nBạn phải đếm phiếu và xác định người chiến thắng: chỉ ghi một chữ số 1 hoặc 0 ở đầu ra, tùy bên nào có nhiều phiếu hơn. Nếu hòa, theo quy định Tổng thống đương nhiệm vẫn tái đắc cử, nên hãy ghi 0.',
        hints: ['__1100011101__->__1__'],
    },
};
