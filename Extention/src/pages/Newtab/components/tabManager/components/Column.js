import React from 'react';
import Task from './Task';
import { Box, Text } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
function Column({ column, tasks }) {
  return (
    <Box>
      <Text fontWeight={'bold'} textAlign={'center'}>
        {column.title}
      </Text>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Box
            display={'flex'}
            flexDir={'column'}
            p={2}
            m={2}
            minH={'sm'}
            w={'md'}
            ring={'1px'}
            ringColor={'gray.400'}
            transition={'all'}
            transitionDuration={'0.3s'}
            bgColor={snapshot.isDraggingOver ? 'blue.100' : 'gray.50'}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              {tasks.map((task, index) => {
                return <Task key={task.id} task={task} index={index} />;
              })}
              {provided.placeholder}
            </div>
          </Box>
        )}
      </Droppable>
    </Box>
  );
}

export default Column;
