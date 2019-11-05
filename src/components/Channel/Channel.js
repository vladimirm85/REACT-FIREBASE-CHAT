import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import Members from './ChannelMembers';
import ChannelInfo from './ChannelInfo';
import Messages from './ChannelMessages';
import ChatInputBox from './ChannelChatInputBox';
import {
    handleGetUsers,
    handleGetChannels,
    handleGetChannelMessages
} from '../../actions';

const Channel = ({match, users, channels}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleGetUsers());
        dispatch(handleGetChannels());
        dispatch(handleGetChannelMessages(['general', 'nfl', 'programming']));
    }, [dispatch]);

    return (
        channels.isLoaded
        ? <div className="Channel">
            <div className="ChannelMain">
                <ChannelInfo channelId={match.params.id} />
                <Messages channelId={match.params.id} />
                <ChatInputBox channelId={match.params.id} />
            </div>
            <Members />
        </div>
        : null
    );
};

Channel.propTypes = {
    match: PropTypes.object.isRequired,
    users: PropTypes.array,
    channels: PropTypes.object
};


const mapStateToProps = state => ({
    users: state.users,
    channels: state.channels
});

export default connect(mapStateToProps)(Channel);