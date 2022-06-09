import React, { useEffect, useState } from 'react';
import { Box, ScaleFade, IconButton, Text } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { BiExpand, BiPlus } from 'react-icons/bi';
const ColumnHeader = ({ column, tasks, mouseOver, setCollapseColumn }) => {
  const [color, setColor] = useState(column.color ? column.color : 'cyan');
  useEffect(() => {
    setColor(column.color ? column.color : 'cyan');
  }, [column.color]);
  return (
    <>
      <Box
        bgColor={`${color}.100`}
        display={'flex'}
        flexDir={'row'}
        minH={'10px'}
        alignItems={'center'}
        rounded={'xl'}
        w={'xs'}
        minW={'xs'}
        justifyContent={'space-between'}
        border={'1px'}
        borderColor={`${color}.200`}
        m={2}
        px={2}
      >
        <Box>
          {tasks && (
            <Box
              bgColor={`${color}.100`}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              rounded={'lg'}
              p={'4'}
              w={'5'}
              h={'5'}
            >
              <Text
                fontSize={'sm'}
                textColor={`${color}.500`}
                fontWeight={'semibold'}
              >
                {tasks && tasks.length}
              </Text>
            </Box>
          )}
        </Box>
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
            px={'3'}
            py={'1'}
            onClick={setCollapseColumn}
            minW={'150px'}
          >
            <Text
              textColor={`${color}.500`}
              fontWeight={'bold'}
              fontSize={'lg'}
              textAlign={'center'}
              p={1}
            >
              {column.title}
            </Text>
          </Box>
        </Box>
        <ScaleFade initialScale={0.2} in={column.id === mouseOver}>
          <Box justifyContent={'end'}>
            {column.id === mouseOver ? (
              <>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    color={`${color}.500`}
                    size={'sm'}
                    icon={<BiPlus size={'22px'} />}
                    rounded={'lg'}
                    variant={'ghost'}
                  ></MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => openWorkspace(column)}
                      icon={<BiExpand size="18" />}
                      minH="28px"
                      my={'0'}
                    >
                      <Text fontSize={'md'} textColor={'gray.600'}>
                        Open Space
                      </Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Box px={'4'}></Box>
            )}
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default ColumnHeader;
