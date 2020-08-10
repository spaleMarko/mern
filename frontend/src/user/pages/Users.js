import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UlElements/ErrorModal';
import LoadingSpiner from '../../shared/components/UlElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const responseData = await sendRequest('http://localhost:5000/api/users');
    
                setLoadedUsers(responseData.users);
                
            }catch(err){
               
            }
        };
        fetchUsers();
    }, [sendRequest]);

    return( 
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpiner />
                </div>
            )}
            {!isLoading && loadedUsers &&<UsersList items={loadedUsers} />}
        </React.Fragment>
    )
};

export default Users;