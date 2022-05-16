import React, { useEffect, useState } from 'react';
import SnippetCard from './components/SnippetCard';
import GroupCard from './components/GroupCard';

import { supabase } from '../../supabaseClient';

import { Box } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { SimpleGrid, IconButton, GridItem, Grid } from '@chakra-ui/react';

import EditablePage from './components/editor/editablePage';
import Editor from './components/editor/Editor';
import Dashboard from './components/dashboard/dashboard';
import TabManager from './components/tabManager';
import { BiTask, BiHighlight, BiNetworkChart, BiNote } from 'react-icons/bi';
function Newtab() {
  const [snippets, setSnippets] = useState();

  useEffect(() => {
    getSnippets();
  }, []);

  const getSnippets = async () => {
    try {
      let { data, error } = await supabase.from('snippets').select('*');
      setSnippets(data);
      console.log('data', data);
    } catch (err) {
      console.log(err);
    }
  };

  const navItems = [
    {
      name: 'Nuggets',
      icon: <BiHighlight size={25} />,
      link: '/dashboard/events',
      isActive: true,
    },
    {
      name: 'Notes',
      icon: <BiNote size={25} />,
      link: '/dashboard/audience',
      isActive: false,
    },
    {
      name: 'Settings',
      icon: <BiTask size={25} />,
      link: '/dashboard//settings',
      isActive: false,
    },
    {
      name: 'Tasks',
      icon: <BiNetworkChart size={25} />,
      link: '/dashboard/insights',
      isActive: false,
    },
  ];

  return (
    <ChakraProvider>
      <Box
        display={'flex'}
        bg={'gray.100'}
        h={'100vh'}
        flexDir={'column'}
        overflow={'hidden'}
      >
        <Box
          display={'flex'}
          w={'100vw'}
          h={'60px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            rounded={'full'}
            mt={'5'}
            mb={'5'}
          >
            {navItems &&
              navItems.map((items) => (
                <IconButton
                  key={items.name}
                  m={'1'}
                  colorScheme={'gray'}
                  aria-label="Call Segun"
                  variant={'link'}
                  size="md"
                  icon={items.icon}
                  isActive={items.isActive}
                  isRound
                />
              ))}
          </Box>
        </Box>
        <Grid templateColumns="repeat(4, 1fr)">
          <GridItem colSpan={1}>
            <TabManager />
          </GridItem>

          {/* <GridItem colStart={2} colEnd={5}>
            <Box>
              <SimpleGrid columns={[1, null, 3]}>
                {snippets &&
                  snippets.map((snippet) => (
                    <SnippetCard key={snippet.id} snippet={snippet} />
                  ))}
              </SimpleGrid>
            </Box>
          </GridItem> */}
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default Newtab;
