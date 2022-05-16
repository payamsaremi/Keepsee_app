import React from 'react';
import { Box } from '@chakra-ui/react';
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
          m={1}
          bgColor={'white'}
          ring={'1px'}
          ringColor={snapshot.isDragging ? 'blue.400' : 'gray.400'}
        >
          Task: {task.content}
        </Box>
      )}
    </Draggable>
  );
}

export default Task;
