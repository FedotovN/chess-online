import { updateDoc, setDoc, getDoc, doc } from "firebase/firestore"
import { firestore } from "~/api/config"
import type User from "~/models/auth/User"

export type UserWithId = Partial<User> & { uid: string }
export const getUserDocRef = (uid: string) => doc(firestore, `/users/${uid}`);
export const findUserInDatabase = async (uid: string) => (await getDoc(getUserDocRef(uid))).data();
export async function createUserInDatabase(user: UserWithId, override = false) {
    const existing = await findUserInDatabase(user.uid);
    if (existing && override || !existing) {
        const ref = getUserDocRef(user.uid);
        console.log(user);
        return setDoc(ref, {...user});
    }
}
export async function updateUserInDatabase(user: UserWithId, writeUnexisting = false) {
    const existing = await findUserInDatabase(user.uid);
    const ref = getUserDocRef(user.uid);
    if (!existing && writeUnexisting) return setDoc(ref, {...user});
    if (!existing) return;
    return updateDoc(ref, {...user});
}