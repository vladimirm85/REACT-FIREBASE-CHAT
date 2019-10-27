import React from 'react';
import { useDocs } from '../customHooks/useDocs';

const ChannelInfo = ({channelId}) => {
    const channel = useDocs(`channels/${channelId}`);
    return (
        <div className="ChannelInfo">
            <div className="Topic">
                Topic: <input className="TopicInput" value={channel.topic}/>
            </div>
            <div className="ChannelName">#{channel.id}</div>
        </div>
    );
};

export default ChannelInfo;