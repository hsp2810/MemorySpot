import {
  Button,
  Flex,
  VStack,
  FormControl,
  Heading,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Image,
} from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { authenticateUser, signOnService } from '../services/login';
import { Link, useNavigate } from 'react-router-dom';
import { authenticate, login, register } from '../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/images/logo-login.png';

const initialUser = {
  username: '',
  email: '',
  name: '',
  password: '',
  isMember: true,
};

const LoginP = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { isLogin } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const { alert } = useSelector(state => state.auth);

  const handleUser = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setUser({ ...user, isMember: !user.isMember });
  };

  useEffect(() => {
    userAlreadyLoggedIn();
  });

  const userAlreadyLoggedIn = async () => {
    if (isLogin) {
      navigate('/home');
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    await login(user.email, user.password, dispatch);
  };

  const handleRegister = async e => {
    e.preventDefault();
    // console.log('Printing the register object: ', user);
    await register(dispatch, user);
    if (alert !== null && alert !== undefined) {
      console.log(alert.message);
      window.alert(alert.message);
      if (alert.type === 'success') {
        toggleMember();
      }
    } else {
      window.alert('FUck yourself. Not working');
    }
  };

  return (
    <>
      <Flex
        marginLeft={'-8rem !important'}
        alignItems={'flexed-top'}
        marginTop="10%"
        justifyContent={'space-evenly'}
      >
        <VStack>
          <Button colorScheme={'orange'}>
            <Link to={'/'} width={'100%'}>
              Go to Landing Page
            </Link>
          </Button>
          <Image
            src={Logo}
            alt="Memory Spot Logo"
            height={'40vh'}
            width={'33vw'}
          />
        </VStack>
        <VStack>
          <FormControl>
            {/* heading  */}
            <Heading textAlign={'center'}>
              {user.isMember ? 'Login' : 'Register'}
            </Heading>

            <Stack marginTop={'2%'}>
              {!user.isMember && (
                <>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    type="text"
                    value={user.username}
                    onChange={handleUser}
                    placeholder="Enter username you like"
                  />
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    value={user.name}
                    placeholder="Enter your good name"
                    onChange={handleUser}
                  />
                </>
              )}
            </Stack>

            <Stack marginTop={'3%'}>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                value={user.email}
                onChange={handleUser}
                placeholder="Enter your email address"
              />
            </Stack>

            <Stack marginTop={'5%'}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  name="password"
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleUser}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>

            {/* Submit */}
            {user.isMember ? (
              <Button
                colorScheme="orange"
                marginTop={'4%'}
                onClick={handleLogin}
              >
                Login
              </Button>
            ) : (
              <Button
                colorScheme="orange"
                marginTop={'4%'}
                onClick={handleRegister}
              >
                Register
              </Button>
            )}

            {/* Toggle button */}
            <Button
              colorScheme={'teal'}
              variant="ghost"
              float={'right'}
              marginTop="4%"
              onClick={toggleMember}
            >
              {!user.isMember
                ? 'Already a member? Login Here'
                : 'Not a member yet? Register Here'}
            </Button>
          </FormControl>
        </VStack>
      </Flex>
    </>
  );
};

export default LoginP;
