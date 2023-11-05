import { addAuthChangeListener } from "~/api"
import UserService from "@/services/users/index";
import User from "~/models/auth/User";
import type UserStats from "~/models/auth/UserStats";
import { auth } from "~/api/config";
import { createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        GoogleAuthProvider, signInWithPopup, type User as FirebaseUser } from "firebase/auth";
import { extractUserInstance } from "../helpers";
const defaultStats: UserStats = { score: 0, gamesPlayed: 0, defeated: 0, won: 0, draw: 0 };
class AuthService {
    async waitForAuthToResolve(): Promise<User | null | undefined> {
        let unsub;
        const user = await new Promise((res: (user: FirebaseUser | null) => void) => {
            unsub = addAuthChangeListener(user => {
                res(user);
            });
        });
        unsub!();
        return user
            ? UserService.getUserInfo(user.uid) || null
            : null
    }
    async signup(name: string, userEmail: string, password: string) {
        const { user } = await createUserWithEmailAndPassword(auth, userEmail, password);
        await signInWithEmailAndPassword(auth, userEmail, password);
        const newUser = new User(name, userEmail, user.photoURL, defaultStats, user.uid)
        await UserService.setUserToDatabase(newUser);
        await this.logout();
    }
    async login (email: string, password: string) {
        const { user: { uid } } = (await signInWithEmailAndPassword(auth, email, password));
        const found = await UserService.getUserInfo(uid);
        if (!found) throw new TypeError(`User with uid ${uid} just logged in but has no info in database`);
        return found;
    }
    async logout() {
        await auth.signOut();
    }
    async loginWithGoogle(): Promise<User | undefined> {
        const provider = new GoogleAuthProvider();
        const credentials = await signInWithPopup(auth, provider);
        const { displayName, email, photoURL, uid } = extractUserInstance(credentials.user) as User;
        const existing = await UserService.getUserInfo(uid);
        const newUser = new User(displayName, email, photoURL, defaultStats, uid)
        return existing 
                ? existing
                : UserService.setUserToDatabase(newUser);
    }
    isLoggedIn() {
        return auth.currentUser !== null;
    }
}
export default new AuthService();