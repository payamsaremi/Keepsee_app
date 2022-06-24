import React from 'react';
import Task from './Task';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { cuteScrollbar } from '../../../../../../utils/cuteScrollbar';
import ColumnHeader from './ColumnHeader';

import { useAuth } from '../../../hooks/Auth';

function UnmanagedTabsColumn() {
  const { data, setState } = useAuth();
  const column = data.columns['column-1'];
  const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
  const isHidden = tasks.length === 0;
  const bgColor = 'white';
  return (
    <Box display={isHidden ? 'none' : 'block'}>
      <ColumnHeader
        column={column}
        tasks={tasks}
        setState={setState}
        data={data}
      />
      <Box
        display={'flex'}
        w={'xs'}
        maxW={'xs'}
        p={1}
        m={2}
        rounded={'2xl'}
        ringColor={bgColor}
        bgColor={useColorModeValue(
          column.id === 'column-1' ? 'gray.800' : 'gray.100',
          column.id === 'column-1' ? 'gray.400' : 'gray.800'
        )}
      >
        <Droppable droppableId={column.id} type={'tasks'}>
          {(provided, snapshot) => (
            <Box
              display={'flex'}
              flexDir={'column'}
              w={'xs'}
              maxW={'xs'}
              rounded={'xl'}
              bgColor={useColorModeValue(
                snapshot.isDraggingOver ? `${column.color}.50` : 'inherit',
                snapshot.isDraggingOver ? `${column.color}.500` : 'inherit'
              )}
              bgGradient={useColorModeValue(
                snapshot.isDraggingOver
                  ? `radial(${column.color}.50, ${column.color}.50, ${column.color}.50)`
                  : 'inherit',
                snapshot.isDraggingOver
                  ? `radial(${column.color}.400, ${column.color}.500, ${column.color}.400)`
                  : 'inherit'
              )}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Box sx={cuteScrollbar} h={'100%'}>
                <Box>
                  {tasks.map((task, index) => {
                    return (
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                        setState={setState}
                        data={data}
                        column={column}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Box>
                <Box>
                  <Box w={'full'} p={'1'}></Box>
                </Box>
              </Box>
            </Box>
          )}
        </Droppable>
      </Box>
    </Box>
  );
}

export default UnmanagedTabsColumn;
//1054
