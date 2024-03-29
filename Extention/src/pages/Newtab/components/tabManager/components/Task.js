import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Image,
  useColorModeValue,
  IconButton
} from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import BasicPopOver from './BasicPopOver';
import useTab from '../../../hooks/useTab';
import { BiTrash, BiDotsVerticalRounded, BiNote, BiX } from 'react-icons/bi';
function Task({ task, index, setState, data, column, spaceData }) {
  const [mouseOver, setMouseOver] = useState();
  const IconColor = useColorModeValue('gray.500', 'gray.200');
  const [isOpenTab, setIsOpenTab] = useState(false);
  const { close, open, remove } = useTab(spaceData);

  const openTab = (task) => {
    open(task);
  };
  const removeTab = (task) => {
    close(task);
    remove(task);
  };
  return (
    <Draggable draggableId={task.url} index={index}>
      {(provided, snapshot) => (
        <Box>
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            p={2}
            m={'1'}
            rounded={'xl'}
            bgColor={useColorModeValue('gray.10', 'gray.900')}
            color={useColorModeValue('gray.500', 'gray.400')}
            cursor={'pointer'}
            border="1px"
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
                  </BasicPopOver>
                </Box>
              ) : (
                <Box p={4}></Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
}

export default Task;
