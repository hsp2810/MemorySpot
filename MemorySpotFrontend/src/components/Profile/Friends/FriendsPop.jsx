import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
// import '../assets/css/FriendPop.css';
import Popup from 'reactjs-popup';
import Friends from '../Friends/Friends';

// Sample user data

// FriendPop component
const FriendsPop = () => {
  // State for list of friends
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Button className="button" onClick={() => setOpen(o => !o)}>
        Friends
      </Button>
      {open && (
        <Popup
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid black', // Set the background color of the popup content
            padding: '20px',
            width: '40vw',
            height: '70vh',
            overflowY: 'auto',
            overflowX: 'hiddem',
            borderRadius: '0.5rem',
          }}
          overlayStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Set the overlay background color and opacity
            zIndex: '998', // Set the overlay z-index
          }}
        >
          <div className="modal" style={{}}>
            <a className="close" onClick={closeModal}>
              &times;
            </a>

            {/* {search ?  */}
            <Friends />
            {/* : <CreateEditMemory />} */}
          </div>
        </Popup>
      )}
    </>
  );
};

export default FriendsPop;
