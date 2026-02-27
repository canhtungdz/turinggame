import type { LevelInfo, TestCase } from '../engine/types';

export interface GameLevel {
    info: LevelInfo;
    tests: TestCase[];
}

export const LEVELS: GameLevel[] = [
    {
        info: {
            id: 'lvl_01',
            title: 'Xóa số 0 đầu tiên',
            description: 'Băng từ chứa một chuỗi các số nhị phân. Hãy lập trình cỗ máy Turing để xóa số 0 đầu tiên nó gặp phải và biến thành khoảng trắng. Sau đó dừng lại.',
            hints: [
                "IN  '111011'  ->  EXP  '111 11'",
                "IN  '011'  ->  EXP  ' 11'",
                "IN  '11110'  ->  EXP  '1111 '"
            ],
            allowedSymbols: ['0', '1', ' ']
        },
        tests: [
            { input: '1110111010101001010101010101010010001010101110101010101010101010100111010101', expected: '111 111010101001010101010101010010001010101110101010101010101010100111010101', status: 'pending' },
            { input: '011', expected: ' 11', status: 'pending' },
            { input: '11110', expected: '1111 ', status: 'pending' }
        ]
    },
    {
        info: {
            id: 'lvl_02',
            title: 'Đảo ngược Bit',
            description: 'Hãy lật ngược tất cả các bit nhị phân thành giá trị đối lập. Biến TẤT CẢ số 0 thành 1, và số 1 thành 0 cho đến khi bạn gặp ký tự khoảng trắng ở cuối chuỗi.',
            hints: [
                "IN  '1010'  ->  EXP  '0101'",
                "IN  '111'  ->  EXP  '000'",
                "IN  '00'  ->  EXP  '11'"
            ],
            allowedSymbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ']
        },
        tests: [
            { input: '1010', expected: '0101', status: 'pending' },
            { input: '111', expected: '000', status: 'pending' },
            { input: '00', expected: '11', status: 'pending' },
            { input: '01011', expected: '10100', status: 'pending' }
        ]
    }
];
