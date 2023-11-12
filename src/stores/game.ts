import ChessRoom from "~/models/chess/room/ChessRoom";
import ChessService from "@/services/chess";
import type { Unsubscribe } from "firebase/auth";
export const useGame = defineStore('game', {
    state: () => ({
        currGame: null as ChessRoom | null,
        unsubs: {} as { [key: string]: Unsubscribe },
    }),
    actions: {
        async create() {
            try {
                const { user } = useAuth();
                if (!user) throw new Error("Not authenticated yet trying to create chess room");
                return await ChessService.createChessRoom();
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        listen(callback: (room: ChessRoom) => void) {
            if (!this.currGame) throw new Error("Not in any game yet trying to listen for updates");
            const { id } = this.currGame;
            this.unsubs[id] = ChessService.listenToChessRoom(id, callback)!;
        },
        async join(id: string) {
            try {
                const { user } = useAuth();
                if (!user) throw new Error("Not authenticated yet trying to join chess room");
                this.currGame = await ChessService.joinChessRoom(id, user);
                this.listen(room => this.currGame = room);
            } catch (e) {
                console.error(e);
                throw e;
            } 
        },
        async leave() {
            try {
                const { user } = useAuth();
                if (!this.currGame) throw new Error("Trying lo quit game but you are not in the game");
                if (!user) throw new Error("Trying lo quit game but you are not authenticated");
                const { id } = this.currGame;
                await ChessService.kickFromChessRoom(id, user.uid);
                this.unsubs[id]();
                this.currGame = null;
            } catch(e) {
                console.error(e);
            }
        },
        async send(room: ChessRoom) {
            try {
                const { user } = useAuth();
                if (!this.currGame) throw new Error("Trying lo update game but you are not in the game");
                if (!user) throw new Error("Trying lo quit game but you are not authenticated");
                await ChessService.updateChessRoom(this.currGame.id, room);
            } catch(e) {
                console.error(e);
            }
        }
    }
})
