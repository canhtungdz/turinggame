export type Direction = 'L' | 'R' | 'N'; // Left, Right, Neutral (None)
export type Symbol = '0' | '1' | ' ' | string; // Ký hiệu trên băng từ
export type StateId = string; // Tên trang thái, ví dụ: '00', '01', '02', 'q1'...

export interface MachineRule {
    read: Symbol;
    write: Symbol;
    move: Direction;
    next: StateId;
}

export interface MachineCard {
    id: StateId;
    rules: MachineRule[];
}

export interface TestCase {
    input: string;
    expected: string;
    status: 'pending' | 'success' | 'failed' | 'running';
}

export interface LevelInfo {
    id: string;
    title: string;
    description: string;
    hints: string[];
    allowedSymbols: Symbol[]; // Ví dụ: ['0', '1', ' ']
}
