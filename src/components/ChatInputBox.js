import React from 'react';
import { dataBase } from '../firebase'

const ChatInputBox = ({ user, channelId }) => {
    return (
        <form
            className="ChatInputBox"
            onSubmit={event => {
                event.preventDefault();
                const messageText = event.target.messageText.value;
                dataBase
                    .collection(`channels/${channelId}/messages`)
                    .add({
                        user: dataBase.collection('users').doc(user.id),
                        text: messageText,
                        created: new Date()
                });
                event.target.reset();
                

            }}

        >
            <input id={'messageText'} className="ChatInput" placeholder={`Message #${channelId}`} />
        </form>
    );
};

export default ChatInputBox;