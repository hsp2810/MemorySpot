import { Button, Heading, HStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <>
      <HStack justifyContent={'space-around'} margin={'2rem 0rem'}>
        <Heading>Memory Spot </Heading>
        <HStack
          justifySelf={'center'}
          fontSize="2xl"
          justifyContent={'space-between !important'}
        >
          <Link
            to={'/home'}
            className="nav-link"
            style={{ margin: '0rem 1.1rem' }}
          >
            Home
          </Link>
          <Link
            to={'/about'}
            className="nav-link"
            style={{ margin: '0rem 1.1rem' }}
          >
            About
          </Link>
          <Link
            to={'/Contact'}
            className="nav-link"
            style={{ margin: '0rem 1.1rem' }}
          >
            Contact
          </Link>
        </HStack>
        <button className="secondary-button m-2">
          <Link to="/sign-on"> Login / Register </Link>
        </button>
        {/* <Button color={'orange'} justifyContent={'right'}>
          <Link to={'/sign-on'}></Link>
        </Button> */}
      </HStack>
    </>
  );
};

export default NavbarComponent;
