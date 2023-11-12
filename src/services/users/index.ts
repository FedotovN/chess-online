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
}
export default new UsersService();