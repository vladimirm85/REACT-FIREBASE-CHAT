import { useState, useEffect } from 'react';
import { dataBase } from '../firebase';

const useCollection = (path, order) => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        let collection = dataBase.collection(path);
        if(order) {
            collection = collection.orderBy(order);
        }
        return collection.onSnapshot(snapshot => {
            const docs = [];
            snapshot.forEach(doc => {
                docs.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            setDocs(docs);
        });
    }, []);

    return docs;
};

export { useCollection };