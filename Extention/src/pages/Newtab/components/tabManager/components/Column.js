import React, { useState } from 'react';
import Task from './Task';
import { Box, Button, IconButton, Fade } from '@chakra-ui/react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { cuteScrollbar } from '../../../../../../utils/cuteScrollbar';
import ColumnSettingsMenu from './ColumnSettingsMenu';
import ColumnHeader from './ColumnHeader';
import { BiAdjust, BiCog } from 'react-icons/bi';
// import ActionMenu from '../components/ActionMenu'
function Column({ column, setState, data, tasks, index, removeColumn }) {
  const bgColor = column.color ? `${column.color}.300` : 'white';

  const [showSettings, setShowSettings] = useState(false);

  const [mouseOver, setMouseOver] = useState();
  const mouseOverColumn = (column) => {
    setMouseOver(column.id);
  };
  const [collapseColumn, setCollapseColumn] = useState(false);

  const openWorkspace = (urls) => {
    const tabsUrls = [];
    const tabs = [];
    const tabIds = [];
    tasks.forEach((tab) => {
      tabsUrls.push(tab.url);
      tabs.push(tab);
      tabIds.push(tab.id);
    });
    console.log('tabsUrls', tabsUrls);
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
  //TODO: User want to be able to assign a name for the newly created column
  return (
    <Box>
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
                mouseOver={mouseOver}
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
              bgColor={'white'}
              opacity={snapshot.isDragging ? `0.7` : `1`}
            >
              <Droppable droppableId={column.id} type={'tasks'}>
                {(provided, snapshot) => (
                  <Box
                    display={'flex'}
                    flexDir={'column'}
                    // minH={'sm'}
                    w={'xs'}
                    maxW={'xs'}
                    rounded={'2xl'}
                    transition={'all'}
                    transitionDuration={'0.3s'}
                    bgColor={
                      snapshot.isDraggingOver ? `${column.color}.50` : 'inherit'
                    }
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Box sx={cuteScrollbar} h={'100%'}>
                      <Box>
                        {tasks.map((task, index) => {
                          return (
                            <Task key={task.id} task={task} index={index} />
                          );
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
                            variant={'solid'}
                          >
                            Delete Column
                          </Button>
                        )}
                      </Box>
                    </Box>

                    <ColumnSettingsMenu
                      showSettings={showSettings}
                      setShowSettings={setShowSettings}
                      column={column}
                      setState={setState}
                      data={data}
                    />

                    <Box
                      display={'flex'}
                      h={'45px'}
                      justifyContent={'end'}
                      alignItems={'end'}
                    >
                      {mouseOver && (
                        <Box>
                          <IconButton
                            onClick={() => setShowSettings(!showSettings)}
                            _focus={{ boxShadow: 'none' }}
                            color={'gray.400'}
                            rounded={'lg'}
                            variant={'ghost'}
                            icon={<BiCog size={25} />}
                          />
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
