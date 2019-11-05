import { dataBase } from '../firebase';

export const GET_CHANNELS = 'GET_CHANNELS';
const getChannels = channels => {
    return {
        type: GET_CHANNELS,
        payload: {
            channels
        }
    };
};

export const handleGetChannels = () => {
    return dispatch => {
        return dataBase
                .collection('channels')
                .onSnapshot(snapshot => {
                    const channels = [];
                    snapshot.forEach(channel => {
                        channels.push({
                            ...channel.data(),
                            id: channel.id
                        });
                    });
                    dispatch(getChannels(channels));
                }, error => console.log(error));
    };
};