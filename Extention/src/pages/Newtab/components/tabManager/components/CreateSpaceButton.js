import { FormControl, VStack, FormLabel, Input, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { useAuth } from '../../../hooks/Auth';
import BasicModal from '../../modal/BasicModal';
import BasicIconButton from '../../utils/BasicIconButton';
import EmojiPopOver from '../../utils/EmojiPopOver';
import ColorPicker from '../../utils/ColorPicker';
export default function CreateSpaceButton({ create, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const { user, loading } = useAuth();
  const [color, setColor] = useState('gray');
  const emojiSetter = (value) => {
    setEmoji(value);
    setIsEmojiOpen(false);
    setColor(color);
  };

  const createSpace = () => {
    create(title, emoji, color);
    setIsOpen(false);
    setTitle('');
    setEmoji('');
  };

  return (
    <>
      <BasicIconButton
        onClick={() => setIsOpen(!isOpen)}
        icon={<BiPlus size={'18'} />}
      />
      {/* //* Modal for creating new Space */}
      <BasicModal
        title={'Create a new space'}
        buttonTitle={'Create'}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSave={() => createSpace()}
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
