import React, { useEffect, useState } from 'react';
import Task from './Task';
import { Box, useColorModeValue, Text, Button } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import { cuteScrollbar } from '../../../../../../utils/cuteScrollbar';
import useColumn from '../../../hooks/useColumn';
import formattedDate from '../../utils/getFormattedDate';
function UnmanagedTabsColumn({ data, setState, unManagedTabs, spaceData }) {
  const { create } = useColumn(setState, data);
  const taskIds = Array();
  for (const item in unManagedTabs) {
    taskIds.push(item);
  }
  const tasks = taskIds.map((taskId) => {
    return unManagedTabs[taskId];
  });

  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    setIsHidden(tasks.length === 0 ? true : false);
  }, [unManagedTabs]);

  const createColumnByTabs = () => {
    const title = formattedDate();
    create(title, tasks);
  };
  // const isHidden = false;
  const bgColor = 'white';
  const column = { id: 'unManagedColumn', title: 'Unmanaged tabs' };
  return (
    <Box display={'flex'} flexDir={'row'}>
      <Box display={isHidden ? 'none' : 'block'} left={'12'} top={'16'}>
        <Box
          display={'flex'}
          flexDir={'row'}
          w={'xs'}
          maxW={'xs'}
          p={1}
          m={2}
          mt={3}
          rounded={'2xl'}
          ring={'1px'}
          ringColor={'green.300'}
          bgColor={useColorModeValue('gray.800', 'gray.800')}
        >
          <Droppable
            droppableId={'unManagedColumn'}
            type={'tasks'}
            isDropDisabled={true}
          >
            {(provided, snapshot) => (
              <Box
                display={'flex'}
                flexDir={'column'}
                w={'xs'}
                maxW={'xs'}
                rounded={'xl'}
                ref={provided.innerRef}
                {...provided.droppableProps}
                // sx={cuteScrollbar}
                // overflow={'auto'}
                // maxH={'85vh'}
                //TODO: Beautiful DND gives warning for having multiple scroll so migrating DnD to other library
              >
                <Box sx={cuteScrollbar} h={'100%'}>
                  <Box p={'2'}>
                    <Text
                      textColor={'gray.200'}
                      fontSize={'lg'}
                      fontWeight={'semibold'}
                    >
                      Unmanaged tabs
                    </Text>
                  </Box>
                  <Box
                    px={'2'}
                    py={'2'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Button
                      onClick={() => createColumnByTabs()}
                      fontSize={'sm'}
                    >
                      Create new session from {tasks.length} open tabs
                    </Button>
                  </Box>
                  <Box>
                    {/* {JSON.stringify(tasks)} */}
                    {tasks.map((task, index) => {
                      return (
                        <Task
                          key={task.url}
                          task={task}
                          index={index}
                          setState={setState}
                          data={data}
                          spaceData={spaceData}
                          // column={column}
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
    </Box>
  );
}

export default UnmanagedTabsColumn;
//1054
