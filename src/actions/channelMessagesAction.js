import { dataBase } from '../firebase';

export const GET_CHANNEL_MESSAGES = 'GET_CHANNEL_MESSAGES';
const getChannelMessages = (channelId, messages) => {
    return {
        type: GET_CHANNEL_MESSAGES,
        payload: {
            channelId,
            messages
        }
    };
};

export const handleGetChannelMessages = authUserChannels => {
    return dispatch => {
        authUserChannels.map(channelId => dataBase
                .collection(`channels/${channelId}/messages`)
                .orderBy('created')
                .onSnapshot(snapshot => {
                    const messages = [];
                    snapshot.forEach(message => {
                        messages.push({
                            ...message.data(),
                            id: message.id
                        });
                    });
                    dispatch(getChannelMessages(channelId, messages));
                }, error => console.log(error)));
    };
};