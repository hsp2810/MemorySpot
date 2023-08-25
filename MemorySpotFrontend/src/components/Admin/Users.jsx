import React, { useEffect, useState } from 'react';
import '../../assets/css/admin.css';
import { addUser, FetchUser, updateUser, DeleteUser } from '../../services/AdminService';

import UserUpdateCount from './UserUpdateCount';

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [originalUserList, setOriginalUserList] = useState([]);

  useEffect(() => {
    const data = FetchUser();
    setUserList(data);
    setOriginalUserList(data);
  }, []);

  const handleUserClick = user => {
    setSelectedUser(user);
  };
  
  const handleDeleteClick = () => {
    const filteredUsers = userList.filter(user => user !== selectedUser);
    setUserList(filteredUsers);
    setSelectedUser(null);
    DeleteUser(selectedUser);
  };

  const handleAddUserClick = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      fname: formData.get('fname'),
      lname: formData.get('lname'),
      username: formData.get('username'),
      email: formData.get('email')
    };
    setUserList([...userList, user]);
    setIsFormVisible(false);
    addUser(user);
  };

  const handleUpdateUser = updatedUser => {
    const updatedList = userList.map(user => {
      if (user === selectedUser) {
        return updatedUser;
      } else {
        return user;
      }
    });
    setUserList(updatedList);
    setSelectedUser(updatedUser);
    updateUser(updatedUser);
  };

  return (
    <div>
      <h1>List of Users</h1>
      <br />
      <ul>
        {userList.map((user, index) => (
          <li key={index}>
            <div>
              Name: {user.fname} {user.lname}
            </div>
            <div>Username: {user.username}</div>
            <div>Email: {user.email}</div>
            <button
              onClick={() => handleUserClick(user)}
              className="userSelectButton"
            >
              Select
            </button>
            {selectedUser === user && (
              <div>
                <button onClick={handleDeleteClick} className="userDeleteButton">
                  Delete
                </button>
                <UserUpdateCount
                  originalUserList={originalUserList}
                  updatedUserList={userList}
                  onUpdate={handleUpdateUser}
                />
              </div>
            )}
            <br /> <br />
          </li>
        ))}
      </ul>

      <button onClick={handleAddUserClick} className="addUser">
        Add User
      </button>

      {/* Add a form to add a new user */}
      {isFormVisible && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="fname">First Name:</label>
          <input type="text" id="fname" name="fname" required />
          <label htmlFor="lname">Last Name:</label>
          <input type="text" id="lname" name="lname" required />
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <button type="submit" className="save">
            Save
          </button>
        </form>
      )}

   
   
    </div>
  );
};

export default Users;
