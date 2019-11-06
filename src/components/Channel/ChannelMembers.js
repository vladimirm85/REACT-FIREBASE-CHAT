import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ChannelMembers = ({users, channelId}) => {
    return (
        <div className="Members">
            <div>
                {users.map(user => {
                    if(user.channels[channelId]) {
                        return (
                            <div className="Member">
                                <div key={`Member ${user.id}`} className="MemberStatus online" />
                                {user.displayName}
                            </div>
                        );
                    }
                    return null;
                })}
                <div className="Member">
                    <div className="MemberStatus online" />
                    cleverbot
                </div>
            </div>
        </div>
    );
};

ChannelMembers.propTypes = {
    channelId: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired
};


const mapStateToProps = state => ({
    users: state.users.data
});

export default connect(mapStateToProps)(ChannelMembers);
