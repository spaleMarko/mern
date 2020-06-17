import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [{id: 'u1',
        name: 'Marko Spasic',
        image: 'https://lh4.googleusercontent.com/proxy/Du4A4mlP2wW_qYQqReFEWLmuRhk48qVwI43BCuIM2KXDBeV-c1Nbm2ZYwNAsJUASKq0tV-TNVX7VOvksmKNJobokbCzVEX8',
        places: 10
    }];

    return <UsersList items={USERS} />
};

export default Users;