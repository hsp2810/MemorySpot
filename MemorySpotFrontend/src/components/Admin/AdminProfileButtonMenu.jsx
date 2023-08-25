import React, { useState } from 'react';
import Modal from './ProfileModal';
import '../../assets/css/adminCss/adminProfile.css'

function AdminProfileButtonMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginLogoutClick = () => {
    setIsLoggedIn(!isLoggedIn);
    handleCloseModal();
  };

  return (
    <div className="admin-page">
      <div className="profile-button" onClick={handleProfileClick}>
        <img src="path/to/image.png" alt="Profile Image" />
      </div >
      <div className="modal-adjustment">
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <button onClick={handleLoginLogoutClick}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
          <button>Account Settings</button>
        </Modal>
      </div>
    </div>
  );
}

export default AdminProfileButtonMenu;
