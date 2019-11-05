import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ChannelInfo = ({channel}) => 
    <div className="ChannelInfo">
        <div className="Topic">
            Topic: <input
                    key={channel.id}
                    className="TopicInput"
                    defaultValue={channel.topic}/>
        </div>
        <div className="ChannelName">#{channel.id}</div>
    </div>;

ChannelInfo.propTypes = {
    channel: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
    channel: state.channels.data.find(channel => channel.id === props.channelId)
});

export default connect(mapStateToProps)(ChannelInfo);