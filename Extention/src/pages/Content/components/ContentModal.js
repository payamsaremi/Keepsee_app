import { Modal, Button, Group, Text, Blockquote,Mark, Stack } from '@mantine/core';
import React, { useState }  from 'react';
import TagSelector from './TagSelector'


function ContentModal({selectionText,setSelectionText, pageUrl,setPageUrl,Tags, setTags, opened, setOpened}) {

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
        title="Save"
      >
        <Stack spacing="sm">
        <Blockquote color={'cyan'} cite={`- ${pageUrl}`} icon={null}>
          <Mark  color="cyan">{selectionText}</Mark>
        </Blockquote>
        <TagSelector setTags={setTags} Tags={Tags} />

        <Group position="right">
        <Button variant="light" radius="lg" color="cyan" onClick={() => setOpened(false)}>Save</Button>
      </Group>
        </Stack>
      </Modal>
    </>
    )
}

export default ContentModal