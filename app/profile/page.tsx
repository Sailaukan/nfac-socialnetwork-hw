'use client'

import React, { useContext } from 'react';
import Login from '../components/Login';
import { UserContext } from '../contexts/PostContext';

function Profile() {
    const { user } = useContext(UserContext);

    return (
        <div className='p-10'>
            <Login />
            
            {/* {user.token} */}
        </div>
    );
}

export default Profile;