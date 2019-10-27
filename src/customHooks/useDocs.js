import { useState, useEffect } from 'react';
import { dataBase } from '../firebase';

const useDocs = (path) => {
    const [doc, setDoc] = useState([]);
    useEffect(() => {
        return dataBase.doc(path).onSnapshot(doc => {
            setDoc({
                ...doc.data(),
                id: doc.id
            });
        });
    }, []);

    return doc;
};

export { useDocs };