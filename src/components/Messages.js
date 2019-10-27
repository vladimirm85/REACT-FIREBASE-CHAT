import React from 'react';
import { useCollection } from './useCollection.js';

const Messages = () => {
    const messages = useCollection('channels/general/messages', 'created');
    return (
        <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            {messages.map((message, index) => {
                const showDay = false;
                const previousMessage = index ? message[index-1] : null;
                const showAvatar = !previousMessage || 
                <div key={message.id}>
                    <div className="Day">
                        <div className="DayLine" />
                        <div className="DayText">12/6/2018</div>
                        <div className="DayLine" />
                    </div>
                    
                        
                        <div className="Message with-avatar">
                            <div className="Avatar" />
                            <div className="Author">
                                <div>
                                    <span className="UserName">Ryan Florence </span>
                                    <span className="TimeStamp">{message.created.toString()}</span>
                                </div>
                                <div className="MessageContent">{message.text}</div>
                            </div>
                        </div>
                        <div key={message.id} className="Message no-avatar">
                            <div className="MessageContent">{message.text}</div>
                        </div>
                    
                </div>
            })}
        </div>
    )
}
    ;

export default Messages;
