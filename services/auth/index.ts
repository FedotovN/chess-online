import { updateProfile, createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "~/api/config";
import UsersService from "@/services/users/index";
import User from "~/models/auth/User";
import { extractUserInstance } from "../helpers";
import { findUserInDatabase } from "../users/helpers";
class AuthService {
    async signup(name: string, userEmail: string, password: string) {
        const { user } = await createUserWithEmailAndPassword(auth, userEmail, password);
        await signInWithEmailAndPassword(auth, userEmail, password);
        const res = await UsersService.setUserToDatabase(new User(name, userEmail, user.photoURL, null, user.uid));
        console.log(res);
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
        const user = extractUserInstance(credentials.user);
        const existing = await findUserInDatabase(user.uid);
        console.log(credentials, user);
        return existing 
                ? existing
                : UsersService.setUserToDatabase(user);
    }
    isLoggedIn() {
        return auth.currentUser !== null;
    }
}
export default new AuthService();