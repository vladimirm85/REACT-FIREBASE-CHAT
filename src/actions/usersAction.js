import { dataBase } from '../firebase';

export const GET_USERS = 'GET_USERS';
const getUsers = users => {
    return {
        type: GET_USERS,
        payload: {
            users
        }
    };
};

export const handleGetUsers = () => {
    return dispatch => {
        return dataBase
                .collection('users')
                .onSnapshot(snapshot => {
                    const users = [];
                    snapshot.forEach(user => {
                        users.push({
                            ...user.data(),
                            id: user.id
                        });
                    });
                    dispatch(getUsers(users));
                }, error => console.log(error));
    };
};