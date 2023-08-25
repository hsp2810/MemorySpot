import {
  Heading,
  Text,
  VStack,
  Divider,
  Badge,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import { calcMemUpTime } from '../../../utils/Dates/calcMemUpTime';

const MemoryItemSidebar = ({ memory, handleMarkerClick }) => {
  return (
    <>
      {memory === undefined ? (
        'Memory is undefined'
      ) : (
        <VStack
          alignItems={'flex-start'}
          bgColor={'rgb(59 130 246 / 0.5)'}
          borderRadius={'0.5rem'}
          padding={'1rem'}
          margin={'1rem'}
          onClick={() => handleMarkerClick(memory)}
          cursor="pointer"
          _hover={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Heading size="md" textAlign={'center !important'}>
              {memory.title}
            </Heading>
            <Badge colorScheme="orange">
              {calcMemUpTime(memory.uploadedDate)}
            </Badge>
          </HStack>
          <Divider />
          <Text size={'sm'}>
            <b>Caption:</b> {memory.caption}
          </Text>
          <Text size={'sm'}>
            <b>Address:</b> {memory.address}
          </Text>
          <Text size={'sm'}>
            <b>Uploaded by:</b> {memory.owner[0].name}
          </Text>
        </VStack>
      )}
    </>
  );
};

export default MemoryItemSidebar;
