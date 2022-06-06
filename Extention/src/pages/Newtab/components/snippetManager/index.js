import React from 'react';
import SnippetCard from './SnippetCard';
import { SimpleGrid, Box } from '@chakra-ui/react';
function SnippetManager({ snippets }) {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {/* <Box></Box> */}
        <Box maxH={'91vh'} overflow={'auto'}>
          <SimpleGrid columns={[1, null, 3]}>
            {snippets &&
              snippets.map((snippet, index) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}

export default SnippetManager;
