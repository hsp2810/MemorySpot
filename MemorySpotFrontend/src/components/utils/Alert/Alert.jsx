import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from '@chakra-ui/react';

const AlertItem = ({ alert }) => {
  return (
    <Alert status={alert.type} marginTop="5%">
      <AlertIcon />
      <Box>
        <AlertTitle>{alert.heading}</AlertTitle>
        <AlertDescription>{alert.msg}</AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onclose}
      />
    </Alert>
  );
};

export default AlertItem;
