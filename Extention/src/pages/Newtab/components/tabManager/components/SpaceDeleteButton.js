import { Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import useSpace from '../../../hooks/useSpace';
import BasicModal from '../../modal/BasicModal';
import BasicIconButton from '../../utils/BasicIconButton';

function SpaceDeleteButton({ spaceData }) {
  const [isOpen, setIsOpen] = useState(false);
  const { remove } = useSpace();
  const removeSpace = () => {
    remove(spaceData.id);
    setIsOpen(!isOpen);
  };
  return (
    <>
      <BasicIconButton
        onClick={() => setIsOpen(!isOpen)}
        icon={<BiTrash size={'18'} />}
      />
      {/* //* Modal to Delete a Space */}

      <BasicModal
        title={`Delete ${spaceData.title}`}
        buttonTitle={'Delete'}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSave={() => removeSpace()}
        // dataUnready={profile ? false : true}
        // isSaving={isSaving}
      >
        <VStack spacing={'2'}>
          <Text fontSize={'lg'} textColor={'gray.500'}>
            Are you sure you want to delete Space?
          </Text>
          <Text fontSize={'md'}>
            "{spaceData.title}" will be permanently removed.
          </Text>
        </VStack>
      </BasicModal>
    </>
  );
}

export default SpaceDeleteButton;
