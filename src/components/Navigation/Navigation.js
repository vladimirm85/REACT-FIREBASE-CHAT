import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom"; 
import { firebase } from '../../firebase';

const Navigation = ({authUser, channels}) =>
    <div className="Nav">
        <div className="User">
            <img
                className="UserImage"
                alt={authUser.id}
                src={authUser.photoUrl}
            />
            <div>
                <div>{authUser.displayName}</div>
                <div>
                    <button
                        className="text-button"
                        onClick={() => {
                            firebase.auth().signOut();
                        }}>
                        log out
                    </button>
                </div>
            </div>
        </div>
        <nav className="ChannelNav">
            {channels.map(channel =>
                <NavLink key={channel.id} to={`/channels/${channel.id}`}>
                    #{channel.id}
                </NavLink>
            )}
        </nav>
    </div>;

Navigation.defaultProps = {
    channels: []
};

Navigation.propTypes = {
    authUser: PropTypes.object.isRequired,
    channels: PropTypes.array
};

const mapStateToProps = state => ({
    authUser: state.authUser.data,
    channels: state.channels.data
});

export default connect(mapStateToProps)(Navigation);