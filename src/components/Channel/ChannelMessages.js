import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import formatDate from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import ChatScroller from './ChannelChatScroller';
import { useDocs } from '../../customHooks/useDocs';

const mess = ({messages}) => {
    
    return (
        !isLoaded(messages)
        ? <div>Load</div>
        : <ChatScroller className="Messages">
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
        </ChatScroller>
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


export default compose(
    firestoreConnect(props => [{
        collection: `channels/${props.channelId}/messages`,
        orderBy: 'created',
        storeAs: 'messages'
    }]),
    connect((state, props) => ({
        messages: state.firestore.ordered['messages']
    }))
)(mess);