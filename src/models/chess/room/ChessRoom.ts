import type User from "~/models/auth/User";
import type { Color } from "~/types/chess/Color";
import type Board from "~/models/chess/Board";
export interface Player extends User {
    side: Color,
}
export default class ChessRoom {
    constructor(
        public players: [Player | null, Player | null],
        public id: string,
        public board: Board,
    ) {}
}