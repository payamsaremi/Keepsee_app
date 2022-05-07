import { Modal, Button, Group, Text, Blockquote,Mark, Stack, ScrollArea } from '@mantine/core';
import React, { useState }  from 'react';
import TagSelector from './TagSelector'

import { FaRegStickyNote } from 'react-icons/fa';
function ContentModal({selectionText,setSelectionText, pageUrl,setPageUrl,Tags, setTags, opened, setOpened,loading, saveData}) {

    return(
        <>
      <Modal
        centered
        size="lg"
        radius="lg"
        overlayOpacity={0.40}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Save"
      >
        <Stack spacing="md">
        <Blockquote icon={<FaRegStickyNote size={24} />} color={'dark'} cite={`- ${pageUrl}`} >
           {selectionText}
        </Blockquote>
        <TagSelector setTags={setTags} Tags={Tags} />
        <Group position="right">
          <Button variant="light" radius="lg" color="cyan" onClick={()=> saveData()} loading={loading}>Save</Button>
        </Group>
        </Stack>
      </Modal>
    </>
    )
}

export default ContentModal