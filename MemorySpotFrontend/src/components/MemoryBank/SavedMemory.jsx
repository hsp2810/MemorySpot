import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { convertToDate } from '../../utils/Dates/datetimeconvertor';

const SavedMemory = props => {
  return (
    <>
      <Box
        p={10}
        boxShadow="md"
        rounded="md"
        borderWidth={1}
        transition={'0.1s ease-in'}
      >
        {/* <Image src={props.image} alt={props.title} mb={4} /> */}
        <Text fontSize={'sm'}>{convertToDate(props.datePosted)}</Text>
        <Heading as="h2" size="lg" my={2}>
          {props.title}
        </Heading>
        <Text fontSize="md" mb={4}>
          {props.caption}
        </Text>
        <Text fontSize="md" mb={4}>
          <span style={{ color: 'orange' }}>Posted by</span> {props.owner}
        </Text>
        <Button colorScheme="orange" size="sm">
          <a href={`/memories/${props._id}/view`}>View</a>
        </Button>
      </Box>
    </>
  );
};
export default SavedMemory;
