import User from "~/models/auth/User";
import { onIdTokenChanged } from "firebase/auth";
import { findUserInDatabase } from "~/services/auth/helpers/user";
import { auth } from "~/api/config";
export default defineNuxtRouteMiddleware(() => {
    const { user } = storeToRefs(useAuth());
    if (!process.client || user.value) return;
    onIdTokenChanged(auth, async firebaseAuthState => {
        if (firebaseAuthState === null) { 
            user.value = null;       
            return;
        }
        const found = (await findUserInDatabase(firebaseAuthState.uid)) as User | undefined; 
        const withoutStats = { ...firebaseAuthState, stats: null };
        user.value = found || withoutStats;
        return;
    });
})
