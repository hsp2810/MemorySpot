import React, { useState } from 'react';
import '../assets/css/SocialMediaSettings.css';

const SocialMediaSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [chatSettings, setChatSettings] = useState('all');
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [isLocationPrivate, setIsLocationPrivate] = useState(false);
  const [isActivityPrivate, setIsActivityPrivate] = useState(false);

  const handlePrivateProfileToggle = () => {
    setIsPrivateProfile(!isPrivateProfile);
  };

  const handleLocationPrivacyToggle = () => {
    setIsLocationPrivate(!isLocationPrivate);
  };

  const handleActivityPrivacyToggle = () => {
    setIsActivityPrivate(!isActivityPrivate);
  };
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? '#fff' : '#222';
  };

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
  };

  const handleChatSettingsChange = (event) => {
    setChatSettings(event.target.value);
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">User Settings</h2>
      <div className="settings-section">
        <h3 className="settings-section-title">Appearance</h3>
        <label className="settings-checkbox">
          <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
          Dark mode
        </label>
      </div>
      <div className="settings-section">
        <h3 className="settings-section-title">Notifications</h3>
        <label className="settings-checkbox">
          <input type="checkbox" checked={notifications} onChange={handleNotificationToggle} />
          Receive notifications
        </label>
      </div>
      <div className="settings-section">
        <h3 className="settings-section-title">Chat &amp; Messaging</h3>
        <label className="settings-radio">
          <input type="radio" name="chat-settings" value="all" checked={chatSettings === 'all'} onChange={handleChatSettingsChange} />
          Receive messages from all users
        </label>
        <label className="settings-radio">
          <input type="radio" name="chat-settings" value="friends" checked={chatSettings === 'friends'} onChange={handleChatSettingsChange} />
          Only receive messages from friends
        </label>
      </div>
      <div className="settings-section setting-item">
        <span className="settings-title setting-name">Make my profile private</span>
        <label className="switch">
          <input type="checkbox" checked={isPrivateProfile} onChange={handlePrivateProfileToggle} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="settings-section setting-item">
        <span className="settings-title setting-name">Hide my location</span>
        <label className="switch">
          <input type="checkbox" checked={isLocationPrivate} onChange={handleLocationPrivacyToggle} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="settings-section setting-item">
        <span className="settings-title setting-name">Hide my activity</span>
        <label className="switch">
          <input type="checkbox" checked={isActivityPrivate} onChange={handleActivityPrivacyToggle} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default SocialMediaSettings;
