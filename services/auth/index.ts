import { createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "~/api/config";
import UsersService from "@/services/users/index";
import User from "~/models/auth/User";
import { extractUserInstance } from "../helpers";
import { findUserInDatabase } from "../users/helpers";
import type UserStats from "~/models/auth/UserStats";
const defaultStats: UserStats = { score: 0, gamesPlayed: 0, defeated: 0, won: 0, draw: 0 };
class AuthService {
    async signup(name: string, userEmail: string, password: string) {
        const { user } = await createUserWithEmailAndPassword(auth, userEmail, password);
        await signInWithEmailAndPassword(auth, userEmail, password);
        const newUser = new User(name, userEmail, user.photoURL, defaultStats, user.uid)
        await UsersService.setUserToDatabase(newUser);
        await this.logout();
    }
    async login (email: string, password: string) {
        const { user: { uid } } = (await signInWithEmailAndPassword(auth, email, password));
        const found = await UsersService.getUserInfo(uid);
        if (!found) throw new TypeError(`User with uid ${uid} just logged in but has no info in database`);
        return found;
    }
    async logout() {
        await auth.signOut()
    }
    async loginWithGoogle(): Promise<User> {
        const provider = new GoogleAuthProvider();
        const credentials = await signInWithPopup(auth, provider);
        const { displayName, email, photoURL, uid } = extractUserInstance(credentials.user) as User;
        const existing = await findUserInDatabase(uid);
        const newUser = new User(displayName, email, photoURL, defaultStats, uid)
        return existing 
                ? existing
                : UsersService.setUserToDatabase(newUser);
    }
    isLoggedIn() {
        return auth.currentUser !== null;
    }
}
export default new AuthService();