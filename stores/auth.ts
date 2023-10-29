import { defineStore, storeToRefs } from "pinia"
import { findUserInDatabase } from "@/services/auth/helpers/user";
import AuthService from "@/services/auth/index";
import User from "~/models/auth/User"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/api/config";
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
            await AuthService.login(email, password);
        },
        async logout() {
            await AuthService.logout();
        }
    }
});
onAuthStateChanged(auth, async user => {
    const { user: storedUser, loading } = storeToRefs(useAuth());
    if (user === null) { 
        storedUser.value = null; 
        return; 
    }
    const found = (await findUserInDatabase(user.uid)) as User | undefined; 
    const withoutStats = { ...user, stats: null };
    storedUser.value = found || withoutStats;
    loading.value = false;
});