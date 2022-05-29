import React, { useState } from 'react';
import { Box, Button, IconButton, Fade, Input } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
function ColumnSettingsMenu({
  showSettings,
  setShowSettings,
  column,
  setState,
  data,
}) {
  //   const localStorageState = JSON.parse(window.localStorage.getItem('state'));
  //   const [data, setData] = useState(localStorageState ? localStorageState : '');
  const [Newtitle, setNewTitle] = useState(column.title);
  const [NewColor, setNewColor] = useState(
    column.color ? column.color : 'cyan'
  );
  const saveColumnSettings = (column) => {
    const state = {
      ...data,
      columns: {
        ...data.columns,
        [column.id]: {
          ...data.columns[column.id],
          title: Newtitle,
          color: NewColor,
        },
      },
    };
    setState(state);
    setShowSettings(false);
    console.log(state);
    // data.columns[column.id].title;
  };
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        isCentered
      >
        <ModalOverlay blur={'lg'} />
        <ModalContent>
          <ModalHeader>{Newtitle}</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: 'none' }} />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                variant="filled"
                placeholder={'give it a name'}
                value={Newtitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    saveColumnSettings(column);
                  }
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Color</FormLabel>
              <Input
                variant="filled"
                placeholder={'Set a color'}
                value={NewColor}
                onChange={(e) => setNewColor(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    saveColumnSettings(column);
                  }
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="link"
              colorScheme="gray"
              mr={3}
              onClick={() => setShowSettings(false)}
            >
              Close
            </Button>
            <Button
              colorScheme="cyan"
              variant={'ghost'}
              rounded={'2xl'}
              onClick={() => saveColumnSettings(column)}
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ColumnSettingsMenu;
