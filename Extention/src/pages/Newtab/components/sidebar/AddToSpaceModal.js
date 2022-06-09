import React, { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
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
      title: title ? title : 'Untitled',
      color: Color,
      taskIds: Array(),
    };
    return newColumn;
  };

  const save = () => {
    console.log('saving...');
    const newColumn = createNewColumn();
    const state = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
      columnOrder: [newColumn.id, ...data.columnOrder],
    };
    setState(state);
    setTitle('');
    setColor('');
    setIsOpen(false);
  };
  return (
    <>
      <IconButton
        size={'xs'}
        variant={'link'}
        bgColor={'white'}
        p={'0.5'}
        rounded={'lg'}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        _focus={{ boxShadow: 'none' }}
        icon={<BiPlus size={20} />}
      />
      <BasicModal
        title={'Create new group'}
        buttonTitle={'Add'}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSave={() => save()}
        // dataUnready={profile ? false : true}
        // isSaving={isSaving}
      >
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            variant="filled"
            placeholder={'give it a name'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                save();
              }
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Color</FormLabel>
          <Input
            variant="filled"
            placeholder={'Set a color'}
            value={Color}
            onChange={(e) => setColor(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                save();
              }
            }}
          />
        </FormControl>
      </BasicModal>
    </>
  );
}
export default AddToSpaceModal;
