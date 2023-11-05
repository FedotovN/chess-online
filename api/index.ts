import { firestore } from "~/api/config";
import { collection, getDocs, type DocumentData, getDoc, doc, query, QueryConstraint } from "firebase/firestore";

type CollectionPath = string; 
type DocumentPath = string; 
function isCollectionPath(path: string): path is CollectionPath {
    return path.split('/').length % 2 !== 0;
}
function isDocumentPath(path: string): path is DocumentPath {
    return path.split('/').length % 2 === 0;
}
export async function getAllCollectionEntities<T = DocumentData[]>(path: string, ...constraints: QueryConstraint[]): Promise<T[] | void> {
    if (!isCollectionPath(path))
        throw new TypeError("Provided path is not a collection pointer");
    const ref = collection(firestore, path);
    const request = query(ref, ...constraints);
    const res: T[] = [];
    try {
        const { docs } = (await getDocs(request));
        docs.forEach(doc => {
            res.push(doc.data() as T);
        })
        return res;
    } catch (e) {
        console.error(e);
    }
}
export async function getDocumentEntity<T = DocumentData>(path: string): Promise<T | void> {
    if (!isDocumentPath(path))
        throw new TypeError("Provided path is not a documents pointer");
    const ref = doc(firestore, path);
    try {
        return (await getDoc(ref)).data() as T;
    } catch (e) {
        console.error(e);
    }
}