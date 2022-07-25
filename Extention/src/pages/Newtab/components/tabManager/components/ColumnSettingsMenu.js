import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Text,
  Input,
  Box,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import ColorPicker from '../../utils/ColorPicker';
import EmojiPopOver from '../../utils/EmojiPopOver';

function ColumnSettingsMenu({
  column,
  setState,
  data,
  setIsOpen,
  isOpen,
  setColor,
  color,
  title,
  setTitle,
  spaceData
}) {
  const [emoji, setEmoji] = useState(column?.emoji ? column.emoji : '');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const emojiSetter = (value) => {
    setEmoji(value);
    setIsEmojiOpen(false);
  };

  const dataSetter = (column) => {
    const state = {
      ...data,
      spaces: {
        ...data.spaces,
        [spaceData.id]: {
          ...spaceData,
          columns: {
            ...spaceData.columns,
            [column.id]: {
              ...spaceData.columns[column.id],
              title: title,
              color: color,
              emoji: emoji
            }
          }
        }
      }
    };
    setState(state);
    return state;
  };
  const saveColumnSettings = (column) => {
    dataSetter(column);
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Box display={'flex'} flexDir={'column'}>
        <Box
          display={'flex'}
          flexDir={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box>
            <EmojiPopOver
              setEmoji={emojiSetter}
              emoji={emoji}
              isEmojiOpen={isEmojiOpen}
              setIsEmojiOpen={setIsEmojiOpen}
            />
          </Box>
          <FormControl>
            {/* <FormLabel>Name</FormLabel> */}
            <Input
              variant="filled"
              placeholder={'Give it a name'}
              value={title}
              _placeholder={useColorModeValue(
                { color: 'gray.500' },
                { color: 'gray.300' }
              )}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  saveColumnSettings(column);
                }
              }}
            />
          </FormControl>
        </Box>

        <FormControl>
          <ColorPicker
            color={color}
            setColor={setColor}
            saveColumnSettings={() => saveColumnSettings(column)}
          />
        </FormControl>
        <Button
          mt={'2'}
          bgColor={useColorModeValue(`${color}.400`, `${color}.700`)}
          color={`${color}.50`}
          _hover={{ bgColor: `${color}.500` }}
          rounded={'xl'}
          onClick={() => {
            saveColumnSettings(column);
          }}
        >
          Save
        </Button>
      </Box>
    </>
  );
}

export default ColumnSettingsMenu;
