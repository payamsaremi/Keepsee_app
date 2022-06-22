import React, { useState } from 'react';
import Task from './Task';
import { Box, Button, IconButton, useColorModeValue } from '@chakra-ui/react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { cuteScrollbar } from '../../../../../../utils/cuteScrollbar';
import ColumnHeader from './ColumnHeader';

function Column({
  column,
  setState,
  data,
  tasks,
  index,
  removeColumn,
  isHidden,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [mouseOver, setMouseOver] = useState('');
  const [collapseColumn, setCollapseColumn] = useState(false);
  const bgColor = column.color ? `${column.color}.300` : 'white';

  const mouseOverColumn = (column) => {
    setMouseOver(column.id);
  };

  //TODO: User want to be able to assign a name for the newly created column
  return (
    <Box display={isHidden && 'none'}>
      <Draggable draggableId={column.id} index={index}>
        {(provided, snapshot) => (
          <Box
            onMouseEnter={() => mouseOverColumn(column)}
            onMouseLeave={() => mouseOverColumn({})}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Box {...provided.dragHandleProps}>
              <ColumnHeader
                column={column}
                tasks={tasks}
                setState={setState}
                data={data}
                mouseOver={mouseOver}
                showSettings={showSettings}
                setShowSettings={setShowSettings}
                setCollapseColumn={() => setCollapseColumn(!collapseColumn)}
              />
            </Box>

            <Box
              display={collapseColumn ? 'none' : 'flex'}
              w={'xs'}
              maxW={'xs'}
              p={1}
              m={2}
              rounded={'2xl'}
              ringColor={bgColor}
              ring={useColorModeValue(
                column.id === 'column-1' ? '5px' : 'none',
                column.id === 'column-1' ? '1px' : '1px'
              )}
              bgColor={useColorModeValue(
                column.id === 'column-1' ? 'gray.800' : 'gray.100',
                column.id === 'column-1' ? 'gray.400' : 'gray.800'
              )}
              opacity={snapshot.isDragging ? `0.5` : `1`}
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
                      snapshot.isDraggingOver
                        ? `${column.color}.50`
                        : 'inherit',
                      snapshot.isDraggingOver
                        ? `${column.color}.500`
                        : 'inherit'
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
                      <Box
                        display={'flex'}
                        alignItems={'end'}
                        justifyContent={'center'}
                        my={'5'}
                      >
                        {tasks.length === 0 && column.id !== 'column-1' && (
                          <Button
                            onClick={() => removeColumn(column.id)}
                            variant={'solid'}
                          >
                            Delete Column
                          </Button>
                        )}
                      </Box>
                    </Box>

                    <Box
                      display={'flex'}
                      h={'45px'}
                      justifyContent={'end'}
                      alignItems={'end'}
                    >
                      {mouseOver && (
                        <Box>
                          {/* <IconButton
                            onClick={() => setShowSettings(!showSettings)}
                            _focus={{ boxShadow: 'none' }}
                            color={'gray.400'}
                            rounded={'lg'}
                            variant={'ghost'}
                            icon={<BiCog size={25} />}
                          /> */}
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
              </Droppable>
            </Box>
          </Box>
        )}
      </Draggable>
    </Box>
  );
}

export default Column;
//1054
