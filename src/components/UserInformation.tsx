import React from 'react';

import UserCard2 from './UserCard';
import "../css/UserInformation.css";
import NavBar from './NavBar';


const UserInformation = () => {

    return (
        <>
            <NavBar/>
            <section className="section">
                <UserCard2 />
            </section>
        </>
    )
}

export default UserInformation
