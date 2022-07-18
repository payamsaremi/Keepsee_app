import React, { useEffect, useRef, useState } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { BasicPopOver } from '../../components/tabManager/components/BasicPopOver';
import BasicIconButton from '../../components/utils/BasicIconButton';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import MenuPopOver from '../tabManager/components/MenuPopOver';
import EmojiPicker from '../utils/EmojiPicker';
function EmojiPopOver({ setEmoji, emoji, isEmojiOpen, setIsEmojiOpen }) {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        rounded={'full'}
      >
        {/* <BasicIconButton  /> */}
        <Box>
          {emoji ? (
            <Box>
              <Text
                onClick={() => setIsEmojiOpen(!isEmojiOpen)}
                fontSize={'3xl'}
              >
                {emoji?.native}
              </Text>
            </Box>
          ) : (
            <BasicIconButton
              size={'md'}
              onClick={() => setIsEmojiOpen(!isEmojiOpen)}
              icon={<HiOutlineEmojiHappy size={'28'} />}
            />
          )}
        </Box>
        <MenuPopOver
          placement={'left'}
          isOpen={isEmojiOpen}
          setIsOpen={setIsEmojiOpen}
        >
          <EmojiPicker size={'16'} onEmojiSelect={setEmoji} />
        </MenuPopOver>
      </Box>
    </>
  );
}

export default EmojiPopOver;
