import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import formatDate from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import ChatScroller from './ChannelChatScroller';

const ChannelMessages = ({messages, users}) => {
    return (
        <ChatScroller className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            {!messages
            ? <h1>Loading...</h1>
            : messages.map((message, index) => {
                const previousMessage = index ? messages[index-1] : null;
                const showDay = shouldShowDay(previousMessage, message);
                const showAvatar = shouldShowAvatar(previousMessage, message);
                return (
                    <div key={message.id}>
                        {showAvatar
                        ?<FirstUserMessage
                            message={message}
                            showDay={showDay}
                            users={users}/>
                        :<div key={message.id} className="Message no-avatar">
                            <div className="MessageContent">{message.text}</div>
                        </div>}
                    </div>
                );
            })}
        </ChatScroller>
    );
};

const FirstUserMessage = ({ message, showDay, users }) => {
    const userId = message.user.path.slice(6);
    const author = users.find(user => user.id === userId);

    return (
        <div>
            {showDay
            ? <div className="Day">
                <div className="DayLine" />
                <div className="DayText">
                    {formatDate(message.created.seconds * 1000, "dd/MM/yyyy")}
                </div>
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
                        <span className="UserName">
                            {author && author.displayName}
                        </span>
                        {" "}
                        <span className="TimeStamp">
                            {formatDate(message.created.seconds * 1000, "H:mm")}
                        </span>
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

    const isHasBeenAwhile = message.created.seconds - previousMessage.created.seconds > 60;
    return isHasBeenAwhile;
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

ChannelMessages.defaultProps = {
    messages: []
};

ChannelMessages.propTypes = {
    messages: PropTypes.array,
    users: PropTypes.array.isRequired
};

const mapStateToProps = (state, props) => ({
    messages: state.channelsMessages[props.channelId],
    users: state.users.data
});

export default connect(mapStateToProps)(ChannelMessages);