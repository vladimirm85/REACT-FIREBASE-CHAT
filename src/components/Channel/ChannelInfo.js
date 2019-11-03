import React from 'react';
import { useDocs } from '../../customHooks/useDocs';

const ChannelInfo = ({channelId}) => {
    const channel = useDocs(`channels/${channelId}`);
    return (
        <div className="ChannelInfo">
            <div className="Topic">
                Topic: <input className="TopicInput" defaultValue={channel && channel.topic}/>
            </div>
            <div className="ChannelName">#{channelId}</div>
        </div>
    );
};

export default ChannelInfo;