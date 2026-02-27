import type { LevelInfo, TestCase } from '../engine/types';

export interface GameLevel {
    info: LevelInfo;
    tests: TestCase[];
}

export const LEVELS: GameLevel[] = [
    {
        info: {
            id: 'lvl_01',
            title: 'Well, that\'s ODD',
            description: 'Create a machine that, given in input a sequence of numbers, increments by 1 every EVEN digit.',
            hints: [
                "EXAMPLE: 16334087 -> 17335197",
                "(HINT: Remember that the number 0 is EVEN)"
            ],
            allowedSymbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ']
        },
        tests: [
            { input: '16334087', expected: '17335197', status: 'pending' },
            { input: '02468', expected: '13579', status: 'pending' },
            { input: '13579', expected: '13579', status: 'pending' }
        ]
    },
    {
        info: {
            id: 'lvl_02',
            title: '[Counting inTENsifies]',
            description: 'Create a machine that, given a number, outputs the same number multiplied by TEN.',
            hints: [
                "EXAMPLE: 123 -> 1230",
                "(HINT: Underscores can be overwritten)"
            ],
            allowedSymbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ']
        },
        tests: [
            { input: '123', expected: '1230', status: 'pending' },
            { input: '5', expected: '50', status: 'pending' },
            { input: '10', expected: '100', status: 'pending' }
        ]
    }
];
