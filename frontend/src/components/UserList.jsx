import React, {useState, useEffect} from 'react';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);  // To store user data
    const [loading, setLoading] = useState(true);  // To track loading state

    // Function to fetch users from the API
    const fetchUsers = async () => {
        setLoading(true);  // Set loading to true before fetching data
        try {
            const response = await fetch('https://user-address-backend1.onrender.com/users');
            const data = await response.json();
            setUsers(data);  // Set users data after fetching
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);  // Set loading to false after data is fetched
    };

    useEffect(() => {
        fetchUsers();  // Fetch users when the component mounts
    }, []);

    return (
        <div>
            {loading ? (  // Show loading message while fetching data
                <div className="loader-container">
                    <div className="loader-circle"></div>
                </div>

            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="table">{user.name}</td>
                                <td className="addresses-column">
                                    {user.addresses.map((address, index) => (
                                        <p key={index}>{address}</p>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
