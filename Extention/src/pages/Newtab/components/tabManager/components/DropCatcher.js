import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
function Column() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'start'}
      h={'100%'}
    >
      <Droppable droppableId={'catcher'} type={'tasks'}>
        {(provided, snapshot) => (
          <Box
            p={4}
            m={2}
            display={'flex'}
            flexDir={'column'}
            rounded={'2xl'}
            w={'xs'}
            h={'xs'}
            bgColor={
              snapshot.isDraggingOver
                ? useColorModeValue(`gray.100`, `gray.700`)
                : useColorModeValue(`white`, `gray.800`)
            }
            boxShadow="inner"
            ring={'1px'}
            ringColor={'white'}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Box
              display={'flex'}
              minH={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              {snapshot.isDraggingOver ? (
                ''
              ) : (
                <Text
                  w={'200px'}
                  textAlign={'center'}
                  color={'gray.300'}
                  fontSize={'xl'}
                  fontWeight={'thin'}
                  lineHeight={'1'}
                >
                  Drop here to create a new Space.
                </Text>
              )}

              {provided.placeholder}
            </Box>
          </Box>
        )}
      </Droppable>
    </Box>
  );
}

export default Column;
//1054
