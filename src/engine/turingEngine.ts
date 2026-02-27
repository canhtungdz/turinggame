import type { MachineCard } from './types';
import { HALT_STATE } from '../store/useGameStore';

export interface TapeState {
    tape: string[];
    headPosition: number;
    currentState: string;
    steps: number;
    status: 'running' | 'success' | 'failed' | 'timeout';
    error?: string;
}

const MAX_STEPS = 10000;

export const runTuringMachineStep = (
    state: TapeState,
    cards: MachineCard[]
): TapeState => {
    if (state.status !== 'running') return state;
    if (state.steps >= MAX_STEPS) {
        return { ...state, status: 'timeout', error: 'Exceeded maximum steps' };
    }

    const currentSymbol = state.tape[state.headPosition];
    const card = cards.find(c => c.id === state.currentState);

    if (!card) {
        return { ...state, status: 'failed', error: `State ${state.currentState} not found` };
    }

    const rule = card.rules.find(r => r.read === currentSymbol);

    if (!rule) {
        return { ...state, status: 'failed', error: `No rule for symbol '${currentSymbol}' in state ${state.currentState}` };
    }

    // 1. Write Symbol
    const newTape = [...state.tape];
    newTape[state.headPosition] = rule.write;

    // 2. Move Head
    let newHeadPos = state.headPosition;
    if (rule.move === 'L') newHeadPos--;
    else if (rule.move === 'R') newHeadPos++;

    // Mở rộng băng từ nếu đi quá biên
    if (newHeadPos < 0) {
        newTape.unshift(' ');
        newHeadPos = 0;
    } else if (newHeadPos >= newTape.length) {
        newTape.push(' ');
    }

    // 3. Next State
    const nextState = rule.next;
    const isSuccess = nextState === HALT_STATE;

    return {
        ...state,
        tape: newTape,
        headPosition: newHeadPos,
        currentState: nextState,
        steps: state.steps + 1,
        status: isSuccess ? 'success' : 'running'
    };
};
