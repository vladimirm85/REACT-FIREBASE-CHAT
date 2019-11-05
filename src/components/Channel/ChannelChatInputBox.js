import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dataBase } from '../../firebase'

const ChannelChatInputBox = ({ authUser, channelId }) => 
    <form
        className="ChatInputBox"
        onSubmit={event => {
            event.preventDefault();
            const messageText = event.target.messageText.value;
            dataBase
                .collection(`channels/${channelId}/messages`)
                .add({
                    user: dataBase.collection('users').doc(authUser.id),
                    text: messageText,
                    created: new Date() });
            event.target.reset();
        }}>
        <input
            id={'messageText'}
            className="ChatInput"
            placeholder={`Message #${channelId}`} />
    </form>;

ChannelChatInputBox.propTypes = {
    authUser: PropTypes.object.isRequired,
    channelId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    authUser: state.authUser.data
});

export default connect(mapStateToProps)(ChannelChatInputBox);