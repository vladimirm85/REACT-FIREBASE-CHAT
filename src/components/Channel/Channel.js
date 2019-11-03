import React from 'react';
import Members from './ChannelMembers';
import ChannelInfo from './ChannelInfo';
import Messages from './ChannelMessages';
import ChatInputBox from './ChannelChatInputBox';

const Channel = ({user, match}) => 
        <div className="Channel">
            <div className="ChannelMain">
                <ChannelInfo channelId={match.params.id} />
                <Messages channelId={match.params.id} />
                <ChatInputBox user={user} channelId={match.params.id} />
            </div>
            <Members />
        </div>
;

export default Channel;