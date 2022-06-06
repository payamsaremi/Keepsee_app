import React, { useEffect, useState } from 'react';
import { Box, Divider, Text } from '@chakra-ui/react';
import ColumnInDetail from '../tabManager/components/ColumnInDetail';
import useSetState from '../../hooks/useSetState';
import SnippetManager from '../snippetManager';
import useQueryFromSupabase from '../../hooks/useQueryFromSupabase';
import { useLocation } from 'react-router-dom';
function SpaceDetail({ data, setState }) {
  const location = useLocation();
  const { columnId } = location.state;
  console.log(columnId);
  const column = data.columns[columnId];
  console.log(column);
  const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
  const snippets = useQueryFromSupabase('snippets', '*');
  return (
    <>
      <Box display={'flex'} rounded={'xl'}>
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
        {/* <Box w={'100vw'}></Box> */}
        {/* <Box>
          <SnippetManager snippets={snippets.data} />
        </Box> */}
      </Box>
    </>
  );
}

export default SpaceDetail;

//TODO: Make the page route location persist between reloads
