import React from 'react';
import { NavLink } from "react-router-dom"; 
import { firebase } from '../firebase';
import { useCollection } from '../customHooks/useCollection';

const Nav = ({user}) => {

    return (
        <div className="Nav">
            <div className="User">
                <img
                    className="UserImage"
                    alt={user.id}
                    src={user.photoUrl}
                />
                <div>
                    <div>{user.displayName}</div>
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