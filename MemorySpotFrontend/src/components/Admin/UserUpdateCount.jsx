import React, { useState, useEffect } from 'react';

const UserUpdateCount = ({ user, onUpdate }) => {
  const [originalUser, setOriginalUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [updatedUserCount, setUpdatedUserCount] = useState(0);

  useEffect(() => {
    setOriginalUser(user);
    setUpdatedUser(user);
  }, [user]);

  useEffect(() => {
    if (updatedUser) {
      setUpdatedUserCount(1);
    } else {
      setUpdatedUserCount(0);
    }
  }, [updatedUser]);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUpdatedUser({
      ...updatedUser,
      [name]: value
    });
  };

  const handleSaveClick = () => {
    onUpdate(updatedUser);
    setOriginalUser(updatedUser);
  };

  return (
    <div>
      <div>
        <label htmlFor="fname">First Name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={updatedUser ? updatedUser.fname : ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={updatedUser ? updatedUser.lname : ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={updatedUser ? updatedUser.username : ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={updatedUser ? updatedUser.email : ''}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSaveClick}>Save Changes</button>
      <p>{updatedUserCount} user(s) updated</p>
    </div>
  );
};

export default UserUpdateCount;
