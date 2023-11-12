import ChessRoom from "~/models/chess/room/ChessRoom";
import ChessService from "@/services/chess";
import type { Side } from "~/types/chess/Side";
import User from "~/models/auth/User";
import type { Unsubscribe } from "firebase/auth";
import type Figure from "~/models/chess/figures/Figure";
const { user } = storeToRefs(useAuth());
export default defineStore('game', {
    state: () => ({
        currGame: null as ChessRoom | null,
    }),
    actions: {
        async createGame(side: Side = 'white') {
            try {
                if (!user.value) throw new Error("Not authenticated yet trying to create chess room");
                return await ChessService.createChessRoom(user.value, side);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async joinGame(id: string) {
            try {
                if (!user.value) throw new Error("Not authenticated yet trying to join chess room");
                await ChessService.joinChessRoom(id, user.value);
            } catch (e) {
                console.error(e);
                throw e;
            } 
        },
        async leaveGame() {
            //TODO leave game
            this.currGame = null;
        }
    }
})
interface ChessMove {
    figure: Figure,
    player: User,
}
type onChessMove = (callback: (event: ChessMove) => void) => Unsubscribe
