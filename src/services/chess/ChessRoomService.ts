import type { Unsubscribe } from "firebase/auth";
import { getDocumentEntity, setDocumentEntity, updateDocumentEntity, subscribeToDocumentChanges } from "~/api";
import type User from "~/models/auth/User";
import ChessRoom, { type Player } from "~/models/chess/room/ChessRoom";
import { generateHashCode } from "~/utils";
class ChessRoomService {
    async createChessRoom(initiator: User): Promise<ChessRoom | undefined> {
        try {
            //TODO add side configuration 
            const player: Player = { ...initiator, side: 'black'  };
            const id = generateHashCode(Math.random().toString()).toString();
            const room = new ChessRoom([player, null], id);
            await setDocumentEntity(`games/${id}`, room);
            return room;
        } catch (e) {
            console.error(e);
        }
    };
    async getChessRoom(id: string): Promise<ChessRoom | undefined> {
        try {
            return getDocumentEntity<ChessRoom>(`games/${id}`);
        } catch (e) {
            console.error(e);
        }
    }
    async updateChessRoom(id: string, room: ChessRoom) {
        try {
            return updateDocumentEntity(`games/${id}`, room);
        } catch (e) {
            console.error(e);
        }
    } 
    listenToChessRoom(id: string, callback: (room: ChessRoom) => void): Unsubscribe | undefined {
        try {
            return subscribeToDocumentChanges(`games/${id}`, callback);
        } catch(e) {
            console.error(e);
        }
    }
    async addUserToChessRoom(id: string, initiator: User) {
        const target = await this.getChessRoom(id);
        const roomListener = (callback: (room: ChessRoom) => void) => { 
            return this.listenToChessRoom(id, callback);
        };
        if (!target) {
            throw new Error(`Error while getting target chess room\n${id}\nDoes the room exist?`,);
        }
        const { players } = target;
        const emptyPos = players.indexOf(null);
        if(emptyPos === -1) {
            if (players.find(player => player?.uid === initiator.uid)) {
                return roomListener
            }
            throw new Error(`Room is full already but to you are trying to connect:\n${id}\n`);
        }
        const opponent = players.find(player => !!player);
        //TODO add side configuration 
        const player: Player = { ...initiator, side: 'white' };
        if (opponent) player.side = opponent.side === 'white' ? 'black' : 'white';
        target.players[emptyPos] = player;
        await this.updateChessRoom(id, target);
        return roomListener;
    };
    // removeChessRoom(id: string): Promise<void>;
}
export default new ChessRoomService();