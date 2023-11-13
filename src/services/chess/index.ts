import type { Unsubscribe } from "firebase/auth";
import { getDocumentEntity, setDocumentEntity, updateDocumentEntity, subscribeToDocumentChanges } from "~/api";
import type User from "~/models/auth/User";
import Board from "~/models/chess/Board";
import ChessRoom, { type Player } from "~/models/chess/room/ChessRoom";
import { generateHashCode } from "~/utils";
class ChessService {
    async createChessRoom() {
        const id = generateHashCode(Math.random().toString()).toString();
        const board = new Board()
        const room = new ChessRoom([null, null], id, { ...board } as Board);
        await setDocumentEntity(`games/${id}`, room);
        return room;
    };
    async getChessRoom(id: string) {
        const room = await getDocumentEntity<ChessRoom>(`games/${id}`);
        if (!room) throw new Error(`Error while getting target chess room\n${id}\nDoes the room exist?`,);
        return room;
    }
    async updateChessRoom(id: string, room: ChessRoom) {
        return updateDocumentEntity(`games/${id}`, room);
    } 
    listenToChessRoom(id: string, callback: (room: ChessRoom) => void): Unsubscribe | undefined {
        return subscribeToDocumentChanges(`games/${id}`, callback);
    }
    async joinChessRoom(id: string, initiator: User) {
        const target = await this.getChessRoom(id);
        const { players } = target;
        if (players.find(player => player?.uid === initiator.uid)) return target;
        const emptyPos = players.indexOf(null);
        if(emptyPos === -1) {
            throw new Error(`Room is full already but to you are trying to connect:\n${id}\n`);
        }
        const opponent = players.find(player => !!player);
        //TODO add side configuration 
        const side = opponent 
            ? opponent.side === 'white' ? 'black' : 'white'
            : 'white'
        const player: Player = { ...initiator, side };
        target.players[emptyPos] = player;
        await this.updateChessRoom(id, target);
        return target;
    }
    async kickFromChessRoom(id: string, uid: string) {
        const target = await this.getChessRoom(id);
        target.players = target.players.map(player => player?.uid === uid ? null : player) as [Player | null, Player | null];
        return updateDocumentEntity(`games/${id}`, target);
    }
}
export default new ChessService();