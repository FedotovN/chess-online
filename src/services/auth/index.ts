import type UserStats from "~/models/auth/UserStats";
import User from "~/models/auth/User";
import { auth } from "~/api/config";
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup, type User as FirebaseUser } from "firebase/auth";
import { addAuthChangeListener } from "~/api"
const defaultStats: UserStats = { score: 0, gamesPlayed: 0, defeated: 0, won: 0, draw: 0 };
class AuthService {
    async waitForAuthToResolve(): Promise<FirebaseUser | null> {
        let unsub;
        const user = await new Promise((res: (user: FirebaseUser | null) => void) => {
            unsub = addAuthChangeListener(user => {
                res(user);
            });
        });
        unsub!();
        return user
    }
    async signup(name: string, email: string, password: string) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = this.getDefaultUser({ ...user, displayName: name });
        return newUser
    }
    async login (email: string, password: string) {
        return (await signInWithEmailAndPassword(auth, email, password)).user;
    }
    async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        return (await signInWithPopup(auth, provider)).user;
    }
    getDefaultUser(firebaseInfo: FirebaseUser) {
        const { displayName, email, photoURL, uid } = firebaseInfo;
        return new User(displayName, email, photoURL, defaultStats, uid, []);
    }
    async logout() {
        await auth.signOut();
    }
}
export default new AuthService();