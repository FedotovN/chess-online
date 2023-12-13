import type { Player } from "~/models/chess/room/ChessRoom";
import { type Color } from "./Color";
export enum GameOverType {
    CHECKMATE = 'Checkmate',
    STALEMATE = 'Stalemate',
    THREEFOLD = 'Threefold',
    INSUFFICIENT = 'Insufficient',
    AGREEMENT = 'Agreement',
}
type WinnerInfo = Partial<Player> | { displayName: string, side: Color };
export interface GameOverInfo {
    type: GameOverType,
    winner?: WinnerInfo,
}