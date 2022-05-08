import { Modal, Button, Group, Paper, Avatar, Text, Blockquote,Mark, Stack, ScrollArea, Image, SimpleGrid } from '@mantine/core';
import React, { useState }  from 'react';
import TagSelector from './TagSelector'

import { FaRegStickyNote } from 'react-icons/fa';
function ContentModal({selectionText,setSelectionText,metaSiteName, pageUrl,Tags, setTags, opened, setOpened,loading, saveData, metaTitle, metaImage, metaCreatorTwitter, metaAuthor}) {

    return(
        <>
      <Modal
        zIndex={100}
        centered
        size="lg"
        radius="lg"
        overlayOpacity={0.40}
        opened={opened}
        onClose={() => setOpened(false)}
      >        
        <Stack spacing="md">  
        <Blockquote icon={<FaRegStickyNote size={24} />} color={'dark'} cite={`${metaSiteName}`} >
           {selectionText}
        </Blockquote>

        <Paper shadow="xs" p="xs" radius="lg">
          <Group position="left">
              {/* <Avatar size={'xl'} radius="lg" src={metaImage} /> */}
            <SimpleGrid cols={3} spacing="sm">
            <Image src={metaImage} fit="contain" radius="md" height={60} alt={metaTitle} withPlaceholder/>
            <Text>{metaTitle}</Text>
            <Text size={'sm'} color="dimmed">
              {metaCreatorTwitter}
            </Text>
            </SimpleGrid>
          </Group>
        </Paper>

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