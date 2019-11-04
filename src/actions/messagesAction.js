export const GET_CHANNEL_MESSAGES = 'GET_CHANNEL_MESSAGES';
const getChannelMessages = (channelName, messages) => {
    return {
        type: GET_CHANNEL_MESSAGES,
        payload: {
            channelName,
            messages
        }
    };
};

export const handleGetChannelMessages = channelName => {
    return (dispatch, getState, { getFirestore }) => {
        return getFirestore()
                .collection(`channels/${channelName}/messages`)
                .orderBy('created')
                .onSnapshot(snapshot => {
                    const messages = [];
                    snapshot.forEach(message => {
                        messages.push({
                            ...message.data(),
                            id: message.id
                        });
                    });
                    dispatch(getChannelMessages(channelName, messages));
                });
    };
};