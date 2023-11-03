import type User from "~/models/auth/User";
import { findUserInDatabase, updateUserInDatabase, createUserInDatabase, type UserWithId } from "./helpers";

class UsersService {
    async setUserToDatabase(user: UserWithId) {
        const existing = await findUserInDatabase(user.uid);
        await existing 
            ? updateUserInDatabase(user)
            : createUserInDatabase(user);
        return findUserInDatabase(user.uid) as unknown as User;
    }
    async getUserInfo(uid: string) {
        return findUserInDatabase(uid);
    }
}
export default new UsersService();
type getLeaderboardPage = (page: number) => User[];
type getLeaderboard = (perPage: number, length: number) => getLeaderboardPage;
type getUserFriends = (uid: string) => User[];
type getAllUsers = () => User[];
