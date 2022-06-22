import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
function Column() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'start'}
      mt={'14'}
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
            // transition={'all'}
            // transitionDuration={'0.5s'}
            w={'xs'}
            h={snapshot.isDraggingOver ? '2xl' : '200px'}
            bgColor={snapshot.isDraggingOver ? 'white' : 'gray.100'}
            bgGradient="linear(to-r, gray.50, white, gray.50)"
            boxShadow="inner"
            ring={snapshot.isDraggingOver ? '4px' : '0'}
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
                  color={'gray.500'}
                  fontSize={'lg'}
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
