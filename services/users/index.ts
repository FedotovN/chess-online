import type User from "~/models/auth/User";
import { updateUserInDatabase, createUserInDatabase, type UserWithId } from "./helpers";
import { getDocumentEntity, getAllCollectionEntities } from "@/api";
import { orderBy, limit, QueryConstraint } from "firebase/firestore";
class UsersService {
    async setUserToDatabase(user: UserWithId) {
        const existing = await this.getUserInfo(user.uid);
        await existing 
            ? updateUserInDatabase(user)
            : createUserInDatabase(user);
        return this.getUserInfo(user.uid) as unknown as User;
    }
    async getUserInfo(uid: string) {
        return await getDocumentEntity<User>(`users/${uid}`) || null;
    }
    async getAllUsers(...constraints: QueryConstraint[]) {
        return await getAllCollectionEntities<User>('users', ...constraints);
    }
    async getLeaderboard(amount: number) {
        return await getAllCollectionEntities<User>('users', orderBy('stats.score', 'desc'), limit(amount));
    }

}
export default new UsersService();