import { defineStore } from "pinia"
import AuthService from "@/services/auth/index";
import User from "~/models/auth/User"
export const useAuth = defineStore('auth', {
    state: () => ({
        user: undefined as User | null | undefined,
    }),
    getters: {
        getUser: s => s.user,
        isAuthenticated: s => s.user !== null
    },
    actions: {
        async signup(name: string, email: string, password: string) {
            await AuthService.signup(name, email, password);
        },
        async login(email: string, password: string) {
            this.user = await AuthService.login(email, password);
        },
        async logout() {
            await AuthService.logout();
            this.user = null;
        }
    }
});