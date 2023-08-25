import React, { useState } from 'react';
import { Button, Flex, HStack, Image, useDisclosure } from '@chakra-ui/react';
import Logo from '../../../assets/images/ms-logo.png';
import LogoWText from '../../../assets/images/ms-logo-name.png';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import SearchPop from '../../utils/SearchPop';
import '../../../assets/css/icons.css';
import { CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hovered, setHovered] = useState(false);
  const { homeUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHover = () => {
    setHovered(true);
    onOpen();
  };

  const handleLeave = () => {
    setHovered(false);
    onClose();
  };

  const handleLogout = async e => {
    await logout(dispatch);
    navigate('/');
  };

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Flex
        direction="column"
        position="fixed"
        top={0}
        left={0}
        height="100vh"
        width={isOpen || hovered ? '240px' : '60px'}
        backgroundColor="#F5FBEA"
        zIndex={10}
        transition="width 0.2s ease-out"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        marginRight="5rem !important"
      >
        <Flex
          alignItems="center"
          justifyContent={'center'}
          my={4}
          height="20vh"
        >
          {!(isOpen || hovered) ? (
            <Image src={Logo} alt="MS" height={'4em'} width={'3em'} />
          ) : (
            <Image src={LogoWText} alt="MS" height={'4em'} width={'15em'} />
          )}
        </Flex>
        <Flex direction="column" justifyContent="flex-start">
          <Button
            color="black"
            fontWeight={'light !important'}
            my="2"
            mx="auto"
            variant="ghost"
            width="80%"
            justifyContent="flex-start"
            _hover={{ backgroundColor: '#f3a619', color: 'black' }}
          >
            <Link to={`/home`}>
              <span
                className="material-symbols-outlined"
                style={{ marginRight: '10px' }}
              >
                home
              </span>
              {hovered && 'Home'}
            </Link>
          </Button>
          <Button
            color="black"
            my="2"
            fontWeight={'light !important'}
            mx="auto"
            variant="ghost"
            width="80%"
            justifyContent="flex-start"
            _hover={{ backgroundColor: '#f3a619', color: 'black' }}
            onClick={() => {
              setOpen(o => !o);
              onClose();
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ marginRight: '10px' }}
            >
              search
            </span>
            {hovered && 'Search'}
          </Button>

          <Button
            color="black"
            my="2"
            mx="auto"
            fontWeight={'light !important'}
            variant="ghost"
            width="80%"
            justifyContent="flex-start"
            _hover={{ backgroundColor: '#f3a619', color: 'black' }}
          >
            <Link to={`/home/friends`}>
              {/* <EditIcon style={{ marginRight: '10px' }} /> */}
              <span
                className="material-symbols-outlined"
                style={{ marginRight: '10px' }}
              >
                diversity_1
              </span>
              {hovered && 'Friends'}
            </Link>
          </Button>

          <Button
            color="black"
            my="2"
            fontWeight={'light !important'}
            mx="auto"
            variant="ghost"
            width="80%"
            justifyContent="flex-start"
            _hover={{ backgroundColor: '#f3a619', color: 'black' }}
          >
            <Link to={'/home/mymemories'}>
              {/* <HamburgerIcon style={{ marginRight: '10px' }} /> */}
              <span
                className="material-symbols-outlined"
                style={{ marginRight: '10px' }}
              >
                neurology
              </span>
              {hovered && 'My Memories'}
            </Link>
          </Button>

          <Button
            color="black"
            fontWeight={'light !important'}
            my="2"
            mx="auto"
            variant="ghost"
            width="80%"
            justifyContent="flex-start"
            _hover={{ backgroundColor: '#f3a619', color: 'black' }}
          >
            <Link to={'/home/memorybank'}>
              {/* <HamburgerIcon style={{ marginRight: '10px' }} /> */}
              <span
                className="material-symbols-outlined"
                style={{ marginRight: '10px' }}
              >
                account_balance
              </span>
              {hovered && 'Memory Bank'}
            </Link>
          </Button>
          {homeUser.isAdmin && (
            <Button
              color="black"
              fontWeight={'light !important'}
              mx="auto"
              variant="ghost"
              width="80%"
              justifyContent="flex-start"
              _hover={{ backgroundColor: '#f3a619', color: 'black' }}
            >
              <Link to={'/admin'}>
                {/* <HamburgerIcon style={{ marginRight: '10px' }} /> */}
                <span
                  className="material-symbols-outlined"
                  style={{ marginRight: '10px' }}
                >
                  admin_panel_settings
                </span>
                {hovered && 'Admin'}
              </Link>
            </Button>
          )}
        </Flex>
        <Flex mt="auto" alignItems="center" mb={4} flexDir="column">
          <Button
            color="black"
            my="2"
            mx="auto"
            fontWeight={'light !important'}
            variant="ghost"
            width="80%"
            justifyContent="flex-start"
            _hover={{ backgroundColor: '#f3a619', color: 'black' }}
          >
            <Link to={`/home/profile`}>
              <span
                className="material-symbols-outlined"
                style={{ marginRight: '10px' }}
              >
                person
              </span>
              {hovered && 'User Profile'}
            </Link>
          </Button>
          <Button
            color="black"
            my="2"
            mx="auto"
            fontWeight={'light !important'}
            variant="ghost"
            width="80%"
            justifyContent="flex-start"
            _hover={{ backgroundColor: '#f3a619', color: 'black' }}
          >
            <Link to={`/settings`}>
              <span
                className="material-symbols-outlined"
                style={{ marginRight: '10px' }}
              >
                settings
              </span>
              {hovered && 'Settings'}
            </Link>
          </Button>
          <Button
            color="black"
            my="2"
            mx="auto"
            fontWeight={'light !important'}
            variant="ghost"
            width="80%"
            justifyContent="flex-start"
            onClick={handleLogout}
            _hover={{ backgroundColor: '#E43E3E', color: 'black' }}
          >
            <span
              className="material-symbols-outlined"
              style={{ marginRight: '10px' }}
            >
              logout
            </span>
            {hovered && 'Logout'}
          </Button>
        </Flex>
      </Flex>

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
            zIndex: '998', // Set the overlay z-index
          }}
        >
          <div className="modal">
            <a
              className="close"
              onClick={closeModal}
              style={{ float: 'right' }}
            >
              <CloseIcon />
            </a>
            <SearchPop closeModal={closeModal} />
          </div>
        </Popup>
      )}
    </>
  );
};

export default Sidebar;
