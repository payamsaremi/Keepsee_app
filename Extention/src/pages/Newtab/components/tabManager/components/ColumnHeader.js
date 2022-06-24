import React, { useEffect, useState } from 'react';
import { Box, ScaleFade, Text, useColorModeValue } from '@chakra-ui/react';
import ColumnSettingsMenu from './ColumnSettingsMenu';
import MenuPopOver from './MenuPopOver';
const ColumnHeader = ({
  column,
  tasks,
  mouseOver,
  setState,
  data,
  showSettings,
  setShowSettings,
}) => {
  const [color, setColor] = useState(column.color ? column.color : 'gray');
  const [title, setTitle] = useState(column.title);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setColor(column.color ? column.color : '');
  }, [column.color]);

  useEffect(() => {
    setTitle(column.title ? column.title : '');
  }, [column.title]);

  //if its a newly created column set the menu open so user can change title and personalise
  useEffect(() => {
    if (column.title === '') {
      setIsOpen(true);
    }
  }, []);
  return (
    <>
      <Box
        bgColor={useColorModeValue(`${color}.100`, `${color}.900`)}
        display={'flex'}
        flexDir={'row'}
        minH={'10px'}
        alignItems={'center'}
        rounded={'xl'}
        w={'xs'}
        minW={'xs'}
        justifyContent={'space-between'}
        border={'1px'}
        borderColor={`${color}.300`}
        m={2}
        px={2}
        mb={'3'}
      >
        <Box
          display={'flex'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'start'}
        >
          <Box
            display={'flex'}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            py={'1'}
            cursor={'pointer'}
            // minW={'150px'}
          >
            <Box mx={'1'} onClick={() => setIsOpen(!isOpen)}>
              <Text fontSize={'2xl'}>{column?.emoji?.native}</Text>
            </Box>
            {/* {isOpen} */}
            <MenuPopOver
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              color={color}
              title={column.title}
            >
              {/* Change title toggle */}
              <ColumnSettingsMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                showSettings={showSettings}
                setShowSettings={setShowSettings}
                column={column}
                setState={setState}
                data={data}
                setColor={setColor}
                color={color}
                setTitle={setTitle}
                title={title}
              />
            </MenuPopOver>
          </Box>
        </Box>

        <Box>
          {tasks && (
            <Box
              bgColor={useColorModeValue(`${color}.100`, `${color}.800`)}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              rounded={'lg'}
              cursor={'pointer'}
              transition={'all'}
              transitionDuration={'0.1s'}
              _hover={{
                transform: 'scale(1.2)',
                bgColor: useColorModeValue(`${color}.300`, `${color}.600`),
                color: useColorModeValue(`${color}.50`, `${color}.200`),
              }}
              color={`${color}.500`}
              p={'3'}
              w={'5'}
              h={'5'}
            >
              <Text fontSize={'sm'} fontWeight={'semibold'}>
                {tasks && tasks.length}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ColumnHeader;
