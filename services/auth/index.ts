import { updateProfile, createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "~/api/config";
import { createUserInDatabase, updateUserInDatabase, type UserWithId } from "./helpers/userUpdate";
import User from "~/models/auth/User";
class AuthService {
    async signup(name: string, userEmail: string, password: string) {
        const { user } = await createUserWithEmailAndPassword(auth, userEmail, password);
        await this.login(user.email!, password);
        await this.update({ uid: user.uid, displayName: name });
        await createUserInDatabase(new User(name, userEmail, user.photoURL, null, user.uid));
        await this.logout();
    }
    async login (email: string, password: string) {
        await signInWithEmailAndPassword(auth, email, password);
    }
    async logout() {
        await auth.signOut()
    }
    async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        const { user: { displayName, email, uid, photoURL } } = await signInWithPopup(auth, provider);
        await createUserInDatabase(new User(displayName, email, photoURL, null, uid));
    }
    async update(data: UserWithId) {
        if (!auth.currentUser) return;
        if (data.displayName || data.photoURL)
            await updateProfile(auth.currentUser, data);
        await updateUserInDatabase(data);
    }
    isLoggedIn() {
        return auth.currentUser !== null;
    }
}
export default new AuthService();