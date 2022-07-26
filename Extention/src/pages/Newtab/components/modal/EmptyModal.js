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
  useColorModeValue
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
  dataUnready
}) {
  // const [color, setColor] = useState('cyan');
  return (
    <>
      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size={'xs'}
      >
        <>
          <ModalOverlay bg="blackAlpha.700" />

          <ModalContent
            rounded={'2xl'}
            bgColor={useColorModeValue(`gray.50`, `gray.800`)}
            padding={'0'}
          >
            {children}
          </ModalContent>
        </>
      </Modal>
    </>
  );
}

export default BasicModal;
