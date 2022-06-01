import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import DetailModal from '../editor/DetailModal';
function SnippetCard({ snippet }) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <DetailModal data={snippet} opened={opened} setOpened={setOpened} />
      <Box
        display={'flex'}
        flexDir={'column'}
        justifyContent={'space-between'}
        rounded={'2xl'}
        cursor={'pointer'}
        h={'250px'}
        p={'6'}
        m={'3'}
        color={'black'}
        bg={'gray.50'}
        onClick={() => {
          setOpened(true);
        }}
      >
        <Box>
          <Text fontWeight={'normal'} fontSize={'xl'} noOfLines={5}>
            {snippet.content}
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default SnippetCard;
