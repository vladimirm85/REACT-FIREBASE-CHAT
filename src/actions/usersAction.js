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
    return (dispatch, getState, { getFirestore }) => {
        return getFirestore()
                .get('users')
                .then(response => {
                    const users = [];
                    response.forEach(user => {
                        users.push({
                            ...user.data(),
                            id: user.id
                        });
                    });
                    dispatch(getUsers(users));
                })
                .catch(error => console.log(error));
    };
};