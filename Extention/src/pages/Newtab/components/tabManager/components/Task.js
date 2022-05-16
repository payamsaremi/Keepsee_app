import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          p={2}
          m={2}
          rounded={'md'}
          bgColor={'gray.50'}
          cursor={'pointer'}
          ring={'0.5px'}
          transition={'all'}
          transitionDuration={'0.2s'}
          ringColor={snapshot.isDragging ? 'blue.400' : 'gray.400'}
          //   _hover={{ ring: '3px' }}
        >
          <Text fontSize={'lg'}>{task.content}</Text>
        </Box>
      )}
    </Draggable>
  );
}

export default Task;
