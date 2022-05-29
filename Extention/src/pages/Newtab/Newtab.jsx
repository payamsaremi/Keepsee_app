import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Box, Center } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { GridItem, Grid } from '@chakra-ui/react';
import TabManager from './components/tabManager';
import { BiTask, BiHighlight, BiNetworkChart, BiWindows } from 'react-icons/bi';
import Navbar from './components/navbar';
import SnippetManager from './components/snippetManager';
import EditablePage from './components/editor/editablePage';
import Editor from './components/editor/Editor';
import Dashboard from './components/dashboard/dashboard';

function Newtab() {
  const [snippets, setSnippets] = useState();
  useEffect(() => {
    getSnippets();
  }, []);

  const getSnippets = async () => {
    try {
      let { data, error } = await supabase.from('snippets').select('*');
      setSnippets(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [activeButton, setActiveButton] = useState(null);
  const toggleMenu = (item) => {
    setActiveButton(item.name);
  };
  const navItems = [
    {
      name: 'Tabs',
      icon: <BiWindows size={25} />,
      link: '/dashboard/events',
    },
    {
      name: 'Nuggets',
      icon: <BiHighlight size={25} />,
      link: '/dashboard/audience',
    },
    {
      name: 'Todos',
      icon: <BiTask size={25} />,
      link: '/dashboard//settings',
    },
    {
      name: 'Mind',
      icon: <BiNetworkChart size={25} />,
      link: '/dashboard/insights',
    },
  ];

  return (
    <ChakraProvider>
      <Box
        display={'flex'}
        flexDir={'row'}
        h={'100vh'}
        w={'100vw'}
        overflow={'hidden'}
        bg={'gray.100'}
        justifyContent={'space-between'}
        bgGradient="linear(to-r, green.50, blue.100, pink.50)"
      >
        <Box
          px={'3'}
          // bg={'gray.100'}
          roundedRight={'lg'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Navbar
            navItems={navItems}
            activeButton={activeButton}
            toggleMenu={toggleMenu}
          />
        </Box>
        <Box>
          <TabManager />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Newtab;

// <Box>
// <Grid>
//   <GridItem colSpan={1}>
//     <Box>
//       <TabManager />
//     </Box>
//   </GridItem>
//   <GridItem colStart={2} colEnd={5}>
//     {/* <SnippetManager snippets={snippets} /> */}
//   </GridItem>
// </Grid>
// </Box>
