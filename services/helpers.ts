import { type UserWithId } from "./users/helpers"
export function extractUserInstance<T extends UserWithId>(object: T): UserWithId {
    return {
        displayName: object.displayName,
        photoURL: object.photoURL,
        uid: object.uid,
        stats: object.stats || null,
        email: object.email
    }
};