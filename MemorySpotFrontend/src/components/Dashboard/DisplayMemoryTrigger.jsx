import { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import Popup from 'reactjs-popup';

const DisplayMemoryTrigger = props => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const turnOnDisplay = () => {
    setOpen(o => !o);
  };

  useEffect(() => {
    turnOnDisplay();
  });
  return (
    <>
      {/* The main popup component will only load if open is true */}
      {open && (
        <Popup
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          contentStyle={{
            backgroundColor: 'white', // Set the background color of the popup content
            padding: '20px',
            width: '40vw',
            height: '60vh',
            overflowY: 'auto',
            overflowX: 'hiddem',
          }}
          overlayStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Set the overlay background color and opacity
            zIndex: '999', // Set the overlay z-index
          }}
        >
          <div className="modal">
            <button type="hidden" className="close" onClick={closeModal}>
              &times;
            </button>
            {/* Content goes here */}
            <Heading>{'Fake'}</Heading>
          </div>
        </Popup>
      )}
    </>
  );
};

export default DisplayMemoryTrigger;

// <Popover>
//   <PopoverTrigger>
//     <Button>This would be automatically clicked by the memory</Button>
//   </PopoverTrigger>
//   {/* <Portal> */}
//   <PopoverContent>
//     <PopoverArrow />
//     <PopoverHeader>TITLE of the memory</PopoverHeader>
//     <PopoverCloseButton />
//     <PopoverBody>
//       <Button colorScheme="blue">Video or other thing</Button>
//     </PopoverBody>
//     <PopoverFooter>Footer, Thanks for coming by!</PopoverFooter>
//   </PopoverContent>
//   {/* </Portal> */}
// </Popover>
