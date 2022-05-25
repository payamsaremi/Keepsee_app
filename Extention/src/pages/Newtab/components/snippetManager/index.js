import React from 'react';
import SnippetCard from './SnippetCard';
import { SimpleGrid, Box } from '@chakra-ui/react';
function SnippetManager({ snippets }) {
  return (
    <>
      <Box>
        <SimpleGrid columns={[1, null, 3]}>
          {snippets &&
            snippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default SnippetManager;
