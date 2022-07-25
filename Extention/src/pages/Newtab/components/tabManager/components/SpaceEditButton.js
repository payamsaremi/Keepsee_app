import React, { useEffect, useState } from 'react';
import { BiDotsVerticalRounded, BiEdit, BiEditAlt } from 'react-icons/bi';
import BasicIconButton from '../../utils/BasicIconButton';

import { FormControl, VStack, FormLabel, Input } from '@chakra-ui/react';

import BasicModal from '../../modal/BasicModal';
import useSpace from '../../../hooks/useSpace';

function SpaceEditButton({ spaceData }) {
  const { update } = useSpace();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  useEffect(() => {
    setTitle(spaceData.title);
    setDateCreated(spaceData.dateCreated);
  }, [spaceData]);

  const saveChanges = () => {
    const editedSpace = {
      ...spaceData,
      title
    };
    update(editedSpace);
    setIsOpen(!isOpen);
    setTitle('');
  };
  return (
    <>
      <BasicIconButton
        onClick={() => setIsOpen(!isOpen)}
        icon={<BiEditAlt size={'18'} />}
      />
      {/* //* Modal for creating new Space */}
      <BasicModal
        title={'Edit space'}
        buttonTitle={'Save'}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSave={() => saveChanges()}
        // dataUnready={profile ? false : true}
        // isSaving={isSaving}
      >
        <VStack spacing={'2'}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              variant="filled"
              placeholder={'What is this space called?'}
              value={title ? title : ''}
              type={'text'}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  saveChanges();
                }
              }}
            />
          </FormControl>
        </VStack>
      </BasicModal>
    </>
  );
}

export default SpaceEditButton;
