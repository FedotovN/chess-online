import AuthService from "@/services/auth";
import UserService from "@/services/users";
import User from "~/models/auth/User";
async function getCurrUserData() {
    try {
        const firebaseState = await AuthService.waitForAuthToResolve();
        return firebaseState 
        ? await UserService.getUserInfo(firebaseState.uid) || null
        : null
    } catch (e) {
        console.error(e);
    }
}
export const useAuth = defineStore('auth', {
    state: () => ({
        user: undefined as User | null | undefined,
    }),
    actions: {
        async signup(name: string, email: string, password: string) {
            const newUser = await AuthService.signup(name, email, password);
            return UserService.setUserToDatabase(newUser);
        },
        async login(email: string, password: string) {
            try {
                const { uid } = await AuthService.login(email, password);
                const info = await UserService.getUserInfo(uid);
                if (!info) throw new Error(`User logged into the account but has no info in database. Prevent login.\nuid: ${uid}`);
                this.user = info;
            } catch (e) {
                console.error(e);
                throw e;
            } 
        },
        async signInWithGoogle() {
            try {
                const firebaseUser = await AuthService.loginWithGoogle();
                const info = await UserService.getUserInfo(firebaseUser.uid);
                if (info) {
                    this.user = info;
                    return;
                }
                const user = AuthService.getDefaultUser(firebaseUser);
                this.user = await UserService.setUserToDatabase(user);
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async logout() {
            try {
                await AuthService.logout();
                this.user = null;
            } catch (e) {
                console.error(e);
            }
        },
        async onAuthResolve(callback: (user: User | null) => unknown | Promise<unknown>) {
            if (process.server) return;
            try {
                if (this.user !== undefined) return callback(this.user);
                this.user = await getCurrUserData();
                if (this.user === undefined) {
                    console.warn("No user info was found due to unexpected error yet run callback anyway with 'null' fallback value");
                }
                return callback(this.user || null); 
            } catch (e) {
                console.error(e);
            }
        },
    }
});