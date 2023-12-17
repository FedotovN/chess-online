import ChessRoom, { GameStatus, type Player } from "~/models/chess/room/ChessRoom";
import ChessService from "@/services/chess";
import UserService from "@/services/users";
import ChatService from "~/services/chat";
import type { Unsubscribe } from "firebase/auth";
import type Board from "~/models/chess/Board";
import type { Color } from "~/types/chess/Color";
import { getGameOverInfo } from "~/services/chess/helpers";
export const useGame = defineStore('game', {
    state: () => ({
        currGame: null as ChessRoom | null,
        unsubs: {} as { [key: string]: Unsubscribe },
    }),
    getters: {
        getBoard(state): Board | null {
            if (!state.currGame) return null;
            return state.currGame.board as Board;
        },
        getMovingSide(state): Color | null {
            if (!state.currGame) return null;
            return state.currGame.movingSide;
        },
        getPlayers(state): [Player | null, Player | null] | null {
            if (!state.currGame) return null;
            return state.currGame.players;
        },
        getOurSide(): Color | null | undefined {
            const { user } = useAuth();
            const p = this.getPlayers || [];
            if (!p.length || !user) return null;
            return p.find(p => p?.uid === user.uid)?.side;
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
                this.listen(room => { 
                    this.currGame = room
                });
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
        async setGameOver() {
            try {
                const { user } = useAuth();
                if (!this.currGame) throw new Error("Trying to end game but you are not in the game");
                if (!user) throw new Error("Trying to end game but you are not authenticated");
                const info = getGameOverInfo(this.currGame.board as Board, this.currGame.id, this.currGame.players as [Player, Player]);
                if (info) {
                    const winOrDrawOrLose = info.winner ? info.winner.uid === user.uid ? 1 : -1 : 0;
                    await ChessService.setGameOver(this.currGame.id, info);
                    await UserService.addGame(user.uid, this.currGame.id, winOrDrawOrLose);
                } else {
                    throw new Error("Trying to end game but can't find game over info");
                }
            } catch(e) {
                console.error(e);
            }
        },
        async move(board: Board) {
            try {
                const { user } = useAuth();
                if (!this.currGame) throw new Error("Trying lo update game but you are not in the game");
                if (!user) throw new Error("Trying lo update game but you are not authenticated");
                const gameStatusAfterMove = this.currGame.status === GameStatus.NOT_STARTED ? GameStatus.PROCESS : this.currGame.status;
                const movingSideAfterMove = this.currGame.movingSide === 'white' ? 'black' : 'white';
                await ChessService.updateChessRoom(this.currGame.id, { board, status: gameStatusAfterMove, movingSide: movingSideAfterMove } as ChessRoom);
            } catch(e) {
                console.error(e);
            }
        },
    }
})
