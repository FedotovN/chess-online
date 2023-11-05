import type User from "~/models/auth/User";
import { getDocumentEntity, getAllCollectionEntities, updateDocumentEntity, setDocumentEntity } from "@/api";
import { orderBy, limit, QueryConstraint } from "firebase/firestore";
class UsersService {
    async setUserToDatabase(user: User) {
        try {
            const existing = await this.getUserInfo(user.uid);
            await existing 
                ? updateDocumentEntity(`users/${user.uid}`, user)
                : setDocumentEntity(`users/${user.uid}`, user)
                return this.getUserInfo(user.uid) as unknown as User;
        } catch (e) {
            console.error(e);
        }
    }
    async getUserInfo(uid: string) {
        try {
            return await getDocumentEntity<User>(`users/${uid}`) || null;
        } catch (e) {
            console.error(e);
        }
    }
    async getAllUsers(...constraints: QueryConstraint[]) {
        try {
            return await getAllCollectionEntities<User>('users', ...constraints);
        } catch (e) {
            console.error(e);
        }
    }
    async getLeaderboard(amount: number) {
        try {
            return await getAllCollectionEntities<User>('users', orderBy('stats.score', 'desc'), limit(amount));
        } catch (e) {
            console.error(e);
        }
    }
}
export default new UsersService();