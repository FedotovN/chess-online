import { type Color } from "./Color";
export enum GameOverType {
    CHECKMATE = 'Checkmate',
    STALEMATE = 'Stalemate',
    THREEFOLD = 'Threefold',
    INSUFFICIENT = 'Insufficient',
    AGREEMENT = 'Agreement',
}
export interface GameOverInfo {
    type: GameOverType,
    winner?: Color,
    movesAmount: number,
}