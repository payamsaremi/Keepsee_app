import React, { useEffect, useState } from 'react';
import { Box, Divider, Text } from '@chakra-ui/react';
import ColumnInDetail from './ColumnInDetail';
import useSetState from '../../../hooks/useSetState';
import SnippetManager from '../../snippetManager';
import useQueryFromSupabase from '../../../hooks/useQueryFromSupabase';
function SpaceDetail({ data, setState }) {
  // const { data, setState } = useSetState();
  const column = data.columns['column-6'];
  console.log(column);
  const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
  const snippets = useQueryFromSupabase('snippets', '*');
  return (
    <>
      <Box display={'flex'} bg={'white'} rounded={'xl'}>
        <Box>
          <ColumnInDetail
            key={column.id}
            column={column}
            tasks={tasks}
            setState={setState}
            data={data}
          />
        </Box>
        <Divider orientation="vertical" />
        <Box>
          <Box m={3}>
            <Text fontSize={'2xl'} fontWeight={'semibold'} color={'gray.600'}>
              AI Research
            </Text>
          </Box>
          <SnippetManager snippets={snippets.data} />
        </Box>
      </Box>
    </>
  );
}

export default SpaceDetail;

//TODO: Make the page route location persist between reloads
