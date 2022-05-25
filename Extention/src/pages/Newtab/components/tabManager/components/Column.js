import React, { useState } from 'react';
import Task from './Task';
import {
  Box,
  ScaleFade,
  IconButton,
  Text,
  Editable,
  EditablePreview,
  EditableInput,
  Button,
} from '@chakra-ui/react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { cuteScrollbar } from '../../../../../../utils/cuteScrollbar';
import { BiExpand, BiDotsVerticalRounded } from 'react-icons/bi';
import { MdDragIndicator } from 'react-icons/md';
// import ActionMenu from '../components/ActionMenu'
function Column({ column, tasks, index, removeColumn }) {
  const bgColor = column.color ? `${column.color}.300` : 'white';

  const [mouseOver, setMouseOver] = useState();
  const mouseOverColumn = (column) => {
    setMouseOver(column.id);
  };

  const openWorkspace = (urls) => {
    const tabsUrls = [];
    const tabs = [];
    const tabIds = [];
    tasks.forEach((tab) => {
      tabsUrls.push(tab.url);
      tabs.push(tab);
      tabIds.push(tab.id);
    });
    let openTab = chrome.runtime.sendMessage({
      message: 'openWorkspace',
      tabIds: tabIds,
      tab: tabsUrls,
      tabs: tabs,
    });
    openTab.then((res) => {
      console.log(res);
    });
  };
  //TODO: Make it so that user can create new columns easily with editable title or color and add tabs into the columns.
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Box
          onMouseEnter={() => mouseOverColumn(column)}
          onMouseLeave={() => mouseOverColumn({})}
          //   opacity={mouseOver ? '' : '0.5'}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          p={4}
          m={2}
          rounded={'xl'}
          ring={'2px'}
          ringColor={bgColor}
          bgColor={'white'}
          shadow={'sm'}
        >
          <Box
            display={'flex'}
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            m={2}
            mb={5}
          >
            <Box
              display={'flex'}
              flexDir={'row'}
              alignItems={'center'}
              justifyContent={'start'}
            >
              <Box
                bgColor={'gray.400'}
                rounded={'xl'}
                px={'3'}
                py={'1'}
                minH={'40px'}
                minW={'100px'}
                display={'flex'}
                flexDir={'row'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Editable defaultValue={column.title}>
                  <EditablePreview
                    textColor={'white'}
                    fontWeight={'bold'}
                    fontSize={'lg'}
                    textAlign={'center'}
                  />
                  <EditableInput />
                </Editable>
              </Box>

              {tasks && tasks.length > 0 && (
                <Box
                  bgColor={'gray.100'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  rounded={'full'}
                  cursor={'default'}
                  mx={2}
                  p={'4'}
                  w={'5'}
                  h={'5'}
                >
                  <Text
                    fontSize={'sm'}
                    textColor={'gray.600'}
                    fontWeight={'semibold'}
                  >
                    {tasks && tasks.length}
                  </Text>
                </Box>
              )}
            </Box>
            <ScaleFade initialScale={0.2} in={column.id === mouseOver}>
              <Box justifyContent={'end'}>
                {column.id === mouseOver ? (
                  <>
                    <IconButton
                      onClick={() => openWorkspace(column)}
                      color={'gray.600'}
                      size={'sm'}
                      colorScheme={'gray'}
                      icon={<BiExpand size={'18px'} />}
                      rounded={'full'}
                    />
                  </>
                ) : (
                  <></>
                )}
              </Box>
            </ScaleFade>
          </Box>
          <Droppable droppableId={column.id} type={'tasks'}>
            {(provided, snapshot) => (
              <Box
                display={'flex'}
                flexDir={'column'}
                h={'2xl'}
                minH={'sm'}
                w={'md'}
                rounded={'md'}
                transition={'all'}
                transitionDuration={'0.3s'}
                bgColor={snapshot.isDraggingOver ? 'gray.200' : 'white'}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Box overflow={'auto'} h={'100%'}>
                  <Box>
                    {tasks.map((task, index) => {
                      return <Task key={task.id} task={task} index={index} />;
                    })}

                    {provided.placeholder}
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
                        minW={'sm'}
                        variant={'solid'}
                      >
                        Delete Column
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  );
}

export default Column;
//1054
