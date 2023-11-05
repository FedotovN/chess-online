import type User from "~/models/auth/User";
import type { Side } from "~/types/chess/Side";
export interface Player extends User {
    side: Side,
}
export default class ChessRoom {
    constructor(
        public players: [Player | null, Player | null],
        public id: string,
    ) {}
}