import React, { useState, useEffect } from 'react';

import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [userToUpdate, setUserToUpdate] = useState({});
  const [userToAdd, setUserToAdd] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/auth/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/auth/user/${searchId}`);
      setUserToUpdate(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/auth/user/${userToUpdate._id}`, userToUpdate);
      setUserToUpdate({});
      setSearchId('');
      fetchUsers(); // Fetch updated user list after update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/auth/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setUserToUpdate({}); // Clear userToUpdate after deleting
      setSearchId('');
      fetchUsers(); // Fetch updated user list after delete
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('/auth/user', userToAdd);
      setUserToAdd({});
      fetchUsers(); // Fetch updated user list after add
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  
  

  return (
    <div>
      <div>
        <h2>Add New User</h2>
        <form onSubmit={handleAdd}>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={userToAdd.name || ''}
              onChange={(e) =>
                setUserToAdd({ ...userToAdd, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Age"
              value={userToAdd.age || ''}
              onChange={(e) =>
                setUserToAdd({ ...userToAdd, age: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Height"
              value={userToAdd.height || ''}
              onChange={(e) =>
                setUserToAdd({ ...userToAdd, height: e.target.value })
              }
            />
            <button type="submit">Add</button>
          </div>
        </form>
      </div>

      <div>
        <h1>Search User to update or delete</h1>
        <div>
          <input
            type="text"
            placeholder="Enter User ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div>
        {userToUpdate._id && (
          <div>
            <br />
            <input
              type="text"
              placeholder="Name"
              value={userToUpdate.name}
              onChange={(e) =>
                setUserToUpdate({ ...userToUpdate, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Age"
              value={userToUpdate.age}
              onChange={(e) =>
                setUserToUpdate({ ...userToUpdate, age: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Height"
              value={userToUpdate.height}
              onChange={(e) =>
                setUserToUpdate({ ...userToUpdate, height: e.target.value })
              }
            />
            <div>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => handleDelete(userToUpdate._id)}>Delete</button>
            </div>
          </div>
        )}
      </div>

      <div>
        <center>
          <h3>User Records</h3>
          <table border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Height</th>
                
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.height}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      </div>
    </div>
  );
};

export default UserList;
