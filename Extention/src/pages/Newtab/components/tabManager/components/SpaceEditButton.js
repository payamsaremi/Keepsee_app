import React, { useEffect, useState } from 'react';
import { BiDotsVerticalRounded, BiEdit, BiEditAlt } from 'react-icons/bi';
import BasicIconButton from '../../utils/BasicIconButton';

import { FormControl, VStack, FormLabel, Input, Box } from '@chakra-ui/react';

import BasicModal from '../../modal/BasicModal';
import useSpace from '../../../hooks/useSpace';
import EmojiPopOver from '../../utils/EmojiPopOver';
import ColorPicker from '../../utils/ColorPicker';

function SpaceEditButton({ spaceData }) {
  const { update } = useSpace();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [color, setColor] = useState(
    spaceData.color ? spaceData.color : 'gray'
  );

  const [emoji, setEmoji] = useState(spaceData?.emoji ? spaceData.emoji : '');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const emojiSetter = (value) => {
    setEmoji(value);
    setIsEmojiOpen(false);
  };
  useEffect(() => {
    setTitle(spaceData.title);
    setEmoji(spaceData.emoji);
    setColor(spaceData.color);
    setDateCreated(spaceData.dateCreated);
  }, [spaceData]);

  const saveChanges = () => {
    const editedSpace = {
      ...spaceData,
      title,
      emoji,
      color
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
          <Box>
            <EmojiPopOver
              setEmoji={emojiSetter}
              emoji={emoji}
              isEmojiOpen={isEmojiOpen}
              setIsEmojiOpen={setIsEmojiOpen}
            />
          </Box>
          <FormControl>
            <ColorPicker
              color={color}
              setColor={setColor}
              // saveColumnSettings={() => saveChanges()}
            />
          </FormControl>
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
