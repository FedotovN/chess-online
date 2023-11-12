import type { Unsubscribe } from "firebase/auth";
import { getDocumentEntity, setDocumentEntity, updateDocumentEntity, subscribeToDocumentChanges } from "~/api";
import type User from "~/models/auth/User";
import ChessRoom, { type Player } from "~/models/chess/room/ChessRoom";
import type { Side } from "~/types/chess/Side";
import { generateHashCode } from "~/utils";
class ChessRoomService {
    async createChessRoom(initiator: User, side: Side) {
        const player: Player = { ...initiator, side };
        const id = generateHashCode(Math.random().toString()).toString();
        const room = new ChessRoom([player, null], id);
        await setDocumentEntity(`games/${id}`, room);
        return room;
    };
    async getChessRoom(id: string): Promise<ChessRoom | undefined> {
        return getDocumentEntity<ChessRoom>(`games/${id}`);
    }
    async updateChessRoom(id: string, room: ChessRoom) {
        return updateDocumentEntity(`games/${id}`, room);
    } 
    listenToChessRoom(id: string, callback: (room: ChessRoom) => void): Unsubscribe | undefined {
        return subscribeToDocumentChanges(`games/${id}`, callback);
    }
    async joinChessRoom(id: string, initiator: User) {
        const target = await this.getChessRoom(id);
        if (!target) throw new Error(`Error while getting target chess room\n${id}\nDoes the room exist?`,);
        const { players } = target;
        const emptyPos = players.indexOf(null);
        if(emptyPos === -1) {
            if (players.find(player => player?.uid === initiator.uid)) return;
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
    }
}
export default new ChessRoomService();