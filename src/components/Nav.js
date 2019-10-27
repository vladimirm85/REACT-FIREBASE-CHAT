import React from 'react';
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
                    <a key={`${channel.id}_channel`}
                       href={`channel/${channel.id}`}
                    >
                        # {channel.id}
                    </a>
                )}
            </nav>
        </div>
    );
}

export default Nav;
