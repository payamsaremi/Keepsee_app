import React, { useState } from 'react';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';
import BasicModal from '../modal/BasicModal';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
function AddToSpaceModal({ setState, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [Color, setColor] = useState('cyan');

  const createNewColumn = () => {
    const id = 'column-' + Math.floor(Math.random() * 10000); //TODO:make  this better
    const newColumn = {
      id: id,
      title: title ? title : '',
      color: Color,
      taskIds: Array(),
    };
    return newColumn;
  };

  const create = () => {
    const newColumn = createNewColumn();

    const col = {
      ...newColumn,
    };

    const state = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: col,
      },
      columnOrder: [newColumn.id, ...data.columnOrder],
    };

    setState(state);
    setIsOpen(!isOpen);
    return;
  };
  return (
    <>
      <IconButton
        size={'xs'}
        variant={'link'}
        bgColor={useColorModeValue('white', 'gray.800')}
        p={'0.5'}
        rounded={'lg'}
        onClick={() => {
          create();
        }}
        _focus={{ boxShadow: 'none' }}
        icon={<BiPlus size={20} />}
      />
    </>
  );
}
export default AddToSpaceModal;
