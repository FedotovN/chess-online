import { firestore, auth } from "~/api/config";
import { collection, getDocs, type DocumentData, getDoc, doc, query, QueryConstraint, onSnapshot, type WithFieldValue, setDoc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { onIdTokenChanged, type User as FirebaseUser, type NextOrObserver, type Unsubscribe} from "firebase/auth";

type CollectionPath = string; 
type DocumentPath = string; 
function isCollectionPath(path: string): path is CollectionPath {
    return path.split('/').length % 2 !== 0;
}
function isDocumentPath(path: string): path is DocumentPath {
    return path.split('/').length % 2 === 0;
}
export async function getAllCollectionEntities<T = DocumentData[]>(path: CollectionPath, ...constraints: QueryConstraint[]): Promise<T[] | void> {
    if (!isCollectionPath(path))
        throw new TypeError("Provided path is not a collection pointer");
    const ref = collection(firestore, path);
    const request = query(ref, ...constraints);
    const res: T[] = [];
    const { docs } = (await getDocs(request));
    docs.forEach(doc => {
        res.push(doc.data() as T);
    })
    return res;
}
export async function getDocumentEntity<T = DocumentData>(path: DocumentPath): Promise<T | undefined> {
    if (!isDocumentPath(path))
        throw new TypeError("Provided path is not a document pointer");
    const ref = doc(firestore, path);
    return (await getDoc(ref)).data() as T;
}
export async function setDocumentEntity<T extends WithFieldValue<object>>(path: DocumentPath, data: T) {
    if (!isDocumentPath(path))
        throw new TypeError("Provided path is not a document pointer");
    const ref = doc(firestore, path);
    return setDoc(ref, JSON.parse(JSON.stringify(data)));
}
export async function addDocumentEntity<T extends WithFieldValue<object>>(path: CollectionPath, data: T) {
    if (!isCollectionPath(path))
        throw new TypeError("Provided path is not a collection pointer");
    const ref = collection(firestore, path);
        const { id } = await addDoc(ref, JSON.parse(JSON.stringify(data)));
    return id;
}
export async function updateDocumentEntity<T extends WithFieldValue<object>>(path: DocumentPath, data: T) {
    if (!isDocumentPath(path))
        throw new TypeError("Provided path is not a document pointer");
    const ref = doc(firestore, path);
    return updateDoc(ref, JSON.parse(JSON.stringify(data)));
}
export async function deleteDocument(path: DocumentPath) {
    if (!isDocumentPath(path))
        throw new TypeError("Provided path is not a document pointer");
    const ref = doc(firestore, path);
    return deleteDoc(ref);
}
export function subscribeToDocumentChanges<T>(path: DocumentPath, callback: (entity: T) => void): Unsubscribe {
    if (!isDocumentPath(path))
        throw new TypeError("Provided path is not a document pointer");
    const ref = doc(firestore, path);
    return onSnapshot(ref, snapshot => {
        const retrieved = snapshot.data() as T | undefined;
        if (!retrieved) return;
        callback(retrieved);
    });
}
export function subscribeToCollectionChanges<T>(path: CollectionPath, callback: (collection: T[]) => void, ...constraints: QueryConstraint[]): Unsubscribe {
    if (!isCollectionPath) 
        throw new TypeError("Provided path is not a collection pointer");
    const ref = collection(firestore, path);
    const q = query(ref, ...constraints);
    return onSnapshot(q, snapshot => {
        const list = snapshot.docs.map(doc => doc.data()) as T[];
        callback(list);
    });
}
export function addAuthChangeListener(callback: NextOrObserver<FirebaseUser>): Unsubscribe {
    return onIdTokenChanged(auth, callback);
}