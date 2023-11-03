import type User from "~/models/auth/User";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "~/api/config"

export type UserWithId = Partial<User> & { uid: string }
export const getUserDocRef = (uid: string) => doc(firestore, `/users/${uid}`);
export async function findUserInDatabase(uid: string) {
        return (await getDoc(getUserDocRef(uid))).data() as unknown as User | undefined;
}
export async function createUserInDatabase(user: UserWithId) {
    const ref = getUserDocRef(user.uid);
    return setDoc(ref, {...user});
}
export async function updateUserInDatabase(user: UserWithId) {
    const ref = getUserDocRef(user.uid);
    return updateDoc(ref, {...user});
}