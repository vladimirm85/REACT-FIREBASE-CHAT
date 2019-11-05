import React from 'react';
import { NavLink } from "react-router-dom"; 
import { firebase } from '../../firebase';
import { useCollection } from '../../customHooks/useCollection';

const Nav = ({authUser}) => {

    return (
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
                            }}
                        >
                            log out
                        </button>
                    </div>
                </div>
            </div>
            <nav className="ChannelNav">
                {useCollection('channels').map(channel =>
                    <NavLink key={channel.id} to={`/channels/${channel.id}`}>
                        #{channel.id}
                    </NavLink>
                )}
            </nav>
        </div>
    );
}

export default Nav;