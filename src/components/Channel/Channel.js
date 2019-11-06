import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dataBase } from '../../firebase';
import Members from './ChannelMembers';
import ChannelInfo from './ChannelInfo';
import Messages from './ChannelMessages';
import ChatInputBox from './ChannelChatInputBox';
import { handleGetChannelMessages } from '../../actions';

const Channel = ({match, authUser}) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const authUserChannels = Object.keys(authUser.channels);
        
        dispatch(handleGetChannelMessages(authUserChannels));
    }, [dispatch, authUser.channels]);

    useAddAuthUserChannel(authUser, match.params.id);

    return (
        <div className="Channel">
            <div className="ChannelMain">
                <ChannelInfo channelId={match.params.id} />
                <Messages channelId={match.params.id} />
                <ChatInputBox channelId={match.params.id} />
            </div>
            <Members />
        </div>
    );
};

const useAddAuthUserChannel = (authUser, channelId) => {
    useEffect(() => {
        const authUserChannels = Object.keys(authUser.channels);
        const isAuthUserChannel = authUserChannels.find(channel => channel === channelId);

        if (!isAuthUserChannel) {
            dataBase.doc(`users/${authUser.id}`).update({
                [`channels.${channelId}`]: true
            });
        };
    }, [channelId, authUser]);
};

Channel.propTypes = {
    match: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
};


const mapStateToProps = state => ({
    users: state.users.data,
    authUser: state.authUser.data
});

export default connect(mapStateToProps)(Channel);