import React, { useState, useEffect } from 'react';
import { fetchMyUser, updateUser } from '../../../services/userService.js';
import '../../../assets/css/EditUser.css';
import NavbarComponent from '../../Web/MainNavbarComponent.jsx';

const EditUser = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: ' ',
    username: '',
    email: '',
    friends: [],
    profilePicture: ' ',
  });

  useEffect(() => {
    const getUser = async () => {
      const myUser = await fetchMyUser();
      setUser(myUser);
    };

    getUser();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('user before update: ', user);
    const updatedUser = await updateUser(user);
    console.log('user after update: ', updatedUser);
  };

  return (
    <div>
      <NavbarComponent />
      <div className="edit-user-container">
        <h2 className="edit-user-heading">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name: </label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name: </label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Profile Picture:</label>
            <input
              type="text"
              name="profilePicture"
              value={user.profilePicture}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
