import React from 'react';
import Task from './Task';
import { Box, Text } from '@chakra-ui/react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
function Column({ column, tasks, index }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          ref={provided.innerRef}
          bgColor={'white'}
          p={4}
          m={2}
          rounded={'md'}
        >
          <Text
            {...provided.dragHandleProps}
            mb={5}
            fontWeight={'bold'}
            fontSize={'lg'}
            textAlign={'center'}
          >
            {column.title}
          </Text>
          <Droppable droppableId={column.id} type={'tasks'}>
            {(provided, snapshot) => (
              <Box
                display={'flex'}
                flexDir={'column'}
                minH={'sm'}
                w={'md'}
                rounded={'md'}
                transition={'all'}
                transitionDuration={'0.3s'}
                bgColor={snapshot.isDraggingOver ? 'gray.200' : 'white'}
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
      )}
    </Draggable>
  );
}

export default Column;
