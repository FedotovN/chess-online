import { waitForAuthToResolve, initUserWithFirebaseData } from "~/services/auth/helpers/authTokenChange";
import { findUserInDatabase } from "~/services/auth/helpers/user";
import { defineStore } from "pinia"
import AuthService from "@/services/auth/index";
import User from "~/models/auth/User"
export const useAuth = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        loading: true,
    }),
    getters: {
        getUser: s => s.user,
    },
    actions: {
        async signup(name: string, email: string, password: string) {
            await AuthService.signup(name, email, password);
        },
        async login(email: string, password: string) {
            this.user = await AuthService.login(email, password);
        },
        async signInWithGoogle() {
            const { user: { uid } } = await AuthService.loginWithGoogle();
            this.user = (await findUserInDatabase(uid)) as User;
        },
        async logout() {
            await AuthService.logout();
            this.user = null;
        }
    }
});