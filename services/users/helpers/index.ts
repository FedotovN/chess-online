import type User from "~/models/auth/User";
import { doc, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "~/api/config"

export type UserWithId = Partial<User> & { uid: string }
function getUserDocRef(uid: string) {
    return doc(firestore, `/users/${uid}`);
}
export async function createUserInDatabase(user: UserWithId) {
    const ref = getUserDocRef(user.uid);
    return setDoc(ref, {...user});
}
export async function updateUserInDatabase(user: UserWithId) {
    const ref = getUserDocRef(user.uid);
    return updateDoc(ref, {...user});
}