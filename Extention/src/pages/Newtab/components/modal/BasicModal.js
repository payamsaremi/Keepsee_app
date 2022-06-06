import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { Button, Text } from '@chakra-ui/react';
function BasicModal({
  title,
  children,
  buttonTitle,
  isOpen,
  onSave,
  onClose,
  isSaving,
  dataUnready,
}) {
  const [color, setColor] = useState('cyan');
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        {dataUnready ? (
          <>
            {' '}
            <Box
              display={'flex'}
              position={'fixed'}
              left={'50vw'}
              right={'50vw'}
              top={'50vh'}
              bottom={'50vh'}
              justifyContent={'center'}
              alignItems={'center'}
              maxH={'100vh'}
              maxW={'100vw'}
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                bgColor="white"
                p={'8'}
                rounded={'2xl'}
                shadow={'sm'}
              >
                <Spinner size="xl" />
              </Box>
            </Box>
          </>
        ) : (
          <>
            <ModalOverlay />
            <ModalContent rounded={'2xl'}>
              <ModalHeader color={`gray.600`}>{title}</ModalHeader>
              <ModalCloseButton _focus={{ boxShadow: 'none' }} />
              <ModalBody>{children}</ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="gray"
                  color={'gray.600'}
                  rounded={'2xl'}
                  variant={'ghost'}
                  mr={3}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  variant={'ghost'}
                  rounded={'2xl'}
                  bg={`${color}.50`}
                  colorScheme={color}
                  onClick={onSave}
                  isLoading={isSaving}
                >
                  {buttonTitle}
                </Button>
              </ModalFooter>
            </ModalContent>
          </>
        )}
      </Modal>
    </>
  );
}

export default BasicModal;
