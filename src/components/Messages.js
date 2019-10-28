import React, { useEffect, useRef } from 'react';
import formatDate from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay'
import { useCollection } from '../customHooks/useCollection';
import { useDocs } from '../customHooks/useDocs';

const Messages = ({channelId}) => {
    const messages = useCollection(`channels/${channelId}/messages`, 'created');
    const scrollerRef = useRef();
    useChatScrollManager(scrollerRef);
    return (
        <div ref={scrollerRef} className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            {messages.map((message, index) => {
                const previousMessage = index ? messages[index-1] : null;
                const showDay = shouldShowDay(previousMessage, message);
                const showAvatar = shouldShowAvatar(previousMessage, message);
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
                <div className="DayText">{formatDate(message.created.seconds * 1000, "dd/MM/yyyy")}</div>
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
                        <span className="TimeStamp">{formatDate(message.created.seconds * 1000, "H:mm")}</span>
                    </div>
                    <div className="MessageContent">{message.text}</div>
                </div>
            </div>
        </div>
    );
};

const shouldShowAvatar = (previousMessage, message) => {
    const isFirst = !previousMessage;
    if (isFirst) {
        return true;
    };

    const differentUser = message.user.id !== previousMessage.user.id;
    if (differentUser) {
        return true;
    };

    const hasBeenAwhile = message.created.seconds - previousMessage.created.seconds > 60;
    return hasBeenAwhile;
};

const shouldShowDay = (previousMessage, message) => {
    const isFirst = !previousMessage;
    if (isFirst) {
        return true;
    };

    const isNewDay = !isSameDay(
        message.created.seconds * 1000,
        previousMessage.created.seconds * 1000
    );

    return isNewDay;
};

const useChatScrollManager = ref => {
    useEffect(() => {
        const node = ref.current;
        node.scrollTop = node.scrollHeight;
    });
};

export default Messages;