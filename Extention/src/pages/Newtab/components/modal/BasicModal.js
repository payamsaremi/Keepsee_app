import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Spinner,
  useColorModeValue,
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
  // const [color, setColor] = useState('cyan');
  return (
    <>
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
            <ModalOverlay bg="blackAlpha.700" />
            <ModalContent
              rounded={'2xl'}
              bgColor={useColorModeValue(`gray.50`, `gray.800`)}
            >
              <ModalHeader color={useColorModeValue(`gray.600`, `gray.300`)}>
                {title}
              </ModalHeader>
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
                  bg={useColorModeValue(`${'gray'}.100`, `gray.600`)}
                  colorScheme={'gray'}
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
