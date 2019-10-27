import React from 'react';
import { useCollection } from '../customHooks/useCollection';
import { useDocs } from '../customHooks/useDocs';

const Messages = ({channelId}) => {
    const messages = useCollection(`channels/${channelId}/messages`, 'created');
    return (
        <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            {messages.map((message, index) => {
                const showDay = false;
                const previousMessage = index ? messages[index-1] : null;
                const showAvatar = !previousMessage || message.user.id !== previousMessage.user.id;
                return (
                    <div key={message.id}>
                        {showAvatar
                        ?<FirstUserMessage message={message} showDay={showDay}/>
                        :<div key={message.id} className="Message no-avatar">
                            <div className="MessageContent">{message.text}</div>
                        </div>}
                    </div>
                );
            })}
        </div>
    );
};

const FirstUserMessage = ({ message, showDay }) => {
    const author = useDocs(message.user.path)
    return (
        <div>
            {showDay
            ? <div className="Day">
                <div className="DayLine" />
                <div className="DayText">12/6/2018</div>
                <div className="DayLine" />
            </div>
            : null}
            <div className="Message with-avatar">
                <div
                    className="Avatar"
                    style={{
                        backgroundImage: author
                            ? `url("${author.photoUrl}")`
                            : ""
                    }}
                />
                <div className="Author">
                    <div>
                        <span className="UserName">{author && author.displayName}</span>
                        {" "}
                        <span className="TimeStamp">{message.created.toString()}</span>
                    </div>
                    <div className="MessageContent">{message.text}</div>
                </div>
            </div>
        </div>
    );
};

export default Messages;