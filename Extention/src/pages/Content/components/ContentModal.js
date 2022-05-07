import { Modal, Button, Group, Text, Blockquote,Mark, Stack } from '@mantine/core';
import React, { useState }  from 'react';
import TagSelector from './TagSelector'


function ContentModal() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension?????");
      if (request)
      setOpened(true)
      setSelectionText(request.data.selectionText)
      setPageUrl(request.data.pageUrl)
      console.log(request)
    }
  );
    const [opened, setOpened] = useState(false);
    const [selectionText,setSelectionText] = useState('')
    const [pageUrl,setPageUrl] = useState()
    return(
        <>
      <Modal
      centered
      size="lg"
      transition="fade"
      radius="lg"
      transitionDuration={200}
      overlayOpacity={0.40}
      position={{ top: 20, left: 20 }}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        
      >
        <Stack spacing="sm">
        <Blockquote color={'cyan'} cite={`- ${pageUrl}`} icon={null}>
          <Mark  color="cyan">{selectionText}</Mark>
        </Blockquote>
        <TagSelector />

        <Group position="right">
        <Button variant="light" radius="lg" color="cyan" onClick={() => setOpened(false)}>Save</Button>
      </Group>
        </Stack>
        
      
      </Modal>
    </>
    )
}

export default ContentModal