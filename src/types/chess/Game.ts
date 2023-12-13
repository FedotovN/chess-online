import type { Player } from "~/models/chess/room/ChessRoom";
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
    winner?: Player,
    players: [Player, Player],
}