import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
function DetailModal({ opened, setOpened, data }) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Modal size={'full'} isOpen={opened} onClose={() => setOpened(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={'flex'} flexDir={'row'} justifyContent={'center'}>
              <Box
                display={'flex'}
                flexDir={'column'}
                justifyContent={'center'}
              >
                <Text fontSize={'3xl'} fontWeight={'bold'}>
                  {data.content.slice(0, 30)}
                </Text>
                <Text width={'4xl'} fontSize={'xl'}>
                  {data.content}
                </Text>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setOpened(false)}>
              Close
            </Button>
            <Button variant="outline">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DetailModal;
