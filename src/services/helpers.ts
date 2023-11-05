import type User from "~/models/auth/User"
export function extractUserInstance<T extends Partial<User>>(payload: T): Partial<User> {
    return {
        displayName: payload.displayName,
        photoURL: payload.photoURL,
        uid: payload.uid,
        stats: payload.stats || null,
        email: payload.email
    }
};