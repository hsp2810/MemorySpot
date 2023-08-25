import { useState } from 'react';
import {
  Box,
  Container,
  Text,
  Flex,
  Input,
  Textarea,
  Button,
  useToast,
  Image
} from '@chakra-ui/react';
import contactImg from '../assets/images/contact-img.svg';
import NavbarComponent from '../components/Web/MainNavbarComponent';

const ContactP = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const toast = useToast();

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setButtonText('Sending...');
    let response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText('Send');
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code === 200) {
      setStatus({ success: true, message: 'Message sent successfully' });
      toast({
        title: 'Message sent successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      setStatus({
        success: false,
        message: 'Something went wrong, please try again later.',
      });
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <NavbarComponent />
      <Box as="section" className="contact" id="connect">
        <Container maxW="container.lg">
          <Flex align="center" justify="center">
            <Box
              w="100%"
              maxW="60vw"
              m="auto"
              pr={{ base: '0', md: '16' }}
              marginTop={'2rem'}
            >
              <Text as="h4" fontSize={{ base: '2xl', md: '4xl' }}>
                Get In Touch
              </Text>
              <Box>
                <form onSubmit={handleSubmit}>
                  <Flex flexWrap="wrap" justifyContent="space-between">
                    <Box w={{ base: '100%', md: '48%' }}>
                      <Input
                        type="text"
                        value={formDetails.firstName}
                        placeholder="First Name"
                        onChange={e =>
                          onFormUpdate('firstName', e.target.value)
                        }
                      />
                    </Box>
                    <Box w={{ base: '100%', md: '48%' }}>
                      <Input
                        type="text"
                        value={formDetails.lastName}
                        placeholder="Last Name"
                        onChange={e => onFormUpdate('lastName', e.target.value)}
                      />
                    </Box>
                    <Box w="100%">
                      <Input
                        type="email"
                        value={formDetails.email}
                        placeholder="Email Address"
                        onChange={e => onFormUpdate('email', e.target.value)}
                      />
                    </Box>
                    <Box w="100%">
                      <Input
                        type="tel"
                        value={formDetails.phone}
                        placeholder="Phone No."
                        onChange={e => onFormUpdate('phone', e.target.value)}
                      />
                    </Box>
                    <Box w="100%">
                      <Textarea
                        value={formDetails.message}
                        placeholder="Message"
                        onChange={e => onFormUpdate('message', e.target.value)}
                        rows="6"
                      />
                    </Box>
                    <Box w="100%">
                      <Button
                        type="submit"
                        colorScheme="blue"
                        size="lg"
                        isDisabled={
                          !formDetails.firstName ||
                          !formDetails.email ||
                          !formDetails.phone ||
                          !formDetails.message
                        }
                      >
                        {buttonText}
                      </Button>
                      {status.message && (
                        <Text
                          mt="4"
                          color={status.success ? 'green.500' : 'red.500'}
                        >
                          {status.message}
                        </Text>
                      )}
                    </Box>
                  </Flex>
                </form>
              </Box>
            </Box>
            
            {/*<Image src={contactImg} alt="contact" maxHeight='30vw' />*/}
          </Flex>
        </Container>
      </Box>
    </>
  );
};
export default ContactP;
