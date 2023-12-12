import type { Player } from "~/models/chess/room/ChessRoom";
import { type Color } from "./Color";
import type Move from "./Move";
export enum GameOverType {
    CHECKMATE = 'Checkmate',
    STALEMATE = 'Stalemate',
    THREEFOLD = 'Threefold',
    INSUFFICIENT = 'Insufficient',
    AGREEMENT = 'Agreement',
}
export interface GameOverInfo {
    type: GameOverType,
    winnerUid?: string,
    winnerSide?: Color,
    moves: Move[],
    gameId: string,
}