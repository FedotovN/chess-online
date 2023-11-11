import { defineStore } from "pinia"
import AuthService from "@/services/auth";
import UserService from "@/services/users"
import User from "~/models/auth/User"
import { warn } from "vue";
export const useAuth = defineStore('auth', {
    state: () => ({
        user: null as User | null,
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
            this.user = (await AuthService.loginWithGoogle())!;
        },
        async logout() {
            await AuthService.logout();
            this.user = null;
        },
        async waitForAuth() {
            if (this.user !== null || process.server) return;
            const user = await AuthService.waitForAuthToResolve();
            if (user === null) return this.user = null;
            const found = await UserService.getUserInfo(user.uid);
            if (!found) {
                console.error("User is authenticated but has no info in DB");
                return;
            }
            this.user = found
        },
        async requireAuth() {
            if (process.server) return true;
            await this.waitForAuth();
            return this.user !== null;
        }
    }
});