import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Members from './ChannelMembers';
import ChannelInfo from './ChannelInfo';
import Messages from './ChannelMessages';
import ChatInputBox from './ChannelChatInputBox';
import { handleGetUsers, handleGetChannelMessages } from '../../actions'


const Channel = ({ user, match }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleGetUsers());
        dispatch(handleGetChannelMessages(match.params.id));

    }, [dispatch, match.params.id]);

    return (
        <div className="Channel">
            <div className="ChannelMain">
                <ChannelInfo channelId={match.params.id} />
                <Messages channelId={match.params.id} />
                <ChatInputBox user={user} channelId={match.params.id} />
            </div>
            <Members />
        </div>
    );
};

export default Channel;