import { onIdTokenChanged, type NextOrObserver, type Unsubscribe, type User as FirebaseUser } from "firebase/auth";
import { findUserInDatabase } from "./user";
import { auth } from "~/api/config";
import User from "~/models/auth/User";
export async function waitForAuthToResolve(): Promise<User | null> {
    let result: User | null = null;
    let unsub: Unsubscribe;
    result = await new Promise(res => {
        unsub = addAuthChangeListener(async user => {
            const found = await initUserWithFirebaseData(user);
            res(found);
        });
    });
    unsub!();
    return result
}
export const addAuthChangeListener = (callback: NextOrObserver<FirebaseUser>): Unsubscribe => {
    return onIdTokenChanged(auth, callback);
}
export const initUserWithFirebaseData = async (user: FirebaseUser | null): Promise<User | null> => {
    if (!user) return null;
    const found = (await findUserInDatabase(user.uid)) as User | undefined; 
    const withoutStats = { ...user, stats: null };
    return found || withoutStats;
}