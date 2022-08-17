import React, { useState } from 'react';
import Task from './Task';
import {
  Box,
  Button,
  IconButton,
  useColorModeValue,
  Text,
  HStack
} from '@chakra-ui/react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { cuteScrollbar } from '../../../../../../utils/cuteScrollbar';
import ColumnHeader from './ColumnHeader';
import { BiCog, BiPlus } from 'react-icons/bi';
import { Note } from 'tabler-icons-react';
import BasicIconButton from '../../utils/BasicIconButton';
import AddToColumnButton from './AddToColumnButton';

function Column({
  column,
  setState,
  data,
  index,
  removeColumn,
  isHidden,
  spaceData
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [mouseOver, setMouseOver] = useState('');
  const [collapseColumn, setCollapseColumn] = useState(false);
  const bgColor = column.color ? `${column.color}.300` : 'white';
  const tasks = column.taskIds.map((taskId) => spaceData.tasks[taskId]);
  const bgGradient = useColorModeValue(
    `radial(${column.color}.50, ${column.color}.200)`,
    `radial(${column.color}.400, ${column.color}.500)`
  );
  const mouseOverColumn = (column) => {
    setMouseOver(column.id);
  };

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
                spaceData={spaceData}
                mouseOver={mouseOver}
                showSettings={showSettings}
                setShowSettings={setShowSettings}
                setCollapseColumn={() => setCollapseColumn(!collapseColumn)}
                isLaunchable={true}
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
              ring={useColorModeValue('none', 'none')}
              bgColor={useColorModeValue('white', 'gray.800')}
              bgGradient={tasks.length === 0 ? bgGradient : 'none'}
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
                    // sx={cuteScrollbar}
                    // overflow={'auto'}
                    // maxH={'70vh'}
                    //TODO: Beautiful DND gives warning for having multiple scroll so migrating DnD to other library
                  >
                    <Box>
                      <Box pb={'4'}>
                        {tasks.map((task, index) => {
                          return (
                            <Task
                              key={task.url}
                              task={task}
                              index={index}
                              setState={setState}
                              data={data}
                              column={column}
                              spaceData={spaceData}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </Box>

                      <Box>
                        {tasks.length === 0 && (
                          <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            mb={'12'}
                          >
                            <Text fontSize={'lg'} mb={'5'}>
                              Drop something here
                            </Text>
                            <Button
                              onClick={() => removeColumn(column.id)}
                              variant={'solid'}
                            >
                              Delete Column
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    {/* <AddToColumnButton mouseOver={mouseOver} /> */}
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
