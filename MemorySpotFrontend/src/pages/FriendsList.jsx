// import React from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';

// function FriendsList({ friends }) {
//   const navigate = useNavigate();
//   const { isLogin } = useSelector(state => state.auth);

//   useEffect(() => {
//     if (!isLogin) {
//       navigate('/');
//     }
//   }, []);
//   return (
//     isLogin &&
//     <div>
//       <h1>Friends List</h1>
//       <ul>
//         {friends.map((friend, index) => (
//           <li key={index}>{friend}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// FriendsList.propTypes = {
//   friends: PropTypes.array.isRequired,
// };

// export default FriendsList;
