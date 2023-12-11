import ChessRoom, { type Player } from "~/models/chess/room/ChessRoom";
import ChessService from "@/services/chess";
import ChatService from "~/services/chat";
import type { Unsubscribe } from "firebase/auth";
import type Board from "~/models/chess/Board";
import type { Color } from "~/types/chess/Color";
export const useGame = defineStore('game', {
    state: () => ({
        currGame: null as ChessRoom | null,
        unsubs: {} as { [key: string]: Unsubscribe },
    }),
    getters: {
        getOpponent(state): Player | null {
            if (!state.currGame) return null;
            const { user } = useAuth();
            const { players } = state.currGame;
            if (!user || !players.length || players.length < 2) return null;
            return players.find(p => p?.uid !== user.uid) || null;
        },
        getBoard(state): Board | null {
            if (!state.currGame) return null;
            return state.currGame.board as Board;
        },
        getPlayerSide(state): Color | null {
            if (!state.currGame) return null;
            const { user } = useAuth();
            const { players } = state.currGame;
            if (!user || !players.length || players.length < 2) return null;
            return players.find(p => p?.uid === user.uid)?.side || null;
        },
        getCurrentSide(state): Color | null {
            if (!state.currGame) return null;
            return state.currGame.board.side;
        }
    },
    actions: {
        async create() {
            try {
                const { user } = useAuth();
                if (!user) throw new Error("Not authenticated yet trying to create chess room");
                const room = await ChessService.createChessRoom();
                await ChatService.create(room.id);
                return room;
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
                if (!user) throw new Error("Trying lo update game but you are not authenticated");
                await ChessService.updateChessRoom(this.currGame.id, room);
            } catch(e) {
                console.error(e);
            }
        },
        async updateBoard(board: Board) {
            try {
                const { user } = useAuth();
                if (!this.currGame) throw new Error("Trying lo update board but you are not in the game");
                if (!user) throw new Error("Trying lo update board but you are not authenticated");
                await ChessService.updateChessRoom(this.currGame.id, { board } as ChessRoom);
            } catch(e) {
                console.error(e);
                throw e
            }
        }
    }
})
