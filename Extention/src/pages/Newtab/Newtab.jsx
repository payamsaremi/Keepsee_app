import React, { useEffect, useState } from 'react';
import Card from './components/SnippetCard';

import { SimpleGrid } from '@mantine/core';

import { supabase } from '../../supabaseClient';
function Newtab() {
  
  const [snippets,setSnippets] = useState()

  useEffect(()=> {
    getSnippets()
  },[])

  const getSnippets = async() => {
    try {
      let { data, error } = await supabase
      .from('snippets')
      .select('*')
      setSnippets(data)
      console.log('data',data)
    } catch(err){
      console.log(err)
    }
  }

  return (
   <>
   <div style={{margin:"40px"}}>
     {/* {JSON.stringify(snippets,null,2)} */}
   <SimpleGrid cols={5} >
     {snippets && snippets.map((snippet =>   <Card key={snippet.id} snippet={snippet} />))}
    </SimpleGrid>
   </div>

   </>
  );
}

export default Newtab;

