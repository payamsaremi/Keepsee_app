import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Image,
  Fade,
  useColorModeValue,
  IconButton
} from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import BasicPopOver from './BasicPopOver';
import { BiTrash, BiDotsVerticalRounded, BiNote } from 'react-icons/bi';
function Task({ task, index, setState, data, column, spaceData }) {
  const [mouseOver, setMouseOver] = useState();
  const IconColor = useColorModeValue('gray.500', 'gray.200');

  const openTab = (task) => {
    chrome.tabs.create({ url: task.url, active: false }, (t) => {
      console.log(t);
    });
    console.log('tab opener', task);
  };
  const removeTab = (task) => {
    console.log('gonna remove this', task);
    chrome.runtime.sendMessage({
      message: 'removeTab',
      url: task.url,
      tabId: task.id
    });
    //Remove the task from its column taskIds
    const colIds = Array.from(spaceData.columnOrder);
    const columns = spaceData.columns;
    colIds.forEach((colId) => {
      const taskIds = columns[colId].taskIds;
      taskIds.forEach((taskId) => {
        if (taskId === task.url) {
          const index = columns[colId].taskIds.indexOf(taskId);
          columns[colId].taskIds.splice(index, 1);
          // also remove it from tasks
          const tasks = spaceData.tasks;
          delete tasks[task.url];
          //update the state
          const state = {
            ...data,
            spaces: {
              ...data.spaces,
              [spaceData.id]: {
                ...spaceData,
                columns,
                tasks: tasks
              }
            }
          };
          setState(state);
          return;
        }
      });
    });
  };
  return (
    <Draggable draggableId={task.url} index={index}>
      {(provided, snapshot) => (
        <>
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            p={2}
            m={1}
            rounded={'xl'}
            bgColor={useColorModeValue('gray.10', 'gray.900')}
            color={useColorModeValue('gray.500', 'gray.400')}
            cursor={'pointer'}
            border="1px"
            borderColor="gray.200"
            borderStyle={snapshot.isDragging ? 'dashed' : 'hidden'}
            onMouseEnter={() => {
              setMouseOver(true);
            }}
            onMouseLeave={() => {
              setMouseOver(false);
            }}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box
                display={'flex'}
                justifyContent={'start'}
                alignItems={'center'}
                onClick={() => {
                  openTab(task);
                }}
              >
                <Image
                  mr={'2'}
                  src={task.favIconUrl}
                  fallbackSrc={
                    'https://media.istockphoto.com/photos/daisy-on-a-white-background-picture-id890573264?b=1&k=20&m=890573264&s=170667a&w=0&h=VV20bmLDeWs-Oxga3GSOLV2h48-1IoTSYer5__2AglM='
                  }
                  rounded={'full'}
                  boxSize="30px"
                  objectFit="cover"
                />
                <Text fontSize={'md'} overflowWrap={'anywhere'}>
                  {task.title}
                </Text>
              </Box>
              {mouseOver ? (
                <Box>
                  {/* <BasicPopOver task={task} removeTab={removeTab} /> */}
                  <BasicPopOver Icon={<BiDotsVerticalRounded size={'20'} />}>
                    <IconButton
                      _focus={{ boxShadow: 'none' }}
                      onClick={() => removeTab(task)}
                      variant={'solid'}
                      size={'sm'}
                      color={IconColor}
                      rounded={'lg'}
                      icon={<BiTrash size={'20'} />}
                    />
                    <IconButton
                      ml={'2'}
                      _focus={{ boxShadow: 'none' }}
                      onClick={() => console.log('remove tab from space')}
                      variant={'solid'}
                      size={'sm'}
                      color={IconColor}
                      rounded={'lg'}
                      icon={<BiNote size={'20'} />}
                    />
                  </BasicPopOver>
                </Box>
              ) : (
                <Box p={4}></Box>
              )}
            </Box>
          </Box>
        </>
      )}
    </Draggable>
  );
}

export default Task;
