import { FormControl, VStack, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import BasicModal from '../../modal/BasicModal';
import BasicIconButton from '../../utils/BasicIconButton';

export default function CreateSpaceButton({ create }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const createSpace = () => {
    create(title);
    setIsOpen(false);
    setTitle('');
  };
  return (
    <>
      <BasicIconButton
        onClick={() => setIsOpen(!isOpen)}
        icon={<BiPlus size={'18'} />}
      />
      {/* //* Modal for creating new Space */}
      <BasicModal
        title={'Create new space'}
        buttonTitle={'Create'}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSave={() => createSpace()}
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
                  createSpace();
                }
              }}
            />
          </FormControl>
        </VStack>
      </BasicModal>
    </>
  );
}
