import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/css/displayAboutPage.css'

const DeveloperInfo = ({ name, title, subtitle, bio, image }) => {
  return (
    <div className="developer-card">
      <img src={image} alt={`${name} profile`} />
      <h2>{name}</h2>
      <h3>{title}</h3>
      <h4>{subtitle}</h4>
      <p>{bio}</p>
    </div>
  );
};

DeveloperInfo.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default DeveloperInfo;
