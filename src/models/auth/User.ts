import { type UserInfo } from "firebase/auth";
import type UserStats from "./UserStats";
export default class User implements Partial<UserInfo> {
    constructor(
        public displayName: string | null, public email: string | null,
        public photoURL: string | null, public stats: UserStats | null,
        public uid: string, public games: string[]
    ) {}
}