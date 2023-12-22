import type User from "~/models/auth/User";
import { getDocumentEntity, getAllCollectionEntities, updateDocumentEntity, setDocumentEntity } from "@/api";
import { orderBy, limit, QueryConstraint } from "firebase/firestore";
class UsersService {
    async setUserToDatabase(user: User) {
        const existing = await this.getUserInfo(user.uid);
        await existing 
            ? updateDocumentEntity(`users/${user.uid}`, user)
            : setDocumentEntity(`users/${user.uid}`, user)
            return this.getUserInfo(user.uid)! as unknown as User;
    }
    async getUserInfo(uid: string) {
        return await getDocumentEntity<User>(`users/${uid}`);
    }
    async getAllUsers(...constraints: QueryConstraint[]) {
        return await getAllCollectionEntities<User>('users', ...constraints);
    }
    async getLeaderboard(amount: number) {
        return await getAllCollectionEntities<User>('users', orderBy('stats.score', 'desc'), limit(amount));
    }
    async getLastGame(uid: string) {
        const games = await this.getGames(uid);
        if (!games) return null
        return games[games.length - 1];
    }
    async getGames(uid: string) {
        return (await this.getUserInfo(uid))?.games;
    }
    async addGame(uid: string, gameId: string, stats: 1 | 0 | -1) {
        const info = await this.getUserInfo(uid);
        if (!info) throw new Error(`Trying to add new game to stats but cant find user with uid ${uid}`);
        if (info.games) {
            if (info.games.find(id => id === gameId)) return;    
        } else {
            info.games = []
        }
        info.games.push(gameId);
        if (!info.stats) 
            info.stats = { defeated: 0, gamesPlayed: 0, draw: 0, score: 0, won: 0 };
        info.stats.gamesPlayed += 1;
        const wasDefeated = stats === -1;
        const draw = stats === 0;
        const won = stats === 1;
        switch (stats) {
            case 1:
                info.stats.won += won ? 1 : 0;
                info.stats.score += 15
                break;
            case 0:
                info.stats.draw += draw ? 1 : 0;
                break;
            case -1:
                info.stats.defeated += wasDefeated ? 1 : 0;
                info.stats.score -= 10;
                info.stats.score = info.stats.score < 0 ? 0 : info.stats.score;
                break;
            default:
                break;
        }
        await this.setUserToDatabase(info);
    }
}
export default new UsersService();