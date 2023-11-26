import { type Color } from "./Color";
export enum GameOverType {
    LOSE = 'Lose',
    STALEMATE = 'Stalemate',
    THREEFOLD = 'Threefold',
    INSUFFICIENT = 'Insufficient',
    AGREEMENT = 'Agreement',
}
export interface GameOverInfo {
    type: GameOverType,
    losed?: Color,
    time: string,
    movesAmount: number,
}